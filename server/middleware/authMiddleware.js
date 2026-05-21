const { verifyToken } = require("../services/tokens")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.["X-AS-TOKEN"]
        // --------- Validations 
        if (!token) return res.status(401).send({ message: 'No token provided' })

        // ------- verify 
        const decoded = verifyToken(token)
        if (!decoded) return res.status(401).send({ message: 'Invalid request' })

        // ----- Set to req 
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send({ message: 'Invalid request' })
    }
}


module.exports = authMiddleware