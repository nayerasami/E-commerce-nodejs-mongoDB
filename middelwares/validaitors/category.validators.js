
const joi =require('joi');


module.exports.addCategoryValidation=joi.object().required().keys({

    categoryName:joi.string().min(3).max(32).required().trim(),
    slug:joi.string().trim() ,
    categoryImage:joi.string().trim()
})


module.exports.updateCategoryValidation =joi.object().required().keys({
    categoryName:joi.string().min(3).max(32).required().trim(),
    slug:joi.string().trim() ,
    categoryImage:joi.string().trim()

})