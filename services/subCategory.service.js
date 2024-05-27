const SubCategory = require('../models/subCategory.model')


module.exports.getAllSubCategoriesService = async (limit,skip) => {

    return await SubCategory.find({}).skip(skip).limit(limit)
}

module.exports.getSubCategoryByIdService = async (id) => {
    return await SubCategory.findById(id)
}

module.exports.addNewSubCategoryService = async (subCategoryData) => {
    const newSubCategory = new SubCategory(subCategoryData)
    await newSubCategory.save()
    return newSubCategory;
}

module.exports.updateSubCategoryService = async (id, updatedDate) => {
    return await SubCategory.findByIdAndUpdate(id, updatedDate, { new: true, runValidators: true })
}

module.exports.deleteSubCategoryService = async (id) => {
    return await SubCategory.findByIdAndDelete(id)

}