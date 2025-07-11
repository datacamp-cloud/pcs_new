const express = require('express');
const router = express.Router();
const { getInfoUser, uploadKycDocs } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');

router.get('/user-info', authMiddleware, getInfoUser);
router.post('/upload-kyc', upload.fields(
    [
        { name: 'selfie', maxCount: 1 },
        { name: 'docFront', maxCount: 1 },
        { name: 'docBack', maxCount: 1 },
    ]
),
  userController.uploadKycDocs
);

module.exports = router;
