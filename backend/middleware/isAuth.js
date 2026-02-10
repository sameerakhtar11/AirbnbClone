import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {

    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "user doesn't have a token" })
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({ message: "user doesn't have a Validtoken" })
        }
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(500).json({ message: `isAuth error ${error}` })
    }

}
export default isAuth