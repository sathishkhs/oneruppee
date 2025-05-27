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
  }, 
  order_by: {
    type: Number,
    default:0
  }
});

const SubscriptionAmount = mongoose.model("SubscriptionAmount", subscriptionAmountSchema);

export default SubscriptionAmount;


