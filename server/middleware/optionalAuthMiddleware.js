const { verifyToken } = require("../services/tokens")

const optionalAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.["X-AS-TOKEN"]
        // --------- Validations 
        if (!token) {
            return next()
        }

        // ------- verify 
        if (token) {
            const decoded = verifyToken(token)
            if (!decoded) return res.status(401).send({ message: 'Invalid request' })

            // ----- Set to req 
            req.user = decoded
            return next()
        }
        
        next()
    } catch (error) {
        next()
    }
}


module.exports = optionalAuthMiddleware