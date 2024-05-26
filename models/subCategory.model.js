const mongoose = require('mongoose')
const Schema =mongoose.Schema

const subCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "subcategory name required"],
        unique: [true, "subcategory must be unique"],
        minLength: [3, "too short for a subcategory name"],
        maxLength: [32, "too long for a subcategory name"]
    },
    slug: {
        type: String,
        lowerCase: true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    }
}, { timestamps: true })




module.exports = mongoose.model('SubCategory', subCategorySchema)
