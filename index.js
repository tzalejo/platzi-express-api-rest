const express = require('express');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middleware/error.handler');
const cors = require('cors');
const app = express();
const port = 3005;

// cors
// const whitelist = // son los mismos (si pego los links platzi me impide comentar)
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'), false);
//     }
//   }
// }

// app.use(cors(options));
app.use(cors());

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
