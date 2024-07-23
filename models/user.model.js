const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    userName: {
        type: String,
        lowercase: true,
        required: true
    }, 
    password:{
        type:String,
        require:true,

    },
    phoneNumber: {
        type: Number,
    },
    city: {
        type: String
    },
    Street: {
        type: String
    },
    floorNumber: {
        type: String
    },
    role:{
        type: Schema.Types.Mixed,
    
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})


module.exports = mongoose.model('User',userSchema);