import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getDashboard,updateDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/profile:_id", getDashboard);
router.put("/updateProfile", updateDashboard);
export default router;

