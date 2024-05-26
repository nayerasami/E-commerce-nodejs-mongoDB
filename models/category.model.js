const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: [true, "Category is required"],
        unique: [true, "Category must be unique"],
        minLength: [3, "too short for a category name"],
        maxLength: [32, "too long for a category name"]
    },
    //a and b => shopping.com/a-and-b
    // slug is :a-and-b 
    slug: {
        type: String,
        lowerCase: true
    },
    categoryImage:{
        type:String
    }

}, 
{ timestamps: true }

)


module.exports = mongoose.model('Category', categorySchema)