const categoryService = require('../services/category.service');
const slugify = require('slugify');
const ApiError =require('../utils/errorClass')

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
    if(!specificCategory){
        return next(new ApiError(`There is no category with this id :${categoryId}`),404)
    }

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
    const categoryName = req.body.categoryName;

    const updatedData = { ...req.body };
    if (categoryName) {
        updatedData.slug = slugify(categoryName, { lower: true, strict: true });
    }
   
    const updatedCategory = await categoryService.editCategoryService(categoryId, updatedData);
    if (!updatedCategory) {
        return next(new ApiError(`There is no category with this id: ${categoryId}`, 404));
    }

    res.status(200).json({ status: "success", data: { updatedCategory } });
}

module.exports.deleteOneCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    const deletedCategory= await categoryService.deleteCategoryService(categoryId);
    if(!deletedCategory){
        return next(new ApiError(`There is no category with this id :${categoryId}`),404)
    }
    res.status(200).json({ status: "success", data: null });

}
