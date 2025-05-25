import mongoose from "mongoose";

const SupportQuerySchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const SupportQuery = mongoose.model("SupportQuery", SupportQuerySchema);
export default SupportQuery;
