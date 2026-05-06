const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const { signUp, checkEmail, verifyOTP, resendOTP, signIn, signout, forgetPassword, resetPassword, getProfile, updateProfile, refreshAccToken } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

// -------------------------- Sign Up
router.post('/signup', signUp)
router.post('/check-email', checkEmail)
router.post('/verifyOTP', verifyOTP)
router.post('/resendOTP', resendOTP)
router.post('/signin', signIn)
router.post('/signout', signout)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword/:token', resetPassword)
router.get('/profile', authMiddleware, getProfile)
router.put('/updateProfile', authMiddleware, upload.single("avatar"), updateProfile)
router.post('/refreshAccessToken', refreshAccToken)

module.exports = router