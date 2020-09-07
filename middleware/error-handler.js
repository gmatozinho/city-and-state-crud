const { ValidationError } = require("express-validation");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  res.status(400).json({ message: err.message });
};

module.exports = errorHandler;
