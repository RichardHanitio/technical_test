const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserController = require("./controller/UserController")
const CustomAPIError = require("./utils/customError")
// const errorHandlerMiddleware = require("./utils/errorHandler");

dotenv.config();
const app = express();

let whiteList = ["http://localhost:3000"];

// middlewares
app.use(helmet());
app.use(cors({
  origin : whiteList,
  credentials : true,
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

const userController = new UserController();

app.post("/register", async(req, res) => {
  const {id, nama, pin, saldo} = req.body;
  try {
    const newUser = await userController.userRegistration(id, nama, pin, saldo);
    if (newUser.status === 201) {
      res.status(201).json({
        msg : newUser.msg,
        user : newUser.user.getUserInfo()
      })  
    } else {
      throw new CustomAPIError(newUser.msg, newUser.status)
    }
  } catch (err) {
    res.status(500).json({msg : err.message})
  }
});

app.post("/login", async(req, res) => {
  const {id, pin} = req.body;
  try {
    const resp = await userController.userLogin(id, pin)
    console.log(resp)
    if (resp.status===200){
      res.status(200).json({
        msg : resp.msg,
        user : resp.user.getUserInfo()
      })
    } else {
      throw new CustomAPIError(resp.msg, resp.status)
    }
  } catch (err) {
    res.status(500).json({msg : err.message})
  }
});

app.get("/user", async(req, res) => {
  const id = req.query.id
  try {
    const user = await userController.getUserById(id)
    console.log(user)
    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

app.get("/", (req, res) => res.send("Welcome to Richard Bank ATM API. If you catches any bug, please report them to richardhan82@gmail.com"))

// middlewares
// app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Backend listening on port "+process.env.PORT)
})  
