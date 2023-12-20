class TransactionModel {
  constructor(idTransaksi, tanggalTransaksi, jenisTransaksi, idSumber, idTujuan, tujuanTransaksi, jumlah) {
    this.idTransaksi = idTransaksi;
    this.tanggalTransaksi = tanggalTransaksi;
    this.jenisTransaksi = jenisTransaksi;
    this.idSumber = idSumber;
    this.idTujuan = idTujuan;
    this.tujuanTransaksi = tujuanTransaksi,
    this.jumlah = jumlah;
  }

  getTransactionInfo() {
    return {
      IDTransaksi : this.idTransaksi,
      TanggalTransaksi : this.tanggalTransaksi,
      JenisTransaksi : this.jenisTransaksi,
      IDSumber : this.idSumber,
      IDTujuan : this.idTujuan, 
      TujuanTransaksi : this.tujuanTransaksi,
      Jumlah : this.jumlah
    }
  }
}

module.exports = TransactionModel;