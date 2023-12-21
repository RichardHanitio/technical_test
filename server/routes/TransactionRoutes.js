const express = require('express');
const TransactionController = require("../controller/TransactionController")
const {createCustomError} = require("../utils/customError")

const transactionController = new TransactionController()
const router = express.Router()

router.post("/transfer", async(req, res, next) => {
  const {idSumber, idTujuan, tujuanTransaksi, jumlah} = req.body;
  try {
    const resp = await transactionController.makeTransaction(idSumber, idTujuan, tujuanTransaksi, jumlah);
    res.status(resp.status).json(resp)
  } catch (err) {
    next(err)
  }
})

router.get("/transactions", async(req, res, next) => {
  const uid = req.query.uid;
  try {
    const resp = await (uid ? transactionController.getTransactionsByUserId(uid) : transactionController.getAllTransactions());
    if (resp.length!==0) {
      res.status(200).json(resp)
    } else {
      throw createCustomError("Tidak ada transaksi", 204)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router;