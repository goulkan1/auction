const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqStringOnly = { type: String };

const reqString = {
  type: "string",
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const schema = new Schema({
  title: reqString,
  information: reqString,
  datePublished: { type: Date, default: Date.now },
  deadLine: { type: Date },
  category: reqString,
  value: reqNumber,
  payment: reqString,
  location: reqString,
  qualification: reqString,
  term: { type: Array, required: true },
  status: { type: String, required: true, default: "Published" },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const schema2 = new Schema({
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
  },
  image: reqStringOnly,
});

const Project = (module.exports = mongoose.model("Project", schema));
const User = (module.exports = mongoose.model("User", schema2));
