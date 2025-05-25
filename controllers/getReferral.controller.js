import User from "../models/user.model.js";
export const getReferralCode = async (req, res) => {
	try {
		const user = await User.findById(req.params._id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json({ referralCode: user._id });
	} catch (error) {
		console.log("Error getting referral code", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getReferralCount = async (req, res) => {
	try {
		const user = await User.findById(req.params._id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json({ referralsCount: user.referralsCount });
	} catch (error) {
		console.log("Error getting referral count", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
