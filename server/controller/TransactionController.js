const mysql = require("mysql2/promise")
const dotenv = require("dotenv")
const TransactionModel = require("../model/TransactionModel");
const {createCustomError} = require("../utils/customError")

dotenv.config()

class TransactionController {
  constructor() {
    this.pool = mysql.createPool({
      host : process.env.SQLHOST,
      port : process.env.SQLPORT,
      user : process.env.SQLUSER,
      password : process.env.SQLPASSWORD,
      database : process.env.SQLDATABASE,
      waitForConnections: true,
      connectionLimit : 10,
      queueLimit : 0,
    })
  }

  async makeTransaction(idSumber, idTujuan, tujuanTransaksi, jumlah) {
    // check credentials
    if (!idSumber || !idTujuan) {
      return {
        status : 404,
        msg : "ID kosong"
      }
    }
    
    if (!jumlah || jumlah < 0) {
      return {
        status : 404,
        msg : "Jumlah kosong/salah"
      }
    }

    // generate a random id
    const idTransaksi = Date.now() + Math.random().toString(36).substring(2)

    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // cek apakah saldo cukup untuk melakukan transaksi
      const [prevSumberSaldo] = await connection.execute(
        "SELECT Saldo FROM Pengguna WHERE ID=?",
        [idSumber]
      );

      const currSumberSaldo = parseFloat(prevSumberSaldo[0].Saldo) - parseFloat(jumlah);
      
      if (currSumberSaldo < 0) {
        return {
          status : 400,
          msg : "Saldo anda tidak cukup untuk melakukan transaksi"
        }
      }

      const [insertRow] = await connection.execute(
        "INSERT INTO Transaksi (IDTransaksi, TanggalTransaksi, IDSumber, IDTujuan, TujuanTransaksi, Jumlah) VALUES (?,?,?,?,?,?)",
        [idTransaksi, new Date(), idSumber, idTujuan, tujuanTransaksi||'', jumlah]
      );

      
      // update saldo pengirim
      await connection.execute(
        "UPDATE Pengguna SET Saldo=CAST(? AS DECIMAL(18,2)) WHERE Pengguna.ID=?",
        [currSumberSaldo.toFixed(2), idSumber]
      );

      
      // update saldo penerima
      const [prevTujuanSaldo] = await connection.execute(
        "SELECT Saldo FROM Pengguna WHERE ID=?",
        [idTujuan]
      );

      const currTujuanSaldo = parseFloat(prevTujuanSaldo[0].Saldo) + parseFloat(jumlah);

      await connection.execute(
        "UPDATE Pengguna SET Saldo=CAST(? AS DECIMAL(18,2)) WHERE Pengguna.ID=?",
        [currTujuanSaldo.toFixed(2), idTujuan]
      );

      const [selectRow] = await connection.execute(
        "SELECT * FROM Transaksi WHERE IDTransaksi=?",
        [idTransaksi]
      );

      // get user
      await connection.commit();

      return {
        status : 200,
        msg : "Saldo berhasil ditransfer",
        transaction : selectRow[0]
      };
    } catch (err) {
      await connection.rollback();
      throw createCustomError("Transaksi gagal", 500)
    } finally{
      connection.release();
    }
  }

  async getTransactionsByUserId(userId) {
    const [rows] = await this.pool.execute(
      "SELECT * FROM Transaksi WHERE IDSumber=? OR IDTujuan=?",
      [userId, userId]
    )
    return rows.map(row => new TransactionModel(row.IDTransaksi, row.TanggalTransaksi, row.IDSumber, row.IDTujuan, row.TujuanTransaksi, row.Jumlah))
  }

  async getTransactionById(transactionId) {
    const [rows] = await this.pool.execute(
      "SELECT * FROM Transaksi WHERE id = ?",
      [transactionId]
    )
    return rows.map(row => new TransactionModel(row.IDTransaksi, row.TanggalTransaksi, row.IDSumber, row.IDTujuan, row.TujuanTransaksi, row.Jumlah))
  }

  async getAllTransactions() {
    const [rows] = await this.pool.execute(
      "SELECT * FROM Transaksi"
    )
    return rows.map(row => new TransactionModel(row.IDTransaksi, row.TanggalTransaksi, row.IDSumber, row.IDTujuan, row.TujuanTransaksi, row.Jumlah))
  }
}

module.exports = TransactionController