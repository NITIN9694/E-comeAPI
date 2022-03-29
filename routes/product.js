const router = require("express").Router();
const { verfiytokenAndAuthroization,verfiytokenAndAdnmin, } = require("./verifyToken");
const Product = require("../models/Product");


//Post Product 
router.post("/",verfiytokenAndAdnmin,async(req,res)=>{
    const newProduct = new Product(req.body);
    try {
        const saveproduct =await newProduct.save();
        res.status(200).json(saveproduct);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Product
router.put("/update/:id",verfiytokenAndAdnmin,async(req,res)=>{
try {
    console.log( req.params.id);
    const updateproduct  = await Product.findByIdAndUpdate(
        req.params.id,{$set:req.body},{new:true}
    );
    res.status(200).json(updateproduct);

} catch (error) {
    res.status(500).json(error);
}

});

//Delete
router.delete("/delete/:id",verfiytokenAndAdnmin,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

//find product
router.get("/find/:id",verfiytokenAndAdnmin,async(req,res)=>{
    console.log(req.params.id);
    try {
        const product = await Product.findById(req.params.id);
       res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get all Product
router.get("/allproduct",async(req,res)=>{
    const qNew =req.query.new;
    const qCategory = req.query.category;
    try {
       let product;
       
       if(qNew){
           product= await Product.find().sort({createdAt:-1}).limit(5);

       }else if(qCategory){
       product = await Product.find({categories:{
           $in:[qCategory],
       }});
          
       }else{
           product =await Product.find();
       }
       res.status(200).json(product);
    } catch (error) {
        
        res.status(500).json(console.log(error));
    }
});

module.exports= router;