const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({
            responseErrorMessage: 'No Token, authorization denied'
        });

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ responseErrorMessage: 'Token is not valid' });
            }
            else{
                req.user = decoded.user;
                next();
            }

        })
    }
    catch (error) {
        res.status(500).json({
            responseErrorMessage: 'Server Error'
        });
    }
}

module.exports = auth;