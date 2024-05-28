const joi = require('joi')


module.exports.addBrandValidator = joi.object().required().keys({
    name: joi.string().required().min(3).max(32).trim(),
    slug: joi.string().trim(),
    image: joi.string().trim()

})

module.exports.updateBrandValidator = joi.object().required().keys({
    id: joi.string(),
    name: joi.string().required().min(3).max(32).trim(),
    slug: joi.string().trim(),
    image: joi.string().trim()
})