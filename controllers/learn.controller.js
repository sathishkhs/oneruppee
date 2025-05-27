import CrowdModel from "../models/crowdModel";

export const getLearnMore = async (req, res) => {
  try {
    const learnMoreData = await CrowdModel.find();
    res.status(200).json(learnMoreData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

export const getLearnMoreById = async (req, res) => {
  try {
    const learnMoreItem = await CrowdModel.findById(req.params.id);
    if (!learnMoreItem) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(learnMoreItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

export const createLearnMore = async (req, res) => {
  try {
    const { title, description, img, videoLink,order_by } = req.body;
    const newEntry = new CrowdModel({ title, description, img, videoLink, order_by });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Error creating entry", error });
  }
};

export const updateLearnMore = async (req, res) => {
  try {
    const updatedEntry = await CrowdModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Error updating entry", error });
  }
};

export const deleteLearnMore = async (req, res) => {
  try {
    const deletedEntry = await CrowdModel.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entry", error });
  }
};
