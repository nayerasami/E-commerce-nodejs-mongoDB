const joi = require('joi');


module.exports.validateUserRegister = joi.object().required().keys({

    firstName: joi.string().required().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    lastName: joi.string().required().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    userName: joi.string().required().min(5).max(10).trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().required().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/).trim(),
    confirmPassword:joi.string().required().valid(joi.ref('password')).messages({
        'any.only': 'Confirm password does not match password'
    })

})


module.exports.validateUserLogin =joi.object().required().keys({
    email:joi.string().email().required().trim(),
    password: joi.string().required().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/).trim(),
    confirmPassword:joi.string().required().valid(joi.ref('password')).messages({
        'any.only': 'Confirm password does not match password'
    })
})

module.exports.validateEditUserInfo = joi.object().required().keys({
    id: joi.string().required(),
    firstName: joi.string().optional().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    lastName: joi.string().optional().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    userName: joi.string().optional().min(5).max(10).trim(),
    password: joi.string().optional().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/).trim(),
    phoneNumber: joi.string().optional().pattern(/^(01[0125]{1}[0-9]{8})$/).trim(),
    city: joi.string().optional().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    street: joi.string().optional().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    floorNumber: joi.string().optional().min(2).max(30).pattern(/^[A-Za-z ]+$/).trim(),
    role: joi.string().optional().pattern(/^[A-Za-z ]+$/).trim()
});