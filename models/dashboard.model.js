import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true,
	},
	contribution: {
		type: Number,
		required: true,
		default: 0,
	},
	duration: {
		type: Number,
		required: true, 
		default: 0,
	},
	referrals: {
		type: Number,
		required: true,
		default: 0,
	},
});

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

export default Dashboard;
