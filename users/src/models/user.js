const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: [true, "Tidak Boleh Kosong"],
};

const reqStringOnly = { type: String };
const reqNumber = { type: Number };
const Schema = mongoose.Schema;

const schema = new Schema({
  nama: reqString,
  password: reqString,
  email: reqString,
  dob: { type: Date },
  address: reqStringOnly,
  gender: reqStringOnly,
  website: reqStringOnly,
  about: reqStringOnly,
  phone: { type: Number },
  roles: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ["verify", "notverify", "banned"],
    default: "notverify",
  },
  image: reqStringOnly,
  uniqueString: reqStringOnly,
});
const User = (module.exports = mongoose.model("User", schema));
