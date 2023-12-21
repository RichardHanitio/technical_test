const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./routes/UserRoutes")
const TransactionRoutes = require("./routes/TransactionRoutes")
const errorHandlerMiddleware = require("./utils/errorHandler");
const {isAuthenticated} = require("././utils/verifyUser")

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

// routers
app.use(UserRoutes);
app.use(isAuthenticated, TransactionRoutes);

app.get("/", (req, res) => res.send("Welcome to Richard Bank ATM API. If you catches any bug, please report them to richardhan82@gmail.com"))

// middlewares
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Backend listening on port "+process.env.PORT)
})  
