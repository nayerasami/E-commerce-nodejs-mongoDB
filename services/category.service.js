const Category = require('../models/category.model');

module.exports.getAllCategoriesService = async (limit, skip) => {
    return await Category.find({}).skip(skip).limit(limit);
}

module.exports.getCategoryByIdService = async (categoryId) => {
    return await Category.findById(categoryId);
}

module.exports.addNewCategoryService = async (categoryData) => {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
}

module.exports.editCategoryService = async (categoryId, updatedData) => {
    return await Category.updateOne({_id:categoryId},{$set:{...updatedData} },{ new: true, runValidators: true });
}


module.exports.deleteCategoryService = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
}

module.exports.getCategoryByName =async(categoryName)=>{
return await Category.findOne({categoryName})
}