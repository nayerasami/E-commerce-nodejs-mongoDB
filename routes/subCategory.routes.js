const express= require('express')
const asyncHandler = require('express-async-handler')
const {validation} =require('../middelwares/validaitors/validation')
const subCategoryController =require('../controller/subCategory.controller')
const { addSubCategoryValidator, updateSubCategoryValidator } = require('../middelwares/validaitors/subCategory.validators')
const subCategoryRouter = express.Router()


subCategoryRouter.route('/')
.get(asyncHandler(subCategoryController.getAllSubCategories))
.post(validation(addSubCategoryValidator),asyncHandler(subCategoryController.createNewSubCategory))


subCategoryRouter.route('/:id')
.get(asyncHandler(subCategoryController.getSubCategoryById))
.put(validation(updateSubCategoryValidator),asyncHandler(subCategoryController.updateSubCategory))
.delete(asyncHandler(subCategoryController.deleteSubCategory));


module.exports =subCategoryRouter