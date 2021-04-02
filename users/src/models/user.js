const mongoose = require("mongoose");
var validate = require("mongoose-validator");

const reqString = {
  type: String,
  required: [true, "Tidak Boleh Kosong"],
};

const reqStringOnly = { type: String };
const addressSchema = mongoose.Schema({
  idn: reqStringOnly,
  provinsi: reqStringOnly,
  kota: reqStringOnly,
  kecamatan: reqStringOnly,
  kelurahan: reqStringOnly,
  alamat: reqStringOnly,
});
//verify notverify banned
mongoose.model("User", {
  nama: reqString,
  password: reqString,
  email: reqString,
  address: {
    type: [addressSchema],
    type: String,
  },
  industri: reqStringOnly,
  website: reqStringOnly,
  about: reqStringOnly,
  roles: { type: Number, required: true, default: 1 },
  status: {
    type: String,
    // required: [true, "Tidak Boleh Kosong"],
    enum: ["verify", "notverify", "banned"],
  },
  logo: reqStringOnly,
  image: reqStringOnly,
});
