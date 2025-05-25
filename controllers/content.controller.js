import SubscriptionAmount from "../models/subscriptionAmount.model.js";
import DonationType from "../models/donationType.model.js";

export const getContent = async (req, res) => {
  try {
    const subscriptionAmounts = await SubscriptionAmount.find();
    const donationTypes = await DonationType.find();

    res.status(200).json({
      subscriptionAmount: subscriptionAmounts,
      donationType: donationTypes,
    });
  } catch (error) {
    console.error("Error fetching content:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSubscriptionAmount = async (req, res) => {
  try {
    const { amount,type,des } = req.body;
    const newAmount = new SubscriptionAmount({ amount,type,des });
    await newAmount.save();
    res.status(201).json({ message: "Subscription Amount created", newAmount });
  } catch (error) {
    console.error("Error creating subscription amount:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSubscriptionAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const updatedAmount = await SubscriptionAmount.findByIdAndUpdate(id, { amount }, { new: true });
    
    if (!updatedAmount) {
      return res.status(404).json({ error: "Subscription Amount not found" });
    }

    res.status(200).json({ message: "Subscription Amount updated", updatedAmount });
  } catch (error) {
    console.error("Error updating subscription amount:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSubscriptionAmount = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedAmount = await SubscriptionAmount.findByIdAndDelete(id);

    if (!deletedAmount) {
      return res.status(404).json({ error: "Subscription Amount not found" });
    }

    res.status(200).json({ message: "Subscription Amount deleted" });
  } catch (error) {
    console.error("Error deleting subscription amount:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDonationType = async (req, res) => {
  try {
    const { type } = req.body;
    const newDonation = new DonationType({ type });
    await newDonation.save();
    res.status(201).json({ message: "Donation Type created", newDonation });
  } catch (error) {
    console.error("Error creating donation type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateIsActiveById = async (req, res) => {
  try {
    const { isActive, id, type } = req.body; // Expecting isActive (boolean) and type (string)

    // Validate if isActive is provided and is a boolean
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be true or false" });
    }

    // Validate if type is provided and is a non-empty string
    if (type !== undefined && (typeof type !== "string" || !type.trim())) {
      return res.status(400).json({ message: "type must be a non-empty string" });
    }

    const donationType = await DonationType.findById(id);
    if (!donationType) {
      return res.status(404).json({ message: "Donation Type not found" });
    }

    // Update fields with the provided values
    donationType.isActive = isActive;
    if (type !== undefined) {
      donationType.type = type;
    }

    await donationType.save();

    res.status(200).json({ message: "Donation Type updated", donationType });
  } catch (error) {
    console.error("Error updating donation type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const updateDonationType = async (req, res) => {
  try {
    const { type,id } = req.body;

    const updatedDonation = await DonationType.findByIdAndUpdate(id, { type }, { new: true });

    if (!updatedDonation) {
      return res.status(404).json({ error: "Donation Type not found" });
    }

    res.status(200).json({ message: "Donation Type updated", updatedDonation });
  } catch (error) {
    console.error("Error updating donation type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDonationType = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedDonation = await DonationType.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({ error: "Donation Type not found" });
    }

    res.status(200).json({ message: "Donation Type deleted" });
  } catch (error) {
    console.error("Error deleting donation type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
