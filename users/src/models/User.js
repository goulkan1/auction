const mongoose = require("mongoose");
var validate = require("mongoose-validator");

const reqString = {
  type: String,
  required: [true, "Tidak Boleh Kosong"],
};

const addressSchema = mongoose.Schema({
  idn: reqString,
  provinsi: reqString,
  kota: reqString,
  kecamatan: reqString,
  kelurahan: reqString,
  alamat: reqString,
});
//verify notverify banned
mongoose.model("User", {
  nama: reqString,
  address: {
    type: [addressSchema],
    require: true,
  },
  industri: reqString,
  website: reqString,
  about: reqString,
  email: reqString,
  roles: { type: Number, required: true },
  status: {
    type: String,
    required: [true, "Tidak Boleh Kosong"],
    valenum: ["verify", "notverify", "banned"],
  },
  password: reqString,
  logo: reqString,
  image: reqString,
});
