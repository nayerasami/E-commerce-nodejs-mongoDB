const Category = require('../data/category.model');

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
    return await Category.findByIdAndUpdate(categoryId, updatedData, { new: true, runValidators: true });
}

module.exports.deleteCategoryService = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
}
