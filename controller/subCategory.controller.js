const subCategoryService = require('../services/subCategory.service')
const slugify = require('slugify')
const ApiError = require('../utils/errorClass');



module.exports.getAllSubCategories = async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const SubCategories = await subCategoryService.getAllSubCategoriesService(limit, skip)
    res.status(200).json({ status: "success", result: SubCategories.length, data: { SubCategories } })

}

module.exports.getSubCategoryById = async (req, res, next) => {
    const subCategoryId = req.params.id
    const subCategory = await subCategoryService.getSubCategoryByIdService(subCategoryId)
    if (!subCategory) {
        next(new ApiError('this subcategory is not found', 404))
    }
    res.status(200).json({ status: "success", data: { subCategory } })
}


module.exports.createNewSubCategory = async (req, res, next) => {
    const {name,categoryId} = req.body;
    const subCategoryData = {
        name,
        slug: slugify(name),
        categoryId
        
    }
       
    if (!name || !categoryId) {
        return res.status(400).json({ status: "error", message: "Name and categoryId are required" });
    }
    const newSubCategory = await subCategoryService.addNewSubCategoryService(subCategoryData)
    res.status(201).json({ status: "success", data: { newSubCategory } })
}

module.exports.updateSubCategory = async (req, res, next) => {
    const subCategoryId = req.params.id;
    const name = req.body.name;
    const categoryId = req.body.categoryId;

    const updatedData = { name, categoryId };
    if (name) {
        updatedData.slug = slugify(name, { lower: true, strict: true });
    }

        const updatedSubCategory = await subCategoryService.updateSubCategoryService(subCategoryId, updatedData);
        if (updatedSubCategory.modifiedCount===0) {
            return next(new ApiError('this subcategory is not found', 404));
        }
        res.status(200).json({ status: "Success", data: { updatedSubCategory } });

}

module.exports.deleteSubCategory = async (req, res, next) => {
    const subCategoryId = req.params.id
    const deletedSubCategory = await subCategoryService.deleteSubCategoryService(subCategoryId)
    if (!deletedSubCategory) {
        next(new ApiError('this subcategory is not found', 404))
    }

    res.status(200).json({ status: "success", data: null })
}