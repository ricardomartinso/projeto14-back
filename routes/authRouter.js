import { createUser, login } from "../controllers/authController.js";
import { Router } from "express";
import { loginSchemaValidation } from "../middlewares/loginSchemaValidationMiddleware.js";

const router = Router();

//Sign-Up
router.post("/cadastro", createUser);

//Sign-In
router.post("/login", loginSchemaValidation, login);

export default router;
