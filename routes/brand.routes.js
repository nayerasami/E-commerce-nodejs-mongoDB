const express = require('express')
const asyncHandler = require('express-async-handler')
const { validation } = require('../middelwares/validaitors/validation')
const brandsRouter = express.Router()
const brandsController = require('../controller/brand.controller')
const { addBrandValidator, updateBrandValidator } = require('../middelwares/validaitors/brand.validator')
const upload = require('../middelwares/imagesMiddleware')


brandsRouter.route('/')
    .get(asyncHandler(brandsController.getAllBrands))
    .post(validation(addBrandValidator), asyncHandler(brandsController.addNewBrand))


brandsRouter.route('/:id')
    .get(asyncHandler(brandsController.getBrandById))
    .put(validation(updateBrandValidator), asyncHandler(brandsController.updateBrand))
    .delete(asyncHandler(brandsController.deleteBrand))

brandsRouter.route('/:id/upload')
.post(upload.single('brandImage'),asyncHandler(brandsController.uploadBrandImage))



module.exports = brandsRouter