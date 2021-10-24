const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res)=>{
    const {size} = req.query;
    const products = [];
    const limit = size || 10;

    for (let i = 0; i < limit; i++){
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price()),
            image: faker.image.imageUrl(),
        });
    }
    res.json(products);
});

router.get('/filter', (req, res)=>{
    res.send('estoy en el filter');
});

router.get('/:id', (req, res)=>{
    const { id } =req.params;

    res.json({
        id,
        name: 'prod1',
        price: 150
    });
});

 module.exports = router;

