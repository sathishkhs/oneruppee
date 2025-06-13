// const mongoose = require("mongoose");
import mongoose from "mongoose"
const CrowdModelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: false },
  videoLink: { type: String, required: false },
  order_by : {type:Number, default : 0}
});

export default  mongoose.model("CrowdModel", CrowdModelSchema);
