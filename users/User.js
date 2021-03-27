const mongoose = require("mongoose");

const reqString = {
  type: "string",
  required: true,
};

const addressSchema = mongoose.Schema({
  idn: reqString,
  provinsi: reqString,
  kota: reqString,
  kecamatan: reqString,
  kelurahan: reqString,
  alamat: reqString,
});

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
  status: reqString,
  password: reqString,
  logo: reqString,
  image: reqString,
});
