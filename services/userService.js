const User = require('../models/user.model');

module.exports.getAllUsersService = async () => {
    return await User.find({})
}

module.exports.getSpecificUser = async (userId) => {
    return await User.find({ _id: userId })
}
module.exports.getSpecificUserByEmail=async(email)=>{
    return await User.findOne({email})
}
module.exports.getSpecificUserByUserName =async(userName)=>{
    return await User.findOne({userName})
}

module.exports.editUserService = async (userId, updatedData) => {
    return await User.findOneAndUpdate({
        _id: userId
    }, updatedData)
}

module.exports.deleteUser =async(userId)=>{
    return await User.deleteOne({_id:userId})
}