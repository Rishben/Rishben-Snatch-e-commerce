const mongoose = require('mongoose');
  
// Define schema

const productSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount:{
        type: Number,
        default: 0
    },
    bgcolor:String,
    panelcolor: String,
    textcolor: String
})

// Create model
module.exports=mongoose.model("product", productSchema);