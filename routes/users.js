const router = require('express').Router();
const {userAuthorization, adminAuthorization} = require('./verifyToken');
const cryptoJS = require('crypto-js');
const User = require('../models/User')

router.put('/:id', userAuthorization, async (req,res)=>{
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }

})

router.delete('/:id', userAuthorization, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(204).json("Deleted Successfuly")
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.get('/find/:id', adminAuthorization, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...user_info} = user._doc;
        return res.status(200).json(user_info);
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get('/', adminAuthorization, async (req,res)=>{
    try{
        const query = req.query.new;
        const users = query? await User.find().sort({_id:-1}).limit(1) : await User.find();
        return res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router