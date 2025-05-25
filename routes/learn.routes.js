import express from "express";
const router = express.Router();
import {getLearnMore,getLearnMoreById,createLearnMore,updateLearnMore,deleteLearnMore} from "../controllers/learn.controller"

router.get("/learn-more", getLearnMore);
router.get("/learn-more/:id", getLearnMoreById);
router.post("/learn-more", createLearnMore);
router.put("/learn-more/:id", updateLearnMore);
router.delete("/learn-more/:id", deleteLearnMore);

export default  router;
