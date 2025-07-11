const express = require('express');
const router = express.Router();
const { checkPhone, setPin, verifyPin, verifyOtp, updateIdendity, verifyIdentity, login, savedPhone,  } = require('../controllers/authController');

router.post('/login', login);
router.post('/check-phone', checkPhone);
router.post('/set-pin', setPin);
router.post('/verify-pin', verifyPin);
router.post('/saved-phone', savedPhone);
router.post('/verify-otp', verifyOtp);
router.post('/update-identity', updateIdendity);
router.post('/verify-identity', verifyIdentity);


module.exports = router;
