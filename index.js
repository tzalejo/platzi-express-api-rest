const express = require('express');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middleware/error.handler');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3005;

// cors
// const whitelist = // son los mismos (si pego los links platzi me impide comentar)
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'), false);
//     }
//   }
// }

// app.use(cors(options));
app.use(cors());

//middleware de express que me permite recibir la información de POST en formato json
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
