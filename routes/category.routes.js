const express = require('express')
const asyncHandler = require('express-async-handler')
const { validation } = require('../middelwares/validaitors/validation')
const upload = require('../middelwares/imagesMiddleware')
const categoryRouter = express.Router()
const {
    getAllCategories,
    createNewCategory,
    getSpecificCategory,
    updateOneCategory,
    deleteOneCategory,
    uploadCategoryImage
} = require('../controller/category.controller')
const { addCategoryValidation, updateCategoryValidation } = require('../middelwares/validaitors/category.validators')



categoryRouter.route('/')
    .get(asyncHandler(getAllCategories))
    .post(validation(addCategoryValidation), asyncHandler(createNewCategory));

categoryRouter.route('/:categoryId')
    .delete(asyncHandler(deleteOneCategory))
    .get(asyncHandler(getSpecificCategory))
    .put(validation(updateCategoryValidation), asyncHandler(updateOneCategory))


categoryRouter.route('/:categoryId/upload').post(upload.single('categoryImage'), asyncHandler(uploadCategoryImage));


module.exports = categoryRouter;