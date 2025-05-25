import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		isActive:{
			type: Boolean,
		},
		phoneNumber:{
			type: String,
			default: "",
		},
		panNumber:{
			type: String,
			default: "",
		},
		address:{
			type: String,
			default: "",
		},
		gender: {
			type: String,
		},
		dateOfBirth:{
			type: String,
			default: "",
		},
		otp:{
			type: Number,
			default:0,
		},
		receivePushNotification: {
			type: Boolean,
			default: true,
		},
		receiveEmailNotification: {
			type: Boolean,
			default: true,
		},
		receiveUpdatesViaEmail: {
			type: Boolean,
			default: true,
		},
		receiveUpdatesOnWhatsApp: {
			type: Boolean,
			default: true,
		},
		referrer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
		referralsCount: { type: Number, default: 0 },
		image: {
			type: String,
			default: "",
		},
		// createdAt, updatedAt => Member since <createdAt>
		resetPasswordToken: { type: String, default: null},  // Add this field
		resetPasswordExpire: { type: Date,default: null },   // Add this field
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
