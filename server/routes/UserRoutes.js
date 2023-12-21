const express = require('express');
const UserController = require("../controller/UserController")
const {createCustomError} = require("../utils/customError")
const {isAuthenticated} = require("../utils/verifyUser")

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
  const {id, pin} = req.body.data;
  try {
    const resp = await userController.userLogin(id, pin)
    // if it's successful, setup the session
    if (resp.status === 200) {
      req.session.userId = resp.user.id,
      req.session.userName = resp.user.name
    }
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err);
  }
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