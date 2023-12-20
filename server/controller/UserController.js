const mysql = require("mysql2/promise")
const dotenv = require("dotenv")
// const bcrypt = require("bcrypt")
const UserModel = require("../model/UserModel");

dotenv.config()

class UserController {
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

  async userRegistration(id, nama, pin, saldo=0) {
    const [rows] = await this.pool.execute(
      "INSERT INTO Pengguna (ID, Nama, Pin, Saldo) VALUES (?,?,?,?)",
      [id, nama, pin, saldo]
    )
    const [user] = await this.getUserById(rows.insertId);
    return {
      status : 201,
      msg : "Pengguna berhasil didaftarkan",
      user : user
    };
  }

  async userLogin(id, pin) {
    const [user] = await this.getUserById(id)
    if (!user || user.pin!==pin) {
      return {
        status : 401,
        msg : "Kredensial yang dimasukkan salah"
      }
    }
    return {
      status : 200,
      msg : "Login berhasil",
      user : user
    }
  }

  async getAllUser() {
    const [rows] = await this.pool.execute(
      "SELECT * FROM Pengguna"
    )
    return rows.map(row => new UserModel(row.ID, row.Nama, row.Pin, row.Saldo))
  }
  
  async getUserById(userId) {
    const [rows] = await this.pool.execute(
      "SELECT * FROM Pengguna WHERE id = ?",
      [userId]
    )
    return rows.map(row => new UserModel(row.ID, row.Nama, row.Pin, row.Saldo))
  }
}

module.exports = UserController