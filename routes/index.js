const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const isloggedin = require('../middlewares/isloggedin');
const userModel = require('../models/user-models');

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", {error, loggedin: false });
  });

router.get('/shop' , isloggedin , async function(req,res){
  let products = await productModel.find();
  let success = req.flash("success");
  res.render('shop', {products, success});
})
router.get('/cart' , isloggedin , async function(req,res){
  let user= await userModel.findOne({email: req.user.email}).populate('cart');
  res.render('cart', {user});
})

router.get('/addtocart/:productid', isloggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        let productId = req.params.productid;

        let cartItem = user.cart.find(item => item.product.toString() === productId);

        if (cartItem) {
            cartItem.quantity += 1; // Increase quantity if item already exists
        } else {
            user.cart.push({ product: productId, quantity: 1 }); // Add new item with quantity 1
        }

        await user.save();
        req.flash("success", "Product added to cart");
        res.redirect('/shop');
    } catch (error) {
        console.error("Error adding to cart:", error);
        req.flash("error", "Something went wrong");
        res.redirect('/shop');
    }
});

module.exports = router;