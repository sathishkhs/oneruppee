import Subscription from "../models/subscriptionPlan.model";

// Create a subscription plan
export const createSubscriptionPlan = async (req, res) => {
  try {
    const { name, amount, duration } = req.body;

    if (!name || !amount || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSubscription = new Subscription({ name, amount, duration });
    await newSubscription.save();

    res.status(201).json({ message: "Subscription created", subscription: newSubscription });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all subscriptions
export const getAllSubscriptionsPlan = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update subscription by ID
export const updateSubscriptionByIdPlan = async (req, res) => {
  try {
    const { id } = req.body;
    const { name, amount, duration } = req.body;

    const updated = await Subscription.findByIdAndUpdate(
      id,
      { name, amount, duration },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ message: "Subscription updated", subscription: updated });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete subscription by ID
export const deleteSubscriptionByIdPlan = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await Subscription.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
