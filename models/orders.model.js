const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ordersSchema =new mongoose.Schema({
shippingAddress:{
    type:String,
    required:true

},
taxPrice:{
    type:Number,
    required:true
},
shippingPrice:{
    type:Number,
    required:true
},
totalOrderPrice:{
    type:Number,
    required:true

},
paymentMethod:{
    type:String,
    required:true

},
isPaid:{
    type:Boolean,
    required:true

},
isDelivered:{
    type:Boolean,
    required:true

},
userId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'User'
},
productId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Product'
},
createdAt: {
    type: Date,
    default: Date.now
},
},{timestamps:true})

module.exports=ordersSchema;
