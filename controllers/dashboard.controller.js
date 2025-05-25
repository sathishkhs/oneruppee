import Dashboard from "../models/dashboard.model.js";

export const getDashboard = async (req, res) => {
	try {
		const userId = req.params._id; 
		console.log('user ID:', userId);
		const dashboardData = await Dashboard.findOne({ userId: userId });

		if (!dashboardData) {
			return res.status(404).json({ error: "Dashboard data not found for this user." });
		} 
       const  {contribution,duration,referrals} =  dashboardData

		res.status(200).json({contribution,duration,referrals});
	} catch (error) {
		console.error("Error in getDashboard: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateDashboard = async (req, res) => {
    try {
      const { contribution, duration, referrals,id } = req.body;
      if (!contribution && !duration && !referrals) {
        return res.status(400).json({ error: "At least one field (contribution, duration, referrals) is required." });
      }
      const updateData = {};
      if (contribution !== undefined) updateData.contribution = contribution;
      if (duration !== undefined) updateData.duration = duration;
      if (referrals !== undefined) updateData.referrals = referrals;
      const updatedDashboard = await Dashboard.findOneAndUpdate(
        { userId: id },
         updateData, 
        { new: true, upsert: true } 
      );

      res.status(200).json(updatedDashboard);
    } catch (error) {
      console.error("Error in updateDashboard: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
