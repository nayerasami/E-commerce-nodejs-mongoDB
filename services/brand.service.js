const Brands = require('../models/brands.model')


module.exports.getAllBrandsService =async(limit,skip)=>{
    return await Brands.find({}).skip(skip).limit(limit)

}

module.exports.getSpecificBrandService =async(brandId)=>{
    return await Brands.find({_id:brandId})
}

module.exports.addNewBrandService =async(brandData)=>{
    const newBrand =new Brands(brandData)
    await newBrand.save()
    return newBrand

}

module.exports.updateBrandService =async(brandId,brandData)=>{
    return await Brands.updateOne({_id:brandId},{$set:{...brandData}})
}

module.exports.deleteBrandService =async(brandId)=>{
    return await Brands.deleteOne({_id:brandId})
}

module.exports.getBrandByName= async(name)=>{
return await Brands.findOne({name})
}