exports.errorHandler = (error, req, res, next) => {


  const { stack, message } = error;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ ok: false, stack, message, statusCode })
};