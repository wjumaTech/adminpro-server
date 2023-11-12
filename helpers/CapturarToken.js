exports.CapturarToken = ( req ) => {
  const token = req.header('x-token');
  if(!token) {
    return false;
  }
  return token;
}