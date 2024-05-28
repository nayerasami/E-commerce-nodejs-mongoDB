const joi = require('joi')


module.exports.addSubCategoryValidator = joi.object().required().keys({

    name: joi.string().min(3).max(32).required().trim(),
    slug: joi.string().trim(),
    categoryId: joi.string().required().trim()
})

module.exports.updateSubCategoryValidator = joi.object().required().keys({
    id :joi.string(),
    name: joi.string().min(3).max(32).required().trim(),
    slug: joi.string().trim(),
    categoryId: joi.string().trim().required()

})