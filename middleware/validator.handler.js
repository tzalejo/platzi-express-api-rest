const boom = require("@hapi/boom");

function validatorHandler(schema, property ){
  return (req, res, next) => {
    const data = req[property]; // req.body, req.params, req.query
    const { error } = schema.validate(data, {abortEarly: false}); // con esta prop encuanta todo los errores y los envias juntos
    if (error) {
      next(boom.badRequest(error)); // enviamos al middleware de error
    }
    next(); // continua el proceso..
  }
}

module.exports =  validatorHandler;
