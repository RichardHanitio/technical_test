const express = require('express');
const UserController = require("../controller/UserController")
const {createCustomError} = require("../utils/customError")
const {isAuthenticated} = require("../utils/verifyUser")
const jwt = require("jsonwebtoken")

const userController = new UserController()
const router = express.Router()

router.post("/register", async(req, res, next) => {
  const {id, nama, pin} = req.body.data;
  try {
    const resp = await userController.userRegistration(id, nama, pin);
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err)
  }
});

router.post("/login", async(req, res, next) => {
  const {id, pin} = req.body;
  try {
    const resp = await userController.userLogin(id, pin)
    // if it's successful, setup the jwt
    let token;
    if (resp.status === 200) {
      token = jwt.sign({
        id : resp.user.id,
        nama : resp.user.nama
      }, process.env.SECRETKEY)
      return res.status(resp.status).cookie("access_token", token, {
        secure: true, 
        sameSite : 'none',
        maxAge : 1 * 60 * 60 * 1000
      }).json(resp)
    } else {
      return res.status(resp.status).json(resp)
    }
    
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("access_token");
  return res.status(200).json({
    msg : "Logout successful",
  })
});

router.get("/users", isAuthenticated, async(req, res, next) => {
  const id = req.query.id
  try {
    const resp = await (id ? userController.getUserById(id) : userController.getAllUsers())
    if (resp.length !== 0) {
      res.status(200).json(resp)
    } else {
      throw createCustomError("Pengguna tidak ditemukan", 404)
    }
  } catch (err) {
    next(err)
  }
})

router.post("/topup", isAuthenticated, async(req, res, next) => {
  const {id, amount} = req.body

  try {
    const resp = await userController.topUp(id, amount)
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err)
  }
})

router.post("/withdraw", isAuthenticated, async(req, res, next) => {
  const {id, amount} = req.body
  try {
    const resp = await userController.withdraw(id, amount)
    res.status(resp.status).json(resp)
  } catch(err) {
    next(err)
  }
})


module.exports = router;