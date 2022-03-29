const express= require("express");
const app =express();
const dotenv = require('dotenv');
const userRoute=require('./routes/user');
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const productRoute = require("./routes/product");
const CartRoute = require("./routes/Cart");
const OrderRoute = require("./routes/order"); 

dotenv.config()
app.use(express.json());

//contect to DB
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true,  useUnifiedTopology: true}).then(()=>
    console.log("DB Connected")
).catch((e)=>{
    console.log(e);  
  });

//Auth
app.use("/api/auth",auth);

//user
app.use("/api/user",userRoute);

//Product
app.use("/api/product",productRoute);

//Cart
app.use("api/cart",CartRoute);

//Order
app.use("/api/order",OrderRoute);

app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server is running")
}) 