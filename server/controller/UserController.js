const mysql = require("mysql2/promise")
const dotenv = require("dotenv")
const UserModel = require("../model/UserModel");
const {createCustomError} = require("../utils/customError")

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
    //* add check credentials here
    //* add hashing pin here
    try {
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
    } catch (err) {
      throw createCustomError("Daftar akun gagal", 500)
    }
  }

  async userLogin(id, pin) {
    //* add check credentials here
    //* add hashing pin here
    try {
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
    } catch (err) {
      throw createCustomError("Masuk akun gagal", 500)
    }
  }

  async getAllUsers() {
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


  async topUp(userId, amount) {
    // check credentials
    if (!userId) {
      return {
        status : 404,
        msg : "ID kosong"
      }
    }
    if (!amount || amount < 0) {
      return {
        status : 404,
        msg : "Jumlah transfer kosong/salah"
      } 
    }

    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const [selectRows] = await connection.execute(
        "SELECT Saldo from Pengguna WHERE Pengguna.ID=?",
        [userId]
      );
      // get previous saldo
      const prevSaldo = selectRows[0].Saldo;

      const [updateRows] = await connection.execute(
        "UPDATE Pengguna SET Saldo=? WHERE Pengguna.ID=?",
        [prevSaldo + amount, userId]
      );

      // get user
      const [user] = await this.getUserById(updateRows.insertId);

      await connection.commit();

      return {
        status : 200,
        msg : "Saldo berhasil diisi",
        user : user
      };
    } catch (err) {
      await connection.rollback();
      throw createCustomError("Isi saldo gagal", 500)
    } finally{
      connection.release();
    }
  }

  async withdraw(userId, amount) {
    // check credentials
    if (!userId) {
      return {
        status : 404,
        msg : "ID kosong"
      }
    }
    if (!amount || amount < 0) {
      return {
        status : 404,
        msg : "Jumlah transfer kosong/salah"
      } 
    }

    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const [selectRows] = await connection.execute(
        "SELECT Saldo from Pengguna WHERE Pengguna.ID=?",
        [userId]
      );
      // get previous saldo
      const prevSaldo = selectRows[0].Saldo;
      
      // check if the previous saldo can be deducted
      if (prevSaldo <= amount) {
        return {
          status : 400,
          msg : "Saldo anda tidak cukup"
        }
      } else {
        const [updateRows] = await connection.execute(
          "UPDATE Pengguna SET Saldo=? WHERE Pengguna.ID=?",
          [prevSaldo - amount, userId]
        );
  
        // get user
        const [user] = await this.getUserById(updateRows.insertId);
  
        await connection.commit();
  
        return {
          status : 200,
          msg : "Saldo berhasil ditarik",
          user : user
        };
      }
    } catch (err) {
      await connection.rollback();
      throw createCustomError("Tarik dana gagal", 500)
    } finally{
      connection.release();
    }
  }
}


module.exports = UserController