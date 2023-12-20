class UserModel {
  constructor(id, nama, pin, saldo) {
    this.id = id;
    this.nama = nama;
    this.pin = pin;
    this.saldo = saldo
  }

  getUserInfo() {
    return {
      ID : this.id,
      Nama : this.nama,
      Pin : this.pin,
      Saldo : this.saldo
    }
  }
}

module.exports = UserModel;