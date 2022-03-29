const jwt  = require("jsonwebtoken");

const verfiytoken=(req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){
              return   res.status(403).json("Token is not valied"+err)
            }
            else{
                req.user =user;
                next();
            }
         });
    }
    else{
        return res.status(401).json("You are not authincated");
    }
};

const verfiytokenAndAuthroization=  (req,res,next)=>{
    verfiytoken(req,res,()=>{
        console.log(req.params.id);
        if(req.user.id == req.params.id ){
           return next();
            
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
const verfiytokenAndAdnmin=  (req,res,next)=>{
    verfiytoken(req,res,()=>{
      
        if(req.user.isAdmin ){
           return next();
            
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};


module.exports= {verfiytoken,verfiytokenAndAuthroization,verfiytokenAndAdnmin};
