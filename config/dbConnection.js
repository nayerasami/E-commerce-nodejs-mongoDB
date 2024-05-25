const mongoose =require('mongoose')



const connectDB = async function(){

try{
    const res = mongoose.connect(process.env.DB_URI)
    console.log('DB Connected ...')
    return res;
}catch(err){

    console.log(err)
    throw err;
}

}

module.exports=connectDB