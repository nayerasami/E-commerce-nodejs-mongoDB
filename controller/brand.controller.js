const brandsService = require('../services/brand.service');
const ApiError = require('../utils/errorClass')
const slugify = require('slugify');
const cloudinary = require('../config/cloudinary.config')


module.exports.getAllBrands = async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brands = await brandsService.getAllBrandsService(limit, skip)
    res.status(200).json({ status: "success", results: brands.length, data: { brands } })

}

module.exports.getBrandById = async (req, res, next) => {
    const { id } = req.params
    const brand = await brandsService.getSpecificBrandService(id)
    console.log("brand", brand)
    if (brand.length == 0) {
        return next(new ApiError('This brand is not found', 404));
    }
    res.status(200).json({ status: "success", data: { brand } })
}

module.exports.addNewBrand = async (req, res, next) => {
    const { name } = req.body
    const brandData = { name, slug: slugify(name) }
    const existingBrand = await brandsService.getBrandByName(name)
    if (!existingBrand) {
        return next(new ApiError('brand name already exists', 404))
    }
    const newBrand = await brandsService.addNewBrandService(brandData)
    res.status(201).json({ status: "success", data: { newBrand } })
}

module.exports.updateBrand = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedData = { ...req.body };
    if (name) {
        updatedData.slug = slugify(name, { lower: true, strict: true });
    }
    const newBrand = await brandsService.updateBrandService(id, updatedData);

    if (newBrand.modifiedCount === 0) {
        return next(new ApiError('This brand is not found', 404));
    }

    res.status(200).json({ status: "success", data: { newBrand } });

}

module.exports.deleteBrand = async (req, res, next) => {
    const { id } = req.params;
    const deletedBrand = await brandsService.deleteBrandService(id)
    if (deletedBrand.deletedCount === 0) {
        return next(new ApiError('this brand is not found', 404))
    }
    res.status(200).json({ status: "success", data: null })
}

module.exports.uploadBrandImage = async (req, res, next) => {
    const { id } = req.params;
    const brand = await brandsService.getSpecificBrandService(id);
    if (!brand) {
        return next(new ApiError('This brand is not found', 404));
    }

    cloudinary.uploader.upload_stream(
        { folder: 'brands' },
        (error, result) => {
            if (error) {
                return next(error);
            }
            brand.image = result.secure_url;
            console.log(brand.image)
            brand.save();
            res.status(201).json({ message: "Image uploaded successfully", brand });
        }
    ).end(req.file.buffer);


}