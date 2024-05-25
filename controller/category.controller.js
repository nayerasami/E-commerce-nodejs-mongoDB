const categoryService = require('../services/category.service');
const slugify = require('slugify');

module.exports.getAllCategories = async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await categoryService.getAllCategoriesService(limit, skip);
    res.status(200).json({ status: "success", results: categories.length, data: { categories } });

}

module.exports.getSpecificCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    const specificCategory = await categoryService.getCategoryByIdService(categoryId);
    res.status(200).json({ status: "success", data: { specificCategory } });

}

module.exports.createNewCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const newCategory = await categoryService.addNewCategoryService({
        categoryName,
        slug: slugify(categoryName)
    });
    res.status(201).json({ status: "success", data: { newCategory } });

}

module.exports.updateOneCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    const updatedData = req.body;
    const updatedCategory = await categoryService.editCategoryService(categoryId, updatedData);
    res.status(200).json({ status: "success", data: { updatedCategory } });
}

module.exports.deleteOneCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    await categoryService.deleteCategoryService(categoryId);
    res.status(200).json({ status: "success", data: null });

}
