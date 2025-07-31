const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    const errors = error.details.map((err) => err.message);

    return res.status(400).send({
      error: errors.length > 1 ? errors : errors[0],
    });
  }

  next(error);
};

module.exports = errorHandler;
