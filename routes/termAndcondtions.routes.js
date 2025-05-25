import express from "express";
import {
  createTerms,
  getTerms,
  updateTerms,
  deleteTerms,
} from "../controllers/termAndcondtions.controller";

const router = express.Router();

router.post("/createTerms", createTerms);
router.get("/getTerms", getTerms);
router.post("/updateTerms", updateTerms);
router.post("/deleteTerms", deleteTerms);

export default router;
