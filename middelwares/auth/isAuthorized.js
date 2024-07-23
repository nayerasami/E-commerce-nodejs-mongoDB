const JWT = require('jsonwebtoken');
const ApiError = require('../../utils/errorClass');


const verifyToken = async (req, res, next) => {

    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError('User is not authorized', 401));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new ApiError('token is not found', 401))
    }
    try {
        const verifiedToken = JWT.verify(token, process.env.SECRETE_KEY);
        
        // if (verifiedToken.exp < Date.now() / 1000) {
        //     return res.redirect('/api/v1/auth/refresh-token');
        // }

        req.user=verifiedToken;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            // Inform the client to use the refresh token endpoint
            return res.status(401).json({
                status: "failure",
                message: 'Access token expired, please use the refresh token to get a new access token'
            });
        }
        return next(new ApiError('Invalid-token', 401))
    }


}

module.exports = verifyToken;
