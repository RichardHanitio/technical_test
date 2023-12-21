const {CustomAPIError} = require("./customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if(err instanceof CustomAPIError) {
    console.log(err)
    return res.status(err.statusCode).json({status : err.statusCode, msg : err.message})
  }
  return res.status(500).json({status : 500, msg : "Terjadi kesalahan, mohon dicoba lagi", data : `${err}`});
}

module.exports = errorHandlerMiddleware;