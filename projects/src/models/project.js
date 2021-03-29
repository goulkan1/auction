const mongoose = require("mongoose");

const reqString = {
  type: "string",
  required: true,
};

mongoose.model("Project", {
  nama: reqString,
  value: reqString,
  required: reqString,
  dekripsi: reqString,
  status: reqString,
  expires: {
    type: Date,
    require: true,
  },
  startProject: {
    type: Date,
    require: true,
  },
  endProject: {
    type: Date,
    require: true,
  },
  nMilestone: reqString,
  kategori: reqString,
  idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});
