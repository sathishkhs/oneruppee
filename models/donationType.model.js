import mongoose from "mongoose";

const donationTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean
  }
});

const DonationType = mongoose.model("DonationType", donationTypeSchema);

export default DonationType;
