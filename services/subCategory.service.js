const SubCategory = require('../models/subCategory.model')


module.exports.getAllSubCategoriesService = async (limit, skip) => {

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
module.exports.updateSubCategoryService = async (id, updatedData) => {
    return await SubCategory.updateOne({ _id: id }, { $set: { ...updatedData } });
};

module.exports.deleteSubCategoryService = async (id) => {
    return await SubCategory.findByIdAndDelete(id)

}
module.exports.getSubCategoryByName = async (name) => {
    return await SubCategory.findOne({ name })
}