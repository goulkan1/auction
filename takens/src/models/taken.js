const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = {
  type: "string",
  required: true,
};
const reqStringOnly = { type: String };

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

const schema = new Schema({
  idProject: {
    type: Schema.Types.ObjectId,
  },
  idUser: {
    type: Schema.Types.ObjectId,
  },
  userBid: { type: Schema.Types.ObjectId, ref: "User" },
  specific: reqString,
  prices: {
    type: Number,
    required: true,
  },
});
const Taken = (module.exports = mongoose.model("Taken", schema));
const User = (module.exports = mongoose.model("User", schema2));
