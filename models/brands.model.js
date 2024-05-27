const mongoose =require('mongoose')

const brandsSchema =mongoose.Schema({

    name:{
        type:String ,
        required: [true, "brand name required"],
        trim:true,
        unique: [true, "brand must be unique"],
        minLength: [3, "too short for a brand name"],
        maxLength: [32, "too long for a brand name"]
    },
    slug:{
        type:String,
        lowerCase:true
    },
    image:{
        type:String
    }
},{timestamps:true})


module.exports =mongoose.model('Brands',brandsSchema)