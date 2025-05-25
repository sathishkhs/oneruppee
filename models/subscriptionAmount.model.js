import mongoose from "mongoose";

const subscriptionAmountSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type:{
    type:String,
    required: true,
  },
  des:{
    type:String,
    required: true,
  }
});

const SubscriptionAmount = mongoose.model("SubscriptionAmount", subscriptionAmountSchema);

export default SubscriptionAmount;


