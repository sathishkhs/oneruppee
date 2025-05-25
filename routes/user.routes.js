import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,updateUser,deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsersForSidebar);
router.put("/updateUser", updateUser);
router.put("/deleteUser", deleteUser);
export default router;
