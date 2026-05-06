const userSchema = require("../models/userSchema")
const { sendEmail } = require("../services/emailServices")
const { verifyOtpTemp, forgetPassTemp } = require("../services/emailTemp")
const { generateOTP } = require("../services/helpers")
const { generateAccToken, generateRefToken, verifyToken } = require("../services/tokens")
const { isValidEmail } = require("../utils/validations")
const { genResetToken, hashResetToken } = require("../utils/resetPassword")
const { cloudUpload, cloudDelete } = require("../services/cloudUpload")

// ========================== Sign Up ===========================
const signUp = async (req, res) => {
    try {
        const { email, fullname, phone, password } = req.body

        if (!email) return res.status(400).send({ message: 'Email is required!' })
        // ---------- Existing User 
        const existingUser = await userSchema.findOne({ email })
        if (existingUser) return res.status(400).send({ message: 'User with this email already exists. Please login!' })
        if (!fullname) return res.status(400).send({ message: 'fullname is required!' })
        if (!phone) return res.status(400).send({ message: 'phone number is required!' })
        if (!password) return res.status(400).send({ message: 'Password is required!' })
        if (!isValidEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })
        // ------------- Send Email 
        const OTP = generateOTP()
        sendEmail({ email, subject: "Email Verification", item: OTP, template: verifyOtpTemp })

        // ----------- Sent to DB 
        const user = new userSchema({
            email,
            fullname,
            phone,
            password,
            otp: OTP,
            otpExpires: Date.now() + 5 * 60 * 1000
        })

        user.save()


        // ------------------ Success 
        res.status(201).send({ message: 'Registration Successful' })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).send({ message: "Email is required!", })
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) return res.status(409).send({ message: "User with this email already exists. Please login!", });

        // ------- Available 
        return res.status(200).send({ message: "Email is available", });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
};

// ========================== Verify OTP =========================
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body

        // -------- Validations 
        if (!otp) return res.status(400).send({ message: "Invalid or Incorrect OTP" })
        if (!email) return res.status(400).send({ message: "Invalid or Incorrect Email" })

        // --------- Find From DB 
        const user = await userSchema.findOne({
            email,
            otp: Number(otp),
            otpExpires: { $gt: new Date() },
            isVerified: false
        })

        // ------ Validations 
        if (!user) return res.status(400).send({ message: "OTP is invalid or expired" })

        // ------- Modifying DB 
        user.isVerified = true
        user.otp = null
        user.otpExpires = null
        user.save()


        // ---------- Success 
        res.status(200).send({ message: "Verification Successful" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Resend OTP ==========================
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).send({ message: "Email is required" });

        const user = await userSchema.findOne({ email });

        if (!user) return res.status(404).send({ message: "User not found" });
        if (user.isVerified) return res.status(400).send({ message: "Your account is already verified. Please login.", });

        if (user.otpExpires < new Date()) return res.status(400).send({ message: "OTP expired. Please sign up again or request new verification.", });

        const OTP = generateOTP();
        user.otp = OTP;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);


        await user.save();

        await sendEmail({
            email,
            subject: "Email Verification",
            item: OTP,
            template: verifyOtpTemp,
        });

        // -------- Success 
        res.status(200).send({ message: "New OTP has been sent!", });
    } catch (error) {
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

// ========================== Sign In =============================
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) return res.status(400).send({ message: 'Email is required!' })
        if (!password) return res.status(400).send({ message: 'Password is required!' })
        if (!isValidEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })
        // ---------- Existing User 
        const existingUser = await userSchema.findOne({ email })
        if (!existingUser) return res.status(404).send({ message: `User with this email doesn't exists. Please signUp!` })
        if (!existingUser.isVerified) return res.status(400).send({ message: "You're not verified. Please verify your account first" })

        // --------- Compare password 
        const isValidPassword = await existingUser.comparePassword(password)
        if (!isValidPassword) return res.status(400).send({ message: 'Invalid or incorrect password!' })

        // ------------- JWT token and cookie
        const accToken = generateAccToken(existingUser)
        const refToken = generateRefToken(existingUser)
        res.cookie("X-AS-TOKEN", accToken)
        res.cookie("X-RF-TOKEN", refToken)

        // ------------ Success 
        res.status(200).send({ message: "SignIn Successfully completed!" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Sign Out =============================
const signout = (req, res) => {
    try {
        res.clearCookie('X-AS-TOKEN')
        res.clearCookie('X-RF-TOKEN')
        res.status(200).send({ message: 'Logout Successful' })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}


// ========================== Forget password ======================
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        // ----------- Validation 
        if (!email) return res.status(400).send({ message: 'Email is required!' })
        if (!isValidEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })

        // ----------- Find From db
        const existingUser = await userSchema.findOne({ email })
        if (!existingUser) return res.status(400).send({ message: `email is not registered!` })

        // ------------- Send forget link to email
        const { token, hashToken } = genResetToken()
        const forgetPassLink = `${process.env.CLIENT_URL || 'http://localhost:8000/'}auth/resetPassword/${token}`
        sendEmail({ email, subject: "Forget password", item: forgetPassLink, template: forgetPassTemp })
        existingUser.resetPassTkn = hashToken
        existingUser.resetPassExp = Date.now() + 60 * 60 * 1000
        existingUser.save()


        // -------------- Success 
        res.status(200).send({ message: "Reset password link has been sent!" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Reset password =======================
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword } = req.body

        if (!token) return res.status(400).send({ message: "Invalid request" })
        if (!newPassword) return res.status(400).send({ message: "New password is required!" })

        // ------------- Verify hash and update token 
        const hashToken = hashResetToken(token)
        if (!hashToken) return res.status(400).send({ message: "Something went wrong!" })

        const existingUser = await userSchema.findOne({
            resetPassTkn: hashToken,
            resetPassExp: { $gt: Date.now() }
        }).select("password email")
        if (!existingUser) return res.status(400).send({ message: "Your link is invalid or expired!" })

        // --------------- Save modified  
        existingUser.password = newPassword
        existingUser.resetPassTkn = undefined
        existingUser.resetPassExp = undefined
        existingUser.save()

        // --------------- Success 
        res.status(200).send({ message: "Your password has been updated!" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Get Profile ========================== 
const getProfile = async (req, res) => {
    try {
        const { _id } = req.user
        const userInfo = await userSchema.findById(_id).select('-password -otp -otpExpires -updatedAt')
        if (!userInfo) return res.status(404).send({ message: "User doesn't exist" })

        // ------------- Success 
        res.status(200).send(userInfo)
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Update Profile =======================
const updateProfile = async (req, res) => {
    try {
        const { _id } = req.user
        const { fullname, phone, address } = req.body
        const avatar = req.file

        // ------- Find from DB 
        const existingUser = await userSchema.findById(_id)

        if (avatar) {
            // --- Delete previous avatar
            cloudDelete({ folder: "avatar", file: existingUser.avatar })
            const cloudRes = await cloudUpload({ file: avatar, folderPath: "rexify/user", folder: "avatar" })
            existingUser.avatar = cloudRes.secure_url
        }
        if (fullname) existingUser.fullname = fullname
        if (phone) existingUser.phone = phone
        if (address) existingUser.address = address

        existingUser.save()

        // ------------- Success 
        res.status(202).send({ message: "Profile updated" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

// ========================== Refresh access token =================
const refreshAccToken = (req, res) => {
    try {
        const refreshToken = req.cookies?.["X-RF-TOKEN"]

        // ----- Validation 
        if (!refreshToken) return res.status(400).send({ message: "Something went wrong. Please login" })

        // -------- verify, generate and set it to cookies 
        const decoded = verifyToken(refreshToken)
        const accToken = generateAccToken(decoded)
        res.cookie("X-AS-TOKEN", accToken)

        // ---------- Success 
        res.status(201).send("Token created")
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}




module.exports = { signUp, checkEmail, verifyOTP, resendOTP, signIn, signout, forgetPassword, resetPassword, getProfile, updateProfile, refreshAccToken }