import FAQ from "../models/faq.model";

// Create FAQ
export const createFAQ = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newFAQ = new FAQ({ title, description });
    await newFAQ.save();

    res.status(201).json({ message: "FAQ created successfully", faq: newFAQ });
  } catch (error) {
    console.error("Error creating FAQ:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all FAQs
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({ faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update FAQ by ID
export const updateFAQById = async (req, res) => {
  try {
    const {id, title, description } = req.body;

    if (!title && !description) {
      return res.status(400).json({ message: "At least one field (title or description) must be provided" });
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ updated successfully", faq: updatedFAQ });
  } catch (error) {
    console.error("Error updating FAQ:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete FAQ by ID
export const deleteFAQById = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
