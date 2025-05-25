import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createSubscription,createOneTimeDonation,getPaymentHistory,getPaymentsByAllocation,createOrder,updateSubscriptionName,createSubscriptionOrder,createPlan,cancelSubscription } from "../controllers/payment.controller.js";
import {createSubscriptionPlan,getAllSubscriptionsPlan,updateSubscriptionByIdPlan,deleteSubscriptionByIdPlan} from "../controllers/subscription.controller.js"

const router = express.Router();

router.post("/createSubscription", createSubscription);
router.post("/updateSubscriptionName", updateSubscriptionName);
router.post("/createOneTimeDonation", createOneTimeDonation);
router.get("/getPaymentHistory:userId", getPaymentHistory);
router.get("/getPaymentsByAllocation:userId", getPaymentsByAllocation);
router.post("/createOrder", createOrder);
router.post("/createSubscriptionOrder", createSubscriptionOrder);
router.post("/createSubscriptionPlan", createSubscriptionPlan);
router.get("/getAllSubscriptionsPlan", getAllSubscriptionsPlan);
router.post("/updateSubscriptionByIdPlan", updateSubscriptionByIdPlan);
router.post("/deleteSubscriptionByIdPlan", deleteSubscriptionByIdPlan);
router.post("/createPlan", createPlan);
router.post("/cancelSubscription", cancelSubscription);
updateSubscriptionName



export default router;