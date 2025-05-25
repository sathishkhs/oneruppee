import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: {type: String,required: true,},
  },
  { timestamps: true }
);

const Subscription = mongoose.model("SubscriptionPlan", SubscriptionSchema);
export default Subscription;
