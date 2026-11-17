const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message;

  if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'MulterError') {
    statusCode = err.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'A record with that value already exists';
  }

  res.status(statusCode).json({
    message: process.env.NODE_ENV === 'production' && statusCode >= 500
      ? 'An unexpected error occurred'
      : message,
    ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack })
  });
};

module.exports = { notFound, errorHandler };
