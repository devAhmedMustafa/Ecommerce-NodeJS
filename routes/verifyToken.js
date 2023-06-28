const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.headers.token
    if(token){
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("Token is not valid!");
            else{
                req.user = user;
                next();
            }
        })
    }
    else{
        return res.status(401).json("Not authenticated");
    }
}

const userAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("Not Allowed");
        }
    })
}

const adminAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("Not Allowed");
        }
    })
}

module.exports = {verifyToken, userAuthorization, adminAuthorization}