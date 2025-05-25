import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
}, { timestamps: true });

const FAQ = mongoose.model("FAQ", faqSchema);
export default FAQ;
