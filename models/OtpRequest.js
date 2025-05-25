import mongoose from 'mongoose';

const otpRequestSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: {type: Number,
    default:0, },
  expiresAt: { type: Date, default: () => Date.now() + 5 * 60 * 1000 }, // 5 min
  isVerified: { type: Boolean, default: false }
});
const OtpRequestSchema =mongoose.model('OtpRequest', otpRequestSchema);
export default OtpRequestSchema
