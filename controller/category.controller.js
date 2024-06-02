const categoryService = require('../services/category.service');
const slugify = require('slugify');
const ApiError = require('../utils/errorClass')
const cloudinary = require('../config/cloudinary.config')


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
    if (!specificCategory) {
        return next(new ApiError('this category is not found', 404))
    }

    res.status(200).json({ status: "success", data: { specificCategory } });

}

module.exports.createNewCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const existingCategory = await categoryService.getCategoryByName(categoryName)
    if (existingCategory) {
        return next(new ApiError('this category is already exist', 404))
    }
    const newCategory = await categoryService.addNewCategoryService({
        categoryName,
        slug: slugify(categoryName)
    });
    res.status(201).json({ status: "success", data: { newCategory } });

}

module.exports.updateOneCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    const categoryName = req.body.categoryName;
    const updatedData = { ...req.body };
    if (categoryName) {
        updatedData.slug = slugify(categoryName, { lower: true, strict: true });
    }

    const updatedCategory = await categoryService.editCategoryService(categoryId, updatedData);
    if (updatedCategory.modifiedCount === 0) {
        return next(new ApiError('this category is not found', 404));
    }

    res.status(200).json({ status: "success", data: { updatedCategory } });
}

module.exports.deleteOneCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    const deletedCategory = await categoryService.deleteCategoryService(categoryId);
    if (!deletedCategory) {
        return next(new ApiError('this category is not found'), 404)
    }
    res.status(200).json({ status: "success", data: null });

}

module.exports.uploadCategoryImage = async (req, res, next) => {
    const categoryId = req.params.categoryId
    const category = await categoryService.getCategoryByIdService(categoryId)
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    cloudinary.uploader.upload_stream(
        { folder: 'categories' },
        (error, result) => {
            if (error) {
                return next(error);
            }
            category.categoryImage = result.secure_url;
            category.save();
            res.status(200).json({ message: "Image uploaded successfully", category });
        }
    ).end(req.file.buffer);

}