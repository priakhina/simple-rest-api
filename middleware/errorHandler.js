const ConflictError = require('../errors/ConflictError');

const errorHandler = (error, req, res, next) => {
  // Joi validation errors
  if (error.name === 'ValidationError') {
    const messages = error.details.map((err) => err.message);

    return res.status(400).send({
      error: messages.length > 1 ? messages : messages[0],
    });
  }

  if (error instanceof ConflictError) {
    return res.status(error.status).send({
      error: error.details.length > 1 ? error.details : error.details[0],
    });
  }

  // Custom errors
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  return res.status(status).send({ error: message });
};

module.exports = errorHandler;
