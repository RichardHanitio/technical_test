const express = require('express');
const UserController = require("../controller/UserController")
const {createCustomError} = require("../utils/customError")

const userController = new UserController()
const router = express.Router()

router.post("/register", async(req, res, next) => {
  const {id, nama, pin, saldo} = req.body;
  try {
    const resp = await userController.userRegistration(id, nama, pin, saldo);
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err)
  }
});

router.post("/login", async(req, res, next) => {
  const {id, pin} = req.body;
  try {
    const resp = await userController.userLogin(id, pin)
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err);
  }
});

router.get("/users", async(req, res, next) => {
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

router.post("/topup", async(req, res, next) => {
  const {id, amount} = req.body
  try {
    const resp = await userController.topUp(id, amount)
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err)
  }
})

router.post("/withdraw", async(req, res, next) => {
  const {id, amount} = req.body
  try {
    const resp = await userController.withdraw(id, amount)
    res.status(resp.status).json(resp)
  } catch(err) {
    next(err)
  }
})


module.exports = router;