const mongoose =require('mongoose')
const Schema =mongoose.Schema


const productSchema = new mongoose.Schema({
name:{
    type:String, 
    required: [true, "product name required"],
    minLength: [3, "too short for a product name"],
    maxLength: [150, "too long for a product name"]
},
slug:{
    type:String,
    lowerCase:true
},
quantity:{
    type:Number,
    required:[true,"product quantity is required"]
},
price:{
    type:Number,
    required:[true,"product price is required"]
},
productDescription:{
    type:String,
    required:[true,"product description is required"],
    minLength: [20, "too short for a product description"],
    maxLength: [280, "too long for a product description"]

},
productImages:[{
    type:String
}],
imageCover:{
    type:String,
},
categoryId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Category'
},
subCategory:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'SubCategory'
},
brandId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Brands'
}



},{timestamps:true})



module.exports =mongoose.model('Product',productSchema)