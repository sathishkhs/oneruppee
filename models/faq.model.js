import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  order_by : {type: Number, default: 0}
}, { timestamps: true });

const FAQ = mongoose.model("FAQ", faqSchema);
export default FAQ;
