const express = require('express');
const asyncHandler = require('express-async-handler');
const authController = require('../controller/auth.controller')
const User = require('../models/user.model');
const { validation } = require('../middelwares/validaitors/validation')
const { generateToken } = require('../utils/generateRefreshToken')
const { validateUserRegister, validateUserLogin } = require('../middelwares/validaitors/user.validator')

const JWT = require('jsonwebtoken')

const ApiError = require('../utils/errorClass')
const authRouter = express.Router()


authRouter.post('/refresh-token', asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return next(new ApiError('refreshToken is required', 400))
    }
    const payload = await JWT.verify(refreshToken, process.env.REFRESH_SECRETE_KEY);
    console.log(payload)
    const user = await User.findById(payload._id);
    if (!user || user.refreshToken !== refreshToken) {
        return next(new ApiError('Invalid refresh token', 403));
    }
    const { accessToken, newRefreshToken } = await generateToken({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

    })

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure:true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

    })

    res.status(200).json({ status: "success", data: { accessToken, refreshToken: newRefreshToken } });

}))


authRouter.post('/login', validation(validateUserLogin), asyncHandler(authController.login))

authRouter.post('/register', validation(validateUserRegister),asyncHandler(authController.register))


module.exports = authRouter;