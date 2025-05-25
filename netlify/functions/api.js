import express, { Router } from "express";
import serverless from "serverless-http";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "../../routes/auth.routes.js";
import userRoutes from "../../routes/user.routes.js";
import dashboardRoutes from "../../routes/dashboard.js";
import paymentRoutes from "../../routes/payment.routes.js";
import contentRoutes from "../../routes/content.routes.js";
import learnRoutes from "../../routes/learn.routes.js";
import faqRoutes from "../../routes/faq.routes.js";
import privacyPolicy from "../../routes/privacyPolicy.routes.js"
import termAndCondtions from"../../routes/termAndcondtions.routes.js"
import getReferral from "../../routes/getReferral.routes.js"
import support from "../../routes/support.routes.js"

import cors from "cors"; ;
import connectToMongoDB from "../../db/connectToMongoDB.js";
const app = express();
dotenv.config();
const __dirname = path.resolve();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/learn", learnRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/privacyPolicy", privacyPolicy);
app.use("/api/termAndCondtions", termAndCondtions);
app.use("/api/getReferral", getReferral);
app.use("/api/support", support);


const router = Router();
router.get("/test", (req, res) => res.send("Hello World!"));

app.use("/api/", router);
connectToMongoDB()
export const handler = serverless(app);



