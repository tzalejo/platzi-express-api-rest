const express = require('express');
//const faker = require('faker');
const router = express.Router();

router.get('/', (req, res)=>{
    const { limit, offset } = req.query;
    if (limit && offset){
    
    res.json(
        {
            id: 1,
            name: 'ale',
            email: 'tzale@mail.com',
            limit,
            offset
        },
    );
    }else{
    res. send('No hay datos');
    }
});

router.get('/:id',(req, res)=>{
    res.send('obtener un user');
});


router.get('/:userId/products/:productId', (req, res)=>{
    const { userId, productId} = req.params;
    res.json({
        id_cat: userId,
        id_pr: productId,
    });
});


module.exports = router
