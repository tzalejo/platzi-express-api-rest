const express = require('express');
//const faker = require('faker');
const router = express.Router();

const UsersService = require('./../services/user.service');
const usersService = new UsersService();

router.get('/', (req, res)=>{
    const users = usersService.find();    
    res.json(users);
});

router.get('/:id',(req, res)=>{
    const { id } = req.params;
    const user = usersService.findOne(id);
    res.json(user);
});


router.get('/:userId/products/:productId', (req, res)=>{
    const { userId, productId} = req.params;
    res.json({
        id_cat: userId,
        id_pr: productId,
    });
});


module.exports = router
