const express =require('express')
const productRouter =express.Router()
const asyncHandler =require('express-async-handler')
const {validation} =require('../middelwares/validaitors/validation')
const productController =require('../controller/product.controller')
const { addNewProductValidator, updateProductValidator } = require('../middelwares/validaitors/product.validators')


productRouter.route('/')
.get(asyncHandler(productController.getAllProducts))
.post(validation(addNewProductValidator),asyncHandler(productController.createNewProduct))


productRouter.route('/:id')
.get(asyncHandler(productController.getSpecificProduct))
.put(validation(updateProductValidator),asyncHandler(productController.updateOneProduct))
.delete(asyncHandler(productController.deleteOneProduct))



module.exports = productRouter