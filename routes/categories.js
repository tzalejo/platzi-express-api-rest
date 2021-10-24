const express = require('express');
// const faker = require('faker');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({
        category : 'categories',
    });
});

router.get('/:categoryId/products/:productId', (req, res)=>{
    const {categoryId, productId} = req.params;
    res.json({
        id_cat: categoryId,
        id_pr: productId,
    });
});

module.exports = router;
