const authService = require('../services/auth.service');
const userService = require('../services/userService')
const bcrypt = require('bcrypt')
const ApiError = require('../utils/errorClass')
const User = require('../models/user.model');
const { generateToken } = require('../utils/generateRefreshToken');




module.exports.register = async (req, res, next) => {
    const { firstName, lastName, userName, email, password } = req.body
    const oldUser = await userService.getSpecificUserByEmail(email);
    console.log(oldUser)

    if (oldUser) {
        return next(new ApiError('this user email already exist', 400))
    }
    const oldUserName = await userService.getSpecificUserByUserName(userName)
    if (oldUserName) {
        return next(new ApiError('this username already exist', 400))

    }

    const HashedPassword = await bcrypt.hash(password, 10)
    const newUser = await authService.RegisterService({
        firstName,
        lastName,
        userName,
        email,
        password: HashedPassword
    })
    const { accessToken, refreshToken } = await generateToken({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.userName,
        email: newUser.email
    });
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure:true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

    })

    res.status(200).json({ status: "success", data: { message: "user registered successfully" } })

}

module.exports.login = async (req, res, next) => {
    const { password, email } = req.body;
    if (!email || !password) {
        return next(new ApiError('email and password are required', 400))
    }
    const existedUser = await User.findOne({ email })
    const matchedPassword = await bcrypt.compare(password, existedUser.password)

    if (existedUser && matchedPassword) {
        const { accessToken, refreshToken } = await generateToken({
            _id: existedUser._id,
            firstName: existedUser.firstName,
            lastName: existedUser.lastName,
            userName: existedUser.userName,
            email: existedUser.email
        })
        existedUser.refreshToken = refreshToken;
        await existedUser.save()

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure:true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        })

        res.status(200).json({ status: "success", data: { user: 'logged in successfully',accessToken,refreshToken } })
    } else if (!matchedPassword) {

        return next(new ApiError('incorrect password', 500))

    } else {

        return next(new ApiError('something went wrong', 500))

    }


}

module.exports.logout = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ApiError('User not found', 404));
    }
    user.refreshToken = null;
    await user.save();

    res.clearCookie('accessToken', { sameSite: 'None', secure: true });
    res.clearCookie('refreshToken', { sameSite: 'None', secure: true });


    res.status(200).json({ status: "success", data: { message: 'Logged out successfully' } });
}


