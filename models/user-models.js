const mongoose = require('mongoose');  
// Define schema

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    orders: {
        type:Array,
        default: []
    },
    contact:Number,
    picture: String
})

// Create model
module.exports=mongoose.model("user", userSchema);