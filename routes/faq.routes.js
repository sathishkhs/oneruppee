import express from "express";
import {createFAQ,getAllFAQs,updateFAQById,deleteFAQById } from "../controllers/faq.controller";

const router = express.Router();
router.get("/getAllFAQs", getAllFAQs);
router.post("/createFAQ", createFAQ);
router.post("/updateFAQById", updateFAQById);
router.post("/deleteFAQById", deleteFAQById);
export default router;