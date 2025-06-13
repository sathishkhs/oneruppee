import express from "express";
import {getReferralCode,getReferralCount } from "../controllers/getReferral.controller.js";

const router = express.Router();
router.get("/getReferralCode:_id", getReferralCode);
router.get("/getReferralCount:_id", getReferralCount);

export default router;
