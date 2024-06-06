const Product = require('../models/product.model')


module.exports.getAllProductService =async(limit,skip)=>{
    return await Product.find({}).skip(skip).limit(limit)

}

module.exports.getSpecificProductService =async(productId)=>{
    return await Product.findById(productId)
}

module.exports.addNewProductService =async(productData)=>{
    const newBrand =new Product(productData)
    await newBrand.save()
    return newBrand

}

module.exports.updateProductService =async(productId,productData)=>{
    return await Product.updateOne({_id:productId},{$set:{...productData}})
}

module.exports.deleteProductService =async(productId)=>{
    return await Product.deleteOne({_id:productId})
}

module.exports.getProductByNameService= async(name)=>{
return await Product.findOne({name:name})
}