class TransactionModel {
  constructor(idTransaksi, tanggalTransaksi, idSumber, idTujuan, tujuanTransaksi, jumlah) {
    this.idTransaksi = idTransaksi;
    this.tanggalTransaksi = tanggalTransaksi;
    this.idSumber = idSumber;
    this.idTujuan = idTujuan;
    this.tujuanTransaksi = tujuanTransaksi,
    this.jumlah = jumlah;
  }

  getTransactionInfo() {
    return {
      IDTransaksi : this.idTransaksi,
      TanggalTransaksi : this.tanggalTransaksi,
      IDSumber : this.idSumber,
      IDTujuan : this.idTujuan, 
      TujuanTransaksi : this.tujuanTransaksi,
      Jumlah : this.jumlah
    }
  }
}

module.exports = TransactionModel;