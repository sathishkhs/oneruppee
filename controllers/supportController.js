import SupportQuery from "../models/supportQuery.js";

// Submit a support query
export const createSupportQuery = async (req, res) => {
  try {
    const { userName, email, subject, message } = req.body;

    if (!userName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuery = new SupportQuery({ userName, email, subject, message });
    await newQuery.save();

    res.status(201).json({ message: "Support query submitted successfully", query: newQuery });
  } catch (error) {
    console.error("Error submitting support query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// (Optional) Get all support queries – admin use
export const getAllSupportQueries = async (req, res) => {
  try {
    const queries = await SupportQuery.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching support queries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
