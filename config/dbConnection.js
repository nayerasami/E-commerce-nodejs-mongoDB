const mongoose =require('mongoose')



const connectDB = async function(){

    const res = mongoose.connect(process.env.DB_URI)
    console.log('DB Connected ...')
    return res;

}

module.exports=connectDB