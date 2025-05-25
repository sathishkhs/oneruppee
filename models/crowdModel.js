const mongoose = require("mongoose");

const CrowdModelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: false },
  videoLink: { type: String, required: false }
});

export default  mongoose.model("CrowdModel", CrowdModelSchema);
