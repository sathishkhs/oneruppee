import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const PrivacyPolicy = mongoose.model("PrivacyPolicy", privacyPolicySchema);
