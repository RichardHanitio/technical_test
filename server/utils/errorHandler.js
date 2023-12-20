const {CustomAPIError} = require("./customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if(err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({msg : err.message, data : err})
  }
  return res.status(500).json({msg : "Terjadi kesalahan, mohon dicoba lagi", data : `${err}`});
}

module.exports = errorHandlerMiddleware;