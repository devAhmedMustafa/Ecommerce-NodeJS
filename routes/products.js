const router = require('express').Router();
const {adminAuthorization} = require('./verifyToken');
const Product = require('../models/Product')

router.get('/', async (req,res)=>{

    const query = req.query;

    try{

        const products = query?
        await Product.find({title: query.title}, {projection:{_id:0, title:1}}):
        await Product.find();

        return res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
    }

})

router.get('/find/:id', async (req,res)=>{

    try{
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
    
})

router.post('/', adminAuthorization, async (req,res)=>{

    const newProduct = new Product(req.body)

    try{

        const saved = await newProduct.save();
        return res.status(201).json(saved);

    }
    catch(err){
        return res.status(500).json(err);
    }
})

router.put('/:id', adminAuthorization, async (req,res)=>{
    try{

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new:true}
        )
        res.status(200).json(updatedProduct)

    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router