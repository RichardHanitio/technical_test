const express = require('express');
const UserController = require("../controller/UserController")
const {createCustomError} = require("../utils/customError")

const userController = new UserController()
const router = express.Router()

router.post("/register", async(req, res) => {
  const {id, nama, pin, saldo} = req.body;
  try {
    const resp = await userController.userRegistration(id, nama, pin, saldo);
    if (resp.status === 201) {
      res.status(201).json({
        msg : resp.msg,
        user : resp.user.getUserInfo()
      })  
    } else {
      next(createCustomError(resp.msg, resp.status))
    }
  } catch (err) {
    next(err)
  }
});

router.post("/login", async(req, res) => {
  const {id, pin} = req.body;
  try {
    const resp = await userController.userLogin(id, pin)
    if (resp.status===200){
      res.status(200).json({
        msg : resp.msg,
        user : resp.user.getUserInfo()
      })
    } else {
      next(createCustomError(resp.msg, resp.status))
    }
  } catch (err) {
    next(err);
  }
});

router.get("/users", async(req, res) => {
  const id = req.query.id
  try {
    const resp = await (id ? userController.getUserById(id) : userController.getAllUsers())
    res.status(200).json(resp)
  } catch (err) {
    next(err)
  }
})

module.exports = router;