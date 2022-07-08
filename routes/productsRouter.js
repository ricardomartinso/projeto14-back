import renderProducts from "../controllers/productsController.js";
import { Router } from "express";

const router = Router();

//Renderizar mensagens
router.get("/products", renderProducts);

export default router;
