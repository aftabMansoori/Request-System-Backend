module.exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports.errorHandling = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({
      status: "Error",
      message: "Page Not Found",
    });
  });

  app.use((err, req, res, next) => {
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));
    else if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res));
    else if (err.name === "CastError") return (err = handleCastError(err, res));
    else
      res.status(err.statusCode || 500).json({
        status: "Error",
        message: err.message,
      });
  });
};

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const error = `An account with that ${field} already exists.`;
  res.status(400).json({
    status: "Duplication Error",
    message: error,
  });
};

const handleValidationError = (err, res) => {
  let error = Object.values(err.errors).map((el) => el.path);
  if (error.length > 1) {
    error = error.join(",");
  }
  error = "Enter valid " + error;
  error = error.replace("location.coordinates", "location");
  res.status(400).json({
    status: "Validation Error",
    message: error,
  });
};

const handleCastError = (err, res) => {
  const error = `Invalid ${err.path}: ${err.value}`;
  res.status(400).json({
    status: "Cast Error",
    message: error,
  });
};
