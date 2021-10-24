const products   = require('./products');
const users      = require('./users');
const categories = require('./categories');

function routerApi(app){
    app.use('/products', products);
    app.use('/users', users);
    app.use('/categories', categories);
}

module.exports = routerApi;

