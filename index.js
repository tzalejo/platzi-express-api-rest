const express = require('express');
const app = express();
const faker = require('faker');

const port = 3005;

// def ruta
app.get('/', (req, res)=>{
    res.send('hola iniciando server express');
});


app.get('/products', (req, res)=>{
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

app.get('/products/:id', (req, res)=>{
    const { id } =req.params;

    res.json({
        id,
        name: 'prod1',
        price: 150
    });
});

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
    const {categoryId, productId} = req.params;
    res.json({
        id_cat: categoryId,
        id_pr: productId,
    });
});

app.get('/users', (req, res)=>{
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


app.get('/users/:userId/products/:productId', (req, res)=>{
    const {categoryId, productId} = req.params;
    res.json({
        id_cat: userId,
        id_pr: productId,
    });
});


app.listen(port, ()=>{
    console.log('mi port', port);
});




