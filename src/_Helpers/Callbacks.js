
const callbackHandler = (type, message, entity = null, prop = null) => {
  return {type, message, payload: entity || prop}
};
const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json(callbackHandler('error', err.message));
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(callbackHandler('error', 'Não autorizado! :('));
  }
  return res.status(500).json(callbackHandler('error', err.message));
}
module.exports = {
  callbackHandler,
  errorHandler
}