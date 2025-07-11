// backend/controllers/userController.js
const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // Pour gérer l'authentification
// const moment = require('moment');

exports.getInfoUser = async (req, res) => {
  try {

    const user = await User.findById(req.userId).select('-code -otp -otpExpires');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
      city: user.city,
      image: user.image || null,
      status: user.status || 'Freemium',
      solde: user.solde || 0,
    });

  } catch (error) {
    
    console.error('Erreur serveur (getInfoUser) :', error);
    res.status(500).json({ message: 'Erreur serveur' });

  }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        // Find the user by ID and update
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, phone },
            { new: true } // Return the updated user
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.uploadKycDocs = async (req, res) => {
  try {
    const { phone } = req.body;
    const files = req.files;

    console.log('Fichiers reçus pour KYC :', files);

    if (!phone) {
      return res.status(400).json({ message: "Numéro requis." });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (files.selfie) user.selfieUrl = `/api/uploads/kyc/${files.selfie[0].filename}`;
    if (files.docFront) user.docFrontUrl = `/api/uploads/kyc/${files.docFront[0].filename}`;
    if (files.docBack) user.docBackUrl = `/api/uploads/kyc/${files.docBack[0].filename}`;

    user.fullVerification = true;
    await user.save();

    return res.status(200).json({ message: 'KYC uploadé avec succès', user });

  } catch (error) {
    console.error('Erreur KYC :', error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};
