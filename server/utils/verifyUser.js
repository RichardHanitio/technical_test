const jwt = require("jsonwebtoken")

function isAuthenticated(req, res, next) {
  const accessToken = req.cookies.access_token;
  if(!accessToken) {
    return res.status(401).json({
      status : 401,
      msg : "Unauthorized"
    })
  }
  jwt.verify(accessToken, process.env.SECRETKEY, (err, user) => {
    if(err) return res.status(404).json({
      status : 404,
      msg : "Token tidak valid. Cobalah untuk masuk kembali"
    })
    req.user = user
  })
  
  return next()
}

module.exports = {isAuthenticated};