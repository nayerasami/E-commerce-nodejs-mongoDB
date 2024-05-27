const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "subcategory name required"],
        unique: [true, "subcategory must be unique"],
        trim:true,
        minLength: [3, "too short for a subcategory name"],
        maxLength: [32, "too long for a subcategory name"]
    },
    slug: {
        type: String,
        lowerCase: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true,'subcategory must belong to a parent category'],
        ref: 'Category'
    }
}, { timestamps: true })




module.exports = mongoose.model('SubCategory', subCategorySchema)
