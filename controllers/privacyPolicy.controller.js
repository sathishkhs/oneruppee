import { PrivacyPolicy } from "../models/privacyPolicy.model.js";

// Create Privacy Policy
export const createPrivacyPolicy = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newPolicy = await PrivacyPolicy.create({ title, description });
    res.status(201).json({ message: "Privacy Policy created successfully", policy: newPolicy });
  } catch (error) {
    console.error("Error creating Privacy Policy:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Privacy Policies
export const getAllPrivacyPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Error fetching Privacy Policies:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Single Privacy Policy
export const getPrivacyPolicyById = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }
    res.status(200).json(policy);
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Privacy Policy
export const updatePrivacyPolicy = async (req, res) => {
  try {
    const { title, description,id } = req.body;

    if (!title && !description) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
     id,
      { title, description },
      { new: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }

    res.status(200).json({ message: "Privacy Policy updated successfully", policy: updatedPolicy });
  } catch (error) {
    console.error("Error updating Privacy Policy:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Privacy Policy
export const deletePrivacyPolicy = async (req, res) => {
  try {
    const deletedPolicy = await PrivacyPolicy.findByIdAndDelete(req.body.id);

    if (!deletedPolicy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }

    res.status(200).json({ message: "Privacy Policy deleted successfully" });
  } catch (error) {
    console.error("Error deleting Privacy Policy:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
