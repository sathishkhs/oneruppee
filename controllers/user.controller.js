import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		// Fetch all users excluding the password field
		const users = await User.find().select("-password -resetPasswordToken -resetPasswordExpire -updatedAt -__v");

		res.status(200).json(users);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const allowedFields = ["name", "email", "role", "updatedAt", "isActive","phoneNumber","panNumber","address",
			"receivePushNotification","receiveEmailNotification","receiveUpdatesViaEmail","receiveUpdatesOnWhatsApp"
		];
		const updateData = {};

		// Filter only allowed fields from req.body
		Object.keys(req.body).forEach((key) => {
			if (allowedFields.includes(key)) {
				updateData[key] = req.body[key];
			}
		});

		// If no valid fields to update, return an error
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ error: "No valid fields to update" });
		}

		const updatedUser = await User.findByIdAndUpdate(req.body.userId, updateData, { new: true }).select("-password -resetPasswordToken");

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error("Error in updateUser: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const deleteUser = async (req, res) => {
	try {
		const { userId } = req.body;

		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error("Error in deleteUser: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
