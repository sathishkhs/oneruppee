import express from "express";
import { login, logout, signup,forgotPassword,resetPassword,sendVerificationOTP,verifyOTP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword", resetPassword);

router.post("/sendVerificationOTP", sendVerificationOTP);

router.post("/verifyOTP", verifyOTP);


export default router;
