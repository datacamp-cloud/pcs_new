  const User = require('../models/User');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken'); // Pour gérer l'authentification
  const moment = require('moment');
  const {isMobilePhone} = require('validator');
  const normalizePhone = require('../utils/normalizePhone');


  // Authentification (login)
  exports.login = async (req, res) => {
    
    try {
      
      const { phone } = req.body;

      let phoneNumber = phone.toString().trim();

      console.log(phoneNumber);

      // Si le numéro commence par +225 ou 00225, on supprime l’indicatif
      phoneNumber = normalizePhone(phone);

      console.log("after slice:",phoneNumber)

      const user = await User.findOne({ phone: phoneNumber });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      return res.status(200).json({ success: true, "user_info": user });

    } catch (error) {

      console.error("Erreur lors du login :", error);

    return res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };

  // Vérification de l'existence du numéro de téléphone
  exports.checkPhone = async (req, res) => {
    try {
      const { phone } = req.body;
      console.log(phone);

      const phoneNumber = normalizePhone(phone.trim())

      const existingUser = await User.findOne({ phoneNumber });

      if (existingUser) {
        return res.status(400).json({ message: 'Numéro déjà utilisé.', user: existingUser });
      }
      return res.status(200).json({ message: 'Numéro disponible.' });

      
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur.', error });
    }
  };

  // Enregistrement du code PIN
  exports.setPin = async (req, res) => {
    try {

      console.log('REQUÊTE REÇUE:', req.body);
      const { phone, code } = req.body;
      // affichage des infos
      console.log(
        {
        phone: phone,
        code: code
      });

      if (!/^\d{4}$/.test(code)) {
        return res.status(400).json({ message: 'Le code doit contenir exactement 4 chiffres.' });
      }

      // Normaliser le numéro de téléphone
      let phoneNumber = normalizePhone(phone.trim());

      // Vérifier si le téléphone est bien fourni
      if (!phoneNumber) {
        return res.status(400).json({ message: 'Le numéro de téléphone est requis.' });
      }

      // Hachage du code PIN
      const hashedCode = await bcrypt.hash(code, 10);

      // Mettre à jour l'utilisateur avec le code PIN haché
      const updatedUser = await User.findOneAndUpdate(
        { phone: phoneNumber },
        { code: hashedCode },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      return res.status(200).json({ message: 'Code PIN enregistré.', user: updatedUser });

    } catch (error) {
      console.error('Erreur dans setPin :', error);
      return res.status(500).json({
        message: 'Erreur serveur.',
        error: error?.message || error
      });
    }
  };

  // Vérification du code PIN
  exports.verifyPin = async (req, res) => {
    try {
      const { phone, confirmCode } = req.body;

      // let phoneNumber = phone.toString().trim();
      // console.log(phoneNumber);
    
      const phoneNumber = normalizePhone(phone.trim());

      console.log(
        {
        'phone': phoneNumber,
        'confirmCode:': confirmCode
        });

      // Étape 1 : Récupérer l'utilisateur par son numéro de téléphone
      const user = await User.findOne({ phone: phoneNumber });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable.' });
      }

      const isMatch = await bcrypt.compare(confirmCode, user.code);
      if (!isMatch) {
        return res.status(400).json({ message: 'Code incorrect.' });
      }

      // Générer un OTP et le stocker dans la base de données
      const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('code otp', otpGenerated);

      const otpExpires = moment().add(30, 'minutes').toDate(); // L'OTP expire dans 10 minutes

      // Mettre à jour l'utilisateur avec l'OTP généré
      await User.findOneAndUpdate(
        { phone: phoneNumber },
        { otp: otpGenerated, otpExpires },
        { new: true }
      );

      // Mise à jour de l'état de vérification du téléphone
      user.isPhoneVerified = true;
      await user.save(); 
      
      // Génération du token JWT pour l'authentification
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json(
        { success: true, 
          message: 'Authentification réussie. OTP généré avec succès.', 
          otp: otpGenerated,
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            status: user.status, 
            solde: user.solde,  
            email: user.email,
            gender: user.gender,
            birthday: user.birthday,
            address: user.address,
          }
        });

    } catch (error) {
      
      return res.status(500).json({
        message: 'Erreur serveur.',
        error: error.message || error, });
    }
  };

  // Enregistrer numéro de téléphone
  exports.savedPhone = async (req, res) => {
    try {

      console.log("📞 Requête reçue :", req.body);

      let { phone } = req.body;
      if (!phone) return res.status(400).json({ message: 'Numéro requis.' });

      const phoneNumber = normalizePhone(phone);
      console.log("Numéro normalisé:", phoneNumber);

      const isPhoneValid = isMobilePhone(phoneNumber, 'any', { strictMode: false });
      if (!isPhoneValid) {
        return res.status(400).json({ message: "Numéro de téléphone invalide." });
      }

      const existingUser = await User.findOne({ phone: phoneNumber });
      if (existingUser) {
        return res.status(400).json({ message: 'Numéro déjà utilisé.', user: existingUser });
      }

      const newUser = new User({ phone: phoneNumber });
      await newUser.save();

      console.log("✅ Utilisateur créé :", newUser);
      return res.status(200).json({ message: 'Utilisateur créé avec succès.', user: newUser });

      

    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur.', error });
    }
  };

  // Vérification de l'OTP
  exports.verifyOtp = async (req, res) => {
    try {
      console.log('Vérification OTP - Requête reçue:', req.body);
      let { phone, otp } = req.body;

      let phoneNumber = normalizePhone(phone.trim());

      if (!phone || !otp) {
        return res.status(400).json({ message: 'Numéro de téléphone et OTP requis.' });
      }

      const user = await User.findOne({ phone: phoneNumber });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: 'Code OTP incorrect.' });
      }

      if (moment().isAfter(user.otpExpires)) {
        return res.status(400).json({ message: 'Code OTP expiré.' });
      }

      user.otp = null;
      user.otpExpires = null;
      user.isPhoneVerified = true;
      await user.save();

      // Génération du token (si tu veux sécuriser les routes ensuite)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // On renvoie les infos minimales à stocker côté front
      return res.status(200).json({
        message: 'OTP vérifié avec succès.',
        user: {
          _id: user._id,
          phone: user.phone,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          isPhoneVerified: user.isPhoneVerified,
          isIdentityVerified: user.isIdentityVerified,
        },
        token,
      });

    } catch (error) {
      console.error('Erreur serveur lors de la vérification OTP:', error);
      return res.status(500).json({
        message: 'Erreur serveur.',
        error: error.message,
      });
    }
  };

  // Mise à jour de l'identité de l'utilisateur
  exports.updateIdendity = async (req, res) => {
    try {
      const { phone } = req.body;
      console.log("Téléphone reçu :", phone);

      // Vérifier que le téléphone est bien fourni
      if (!phone || typeof phone !== "string" || phone.trim() === "") {
        return res.status(400).json({ message: "Le numéro de téléphone est requis." });
      }

      // Nettoyer le numéro (par exemple enlever les espaces)
      const cleanPhone = phone.trim();

      // Rechercher l'utilisateur par numéro de téléphone
      const user = await User.findOne({ phone: cleanPhone });

      if (!user) {
        console.log("Utilisateur introuvable avec le numéro :", cleanPhone);
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      // Vérifier si l'identité est déjà validée
      if (user.isIdentityVerified) {
        return res.status(400).json({ message: "Identité déjà passée." });
      }

      // Marquer l'identité comme validée
      user.isIdentityVerified = true;
      await user.save();

      console.log("Identité passée pour :", cleanPhone);
      return res.status(200).json({ message: "Identité passée avec succès." });

    } catch (error) {
      console.error("🔥 Erreur serveur:", error);
      return res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
  };

  // Vérification de l'identité (nom, prénoms, etc.) 
  exports.verifyIdentity = async (req, res) => {
    try {

      const { phone, gender, firstName, lastName, address, email, birthday } = req.body;
      console.log('Données reçues :', req.body);

      let phoneNumber = normalizePhone(phone.trim());

      // Vérification des champs requis
      if (!phone || !firstName || !lastName || !gender || !address || !email || !birthday) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }

      // Rechercher et mettre à jour l'utilisateur
      const updatedUser = await User.findOneAndUpdate(
        { phone },
        {
          firstName,
          lastName,
          gender,
          address,
          email,
          birthday,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur introuvable avec ce numéro." });
      }

      return res.status(200).json({
        success: true,
        message: 'Identité vérifiée et mise à jour.',
        user: updatedUser,
      });

    } catch (error) {
      console.error("Erreur verifyIdentity :", error);
      return res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };







