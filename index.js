const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3005;

// def ruta
app.get('/', (req, res)=>{
    res.send('hola iniciando server express');
});

app.listen(port, ()=>{
    console.log('mi port', port);
});

routerApi(app);


