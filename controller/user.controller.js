const userService = require('../services/userService');
const ApiError = require('../utils/errorClass');

module.exports.getAllUsers = async (req, res, next) => {
    const users = await userService.getAllUsersService();
    res.status(200).json({
        status: "success",
        data: { users }

    })
}

module.exports.getSpecificUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.getSpecificUser(id);
    if(!user){
        return next(new ApiError('this user is not found',404))

    }
    res.status(200).json({ status: "success", data: { user } })
}

module.exports.getSpecificUserByEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await userService.getSpecificUserByEmail(email)
    if(!user){
        return next(new ApiError('this user is not found',404))

    }
    res.status(200).json({ status: "success", data: { user } })

}

module.exports.getSpecificUserByUserName = async (req, res, next) => {
    const { userName } = req.body;
    const user = await userService.getSpecificUserByUserName(userName);
    if(!user){
        return next(new ApiError('this user is not found',404))
    }
    res.status(200).json({ status: "success", data: { user } })
}


module.exports.editUserInfo = async (req, res, next) => {
    const { id } = req.params;
    const updatedUserInfo = req.body;
    const updatedUser = await userService.editUserService(id, updatedUserInfo);
    if(updatedUser.modifiedCount === 0){
    return next(new ApiError('this user is not found',404))
    }
    res.status(201).json({ status: "success", data: { updatedUser } });

}


module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);
    if (deletedUser.deletedCount===0) {
        return next(new ApiError('this user is not found', 404))
    }
    console.log(deletedUser)
    res.status(200).json({ status: "success", data: null })
}