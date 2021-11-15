const express = require('express');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middleware/error.handler');
const app = express();
const port = 3005;

//respuesta en json
app.use(express.json());
// routas
routerApi(app);

// middleware
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Iniciando express en el puertro ', port);
});
