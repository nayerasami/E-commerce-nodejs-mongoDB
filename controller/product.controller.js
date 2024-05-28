const productService = require('../services/product.service');
const slugify = require('slugify');
const ApiError = require('../utils/errorClass')

module.exports.getAllProducts = async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const products = await productService.getAllProductService(limit, skip);
    res.status(200).json({ status: "success", results: products.length, data: { products } });

}

module.exports.getSpecificProduct = async (req, res, next) => {

    const { id } = req.params;
    const specificProduct = await productService.getSpecificProductService(id);
    if (specificProduct.length == 0) {
        return next(new ApiError('this product is not found', 404))
    }

    res.status(200).json({ status: "success", data: { specificProduct } });

}

module.exports.createNewProduct = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new ApiError('Product name is required', 400));
    }
    
    const existingProduct = await productService.getProductByNameService(name);
    if (existingProduct) {
        return next(new ApiError('This product already exists', 404));
    }

    const newProduct = await productService.addNewProductService({
        ...req.body,
        slug: slugify(name)
    });

    // Send success response
    res.status(201).json({ status: "success", data: { newProduct } });

}

module.exports.updateOneProduct = async (req, res, next) => {

    const { id } = req.params;
    const { name } = req.body;
    const updatedData = { ...req.body };
    if (name) {
        updatedData.slug = slugify(name, { lower: true, strict: true });
    }

    const updatedProduct = await productService.updateProductService(id, updatedData);
    if (updatedProduct.modifiedCount === 0) {
        return next(new ApiError('this product is not found', 404));
    }

    res.status(200).json({ status: "success", data: { updatedProduct } });
}

module.exports.deleteOneProduct = async (req, res, next) => {

    const { id } = req.params;
    const deletedProduct = await productService.deleteProductService(id);
    if (deletedProduct.deletedCount === 0) {
        return next(new ApiError('this product is not found'), 404)
    }
    res.status(200).json({ status: "success", data: null });

}
