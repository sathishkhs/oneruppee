// const mongoose = require('mongoose');
import mongoose from "mongoose";
const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, required: true },
  panNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);


const OneTimeDonationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    allocation: { type: String, required: true },
    panNumber: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String },
    razorpay_subscription_id:{ type: String },
    createdAt: { type: Date, default: Date.now }
  });

  const PaymentHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String},
    razorpay_subscription_id:{ type: String},
    type: { type: String, enum: ['subscription', 'one-time-donation'], required: true },
    details: { type: mongoose.Schema.Types.Mixed, required: true },
    amount: { type: Number, required: true },
    isCancel:{ type: Boolean},
    createdAt: { type: Date, default: Date.now }
  });
  
  const PaymentHistory = mongoose.model('PaymentHistory', PaymentHistorySchema);
  
  
const OneTimeDonation = mongoose.model('OneTimeDonation', OneTimeDonationSchema);

  
export {Subscription,OneTimeDonation,PaymentHistory}