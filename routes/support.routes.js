import express from "express";
import {createSupportQuery, getAllSupportQueries } from "../controllers/supportController";

const router = express.Router();
router.post("/createSupportQuery", createSupportQuery); // For user to submit a query
router.get("/getAllSupportQueries", getAllSupportQueries);
export default router;