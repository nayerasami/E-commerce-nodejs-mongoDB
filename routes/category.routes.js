const express = require('express')
const asyncHandler = require('express-async-handler')

const categoryRouter = express.Router()
const {
    getAllCategories,
    createNewCategory,
    getSpecificCategory,
    updateOneCategory,
    deleteOneCategory
} = require('../controller/category.controller')



categoryRouter.route('/')
    .get(asyncHandler(getAllCategories))
    .post(asyncHandler(createNewCategory));

categoryRouter.route('/:categoryId')
    .delete(asyncHandler(deleteOneCategory))
    .get(asyncHandler(getSpecificCategory))
    .put(asyncHandler(updateOneCategory))




module.exports = categoryRouter;