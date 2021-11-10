const express = require('express');
const ProductsService = require('./../services/product.service');

const router = express.Router();
const productService = new ProductsService();


router.get('/', (req, res)=>{
    const products = productService.find();
    res.json(products);
});

router.get('/filter', (req, res)=>{
    res.send('estoy en el filter');
});

router.get('/:id', (req, res)=>{
    const { id } =req.params;
    const product = productService.findOne(id);
    res.json(product);
});

router.post('/', (req, res)=>{
    const body = req.body;
    const productNew = productService.create(body);
    res.status(201).json({
        message: 'create',
        data: productNew
    });
});

router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const body = req.body;
    res.json({
        message: 'modificar',
        data: body,
        id,
    });
});


router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    res.json({
        message: 'eliminar',
        id,
    });
});

module.exports = router;

