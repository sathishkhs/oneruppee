import express from "express";
import { createPrivacyPolicy, getAllPrivacyPolicies, getPrivacyPolicyById, updatePrivacyPolicy, deletePrivacyPolicy } from "../controllers/privacyPolicy.controller.js";

const router = express.Router();

router.post("/createPrivacyPolicy", createPrivacyPolicy);
router.get("/getAllPrivacyPolicies", getAllPrivacyPolicies);
router.get("/getPrivacyPolicyById:id", getPrivacyPolicyById);
router.post("/updatePrivacyPolicy", updatePrivacyPolicy);
router.post("/deletePrivacyPolicy", deletePrivacyPolicy);

export default router;
