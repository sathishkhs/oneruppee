import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getContent,createSubscriptionAmount,createDonationType,deleteDonationType,updateIsActiveById,deleteSubscriptionAmount } from "../controllers/content.controller.js";

const router = express.Router();

router.get("/getContent", getContent);
router.post("/createSubscriptionAmount", createSubscriptionAmount);
router.post("/createDonationType", createDonationType);
router.post("/deleteDonationType", deleteDonationType);
router.post("/updateDonationTIsActiveById", updateIsActiveById);
router.post("/deleteSubscriptionAmount", deleteSubscriptionAmount);




export default router;