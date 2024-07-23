const User =require('../models/user.model')


module.exports.RegisterService =async({firstName,lastName,userName,email,password})=>{
    return await User.create({firstName,lastName,userName,email,password});
}

