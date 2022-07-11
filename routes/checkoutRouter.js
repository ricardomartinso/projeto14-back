import { Router } from "express";
import checkout from "../controllers/checkoutController.js";

const router = Router();

//Finaliza a compra
router.post("/checkout", checkout);

export default router;
