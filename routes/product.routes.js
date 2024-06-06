const express =require('express')
const productRouter =express.Router()
const asyncHandler =require('express-async-handler')
const {validation} =require('../middelwares/validaitors/validation')
const productController =require('../controller/product.controller')
const { addNewProductValidator, updateProductValidator } = require('../middelwares/validaitors/product.validators')
const upload = require('../middelwares/imagesMiddleware')


productRouter.route('/')
.get(asyncHandler(productController.getAllProducts))
.post(validation(addNewProductValidator),asyncHandler(productController.createNewProduct))


productRouter.route('/:id')
.get(asyncHandler(productController.getSpecificProduct))
.put(validation(updateProductValidator),asyncHandler(productController.updateOneProduct))
.delete(asyncHandler(productController.deleteOneProduct))


productRouter.route('/:id/upload-cover-img').post(upload.single('productCover'),asyncHandler(productController.uploadProductCoverImage))
productRouter.route('/:id/upload-product-images').post(upload.array('files'),asyncHandler(productController.uploadProductsImages))


module.exports = productRouter