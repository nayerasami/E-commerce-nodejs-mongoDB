const joi = require('joi')


module.exports.addNewProductValidator = joi.object().required().keys({

    name: joi.string().required().min(3).max(150).trim(),
    slug: joi.string().trim(),
    quantity: joi.number().required(),
    price: joi.number().required(),
    productDescription: joi.string().min(20).max(280).required().trim(),
    productImages: joi.array(),
    imageCover: joi.string().trim(),
    categoryId: joi.string().trim().required(),
    subCategory: joi.string().trim().required(),
    brandId: joi.string().trim().required()

})

module.exports.updateProductValidator = joi.object().required().keys({
    id: joi.string(),
    name: joi.string().required().min(3).max(150).trim(),
    slug: joi.string().trim(),
    quantity: joi.number().required(),
    price: joi.number().required(),
    productDescription: joi.string().min(20).max(280).required().trim(),
    productImages: joi.array(),
    imageCover: joi.string().trim(),
    categoryId: joi.string().trim().required(),
    subCategory: joi.string().trim().required(),
    brandId: joi.string().trim().required()

})