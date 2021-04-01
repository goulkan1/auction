const mongoose = require("mongoose");

const reqString = {
  type: "string",
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

mongoose.model("Project", {
  title: reqString,
  information: reqString,
  date: { type: Date, default: Date.now },
  category: reqString,
  method: reqString,
  fiscal: reqNumber,
  value: reqNumber,
  payment: reqString,
  location: reqString,
  qualification: reqString,
  term: { type: Array, required: true },
  status: { type: Boolean, required: true },
  idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});
