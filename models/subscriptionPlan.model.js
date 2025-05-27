import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: {type: String,required: true,},
    order_by : {type: Number, default : 0}
  },
  { timestamps: true }
);

const Subscription = mongoose.model("SubscriptionPlan", SubscriptionSchema);
export default Subscription;
