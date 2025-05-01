import express from "express";
import { registerProvider } from "../provider/provider.controller.js";
import { registerProviderValidator } from "../middlewares/providerValidator.js";

const router = express.Router();

router.post("/register", registerProviderValidator, registerProvider);

export default router;

