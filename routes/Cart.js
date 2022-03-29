const router = require("express").Router();
const { verfiytokenAndAuthroization,verfiytokenAndAdnmin,verfiytoken } = require("./verifyToken");
const Cart = require("../models/Cart");
const x64Core = require("crypto-js/x64-core");


//Create Cart 
router.post("/createcart",verfiytoken,async(req,res)=>{
    const newcart = new Cart(req.body);
    try {
        const savecart =await newcart.save(); x64Core
         res.status(200).json(savecart);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Product
router.put("/update/:id",verfiytokenAndAuthroization  ,async(req,res)=>{
try {
    console.log( req.params.id);
    const updateCart  = await Product.findByIdAndUpdate(
        req.params.id,{$set:req.body},{new:true}
    );
    res.status(200).json(updateCart);

} catch (error) {
    res.status(500).json(error);
}

});

//Delete
router.delete("/delete/:id",verfiytokenAndAuthroization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get User Cart
router.get("/find/:userId",verfiytokenAndAuthroization,async(req,res)=>{
    console.log(req.params.id);
    try {
        const cart = await Cart.find({ususerId:req.params.userId});
       res.status(200).json(cart);
     } catch (error) {
        res.status(500).json(error);
    }
});

//Get all 
router.get("/getcartitem",verfiytokenAndAdnmin,async(req,res)=>{
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports= router;