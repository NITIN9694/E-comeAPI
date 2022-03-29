const User = require("../models/User");
const { verfiytokenAndAuthroization,verfiytokenAndAdnmin,verfiytoken } = require("./verifyToken");

const router =  require("express").Router();

// router.get("/usertest",(req,res)=>{
//     res.send("user test is successfull")
// });


router.post('/post',(req,res)=>{
    const username = req.body.username;
    console.log(username);
    res.send("your username is"+ username);
})


//verfiy
router.put("/:id",verfiytokenAndAuthroization,async (req,res)=>{
if(req.body.password){
    req.body.password =CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
}

try {
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true});

    res.status(200).json(updateUser);
} catch (error) {
    res.status(500).json(error)  
}
});

//Delete
router.delete("/delete/:id",verfiytokenAndAuthroization,async(req,res)=>{
 try {
     console.log(req.params.id);
     await User.findByIdAndDelete(req.params.id)

     res.status(200).json("User has been deleted..")
 } catch (error) {
     res.status(500).json(error)
 }

})

//Get
router.get("/get/:id",verfiytokenAndAdnmin,async(req,res)=>{
    try {
        console.log(req.params.id+"get");
      const user  = await User.findById(req.params.id)
        const {password, ...other} = user._doc;
        res.status(200).json(other)
    } catch (error) {
    res.status(500).json(error)
        console.log(error);
    }
   
   })

  //Getall
router.get("/getall",verfiytokenAndAdnmin,async(req,res)=>{
    try {
   
      const user  = await User.find()
        res.status(200).json(user)
    } catch (error) {
    res.status(500).json(error)
        console.log(error);
    }
   
   })
   

module.exports = router;