import express from "express";
import { registerClient } from "../client/client.controller.js";
import { registerClientValidator } from "../middlewares/clientValidator.js";

const router = express.Router();

router.post("/register", registerClientValidator, registerClient);

export default router;