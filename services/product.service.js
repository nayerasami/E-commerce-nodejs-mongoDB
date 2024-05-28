const Product = require('../models/product.model')


module.exports.getAllProductService =async(limit,skip)=>{
    return await Product.find({}).skip(skip).limit(limit)

}

module.exports.getSpecificProductService =async(brandId)=>{
    return await Product.find({_id:brandId})
}

module.exports.addNewProductService =async(brandData)=>{
    const newBrand =new Product(brandData)
    await newBrand.save()
    return newBrand

}

module.exports.updateProductService =async(brandId,brandData)=>{
    return await Product.updateOne({_id:brandId},{$set:{...brandData}})
}

module.exports.deleteProductService =async(brandId)=>{
    return await Product.deleteOne({_id:brandId})
}

module.exports.getProductByNameService= async(name)=>{
return await Product.findOne({name:name})
}