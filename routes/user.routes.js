const express = require('express');
const asyncHandler = require('express-async-handler');
const { validation } = require('../middelwares/validaitors/validation');
const { validateEditUserInfo } = require('../middelwares/validaitors/user.validator')
const userController = require('../controller/user.controller.js')
const userRouter = express.Router()

userRouter.get('/',
    asyncHandler(userController.getAllUsers)
)

userRouter.get('/:id',
    asyncHandler(userController.getSpecificUserById)
)

userRouter.put('/:id',
    validation(validateEditUserInfo),
    asyncHandler(userController.editUserInfo)
)

userRouter.delete('/:id',
    asyncHandler(userController.deleteUser)
)



module.exports = userRouter;