import { createUser, login, singOut } from "../controllers/authController.js";
import { Router } from "express";
import { loginSchemaValidation } from "../middlewares/loginSchemaValidationMiddleware.js";


const router = Router();

//Sign-Up
router.post("/cadastro", createUser);

//Sign-In
router.post("/login", loginSchemaValidation, login);

//Sing-out
router.get("/logout", singOut);

export default router;
