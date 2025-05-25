import Terms from "../models/TermsandConditions.model.js"

// Create Terms
export const createTerms = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTerms = await Terms.create({ title, description });
    res.status(201).json({ message: "Terms and Conditions created", data: newTerms });
  } catch (error) {
    console.error("Error creating terms:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Terms
export const getTerms = async (req, res) => {
  try {
    const terms = await Terms.find();
    res.status(200).json({ data: terms });
  } catch (error) {
    console.error("Error fetching terms:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Terms by ID
export const updateTerms = async (req, res) => {
  try {
    const {id, title, description } = req.body;

    const updatedTerms = await Terms.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTerms) {
      return res.status(404).json({ message: "Terms not found" });
    }

    res.status(200).json({ message: "Terms updated", data: updatedTerms });
  } catch (error) {
    console.error("Error updating terms:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Terms by ID
export const deleteTerms = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTerms = await Terms.findByIdAndDelete(id);

    if (!deletedTerms) {
      return res.status(404).json({ message: "Terms not found" });
    }

    res.status(200).json({ message: "Terms deleted" });
  } catch (error) {
    console.error("Error deleting terms:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
