const JWT = require('jsonwebtoken')

module.exports.generateToken = async (payload) => {
    const accessToken = await JWT.sign(payload, process.env.SECRETE_KEY, { expiresIn: '1d' })
    const refreshToken =await JWT.sign(payload, process.env.REFRESH_SECRETE_KEY,{expiresIn:'7d'})
    return {accessToken,refreshToken};

}