const mongoose = require('mongoose');
const productschma = mongoose.Schema(
    {
        name: { type: String, 
             required:[true , "please enter a product name"]
    },
    quantity : {
        type : Number ,
        require :true ,
         default :0

    },
    price : {
        type :Number ,
        require : true,
    },
    image :{
        type :String,
        required:false,

    }
},
{
    timestamps:true // it will add
}
)

const Product = mongoose.model('Product',productschma);
module.exports= Product;