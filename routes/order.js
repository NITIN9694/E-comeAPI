const router = require("express").Router();
const { verfiytokenAndAuthroization,verfiytokenAndAdnmin,verfiytoken } = require("./verifyToken");
const Order = require("../models/Order");


//Create Cart 
router.post("/createOrder",verfiytoken,async(req,res)=>{
    const newOrder = new Order(req.body);
    try {
        const saveorder =await newOrder.save();
        res.status(200).json(saveorder);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Product
router.put("/update/:id",verfiytokenAndAdnmin  ,async(req,res)=>{
try {
    console.log( req.params.id);
    const updareOrder  = await Order.findByIdAndUpdate(
        req.params.id,{$set:req.body},{new:true}
    );
    res.status(200).json(updareOrder);

} catch (error) {
    res.status(500).json(error);
}

});

//Delete
router.delete("/delete/:id",verfiytokenAndAdnmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get User Order
router.get("/find/:id",verfiytokenAndAuthroization,async(req,res)=>{
    console.log(req.params.id);
    try {
        const order = await Order.find({ususerId:req.params.id});
       res.status(200).json(order);
     } catch (error) {
        res.status(500).json(error);
    }
});

//Get all 
router.get("/getorderall",verfiytokenAndAdnmin,async(req,res)=>{
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get monthly Income
router.get("/income",verfiytokenAndAdnmin,async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousmonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
      try {
          const income = await Order.aggregate([
            {$match:{createdAt:{$gte:previousmonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                },
            },
                { 
                    $group:{
                        _id:"$month",
                        total:{$sum:"$sales"}
                    },
            
            },
            ]);
          res.status(200).json(income);
      } catch (error) {
          console.log(error);
          res.status(500).json(error);
      }


});

module.exports= router;
