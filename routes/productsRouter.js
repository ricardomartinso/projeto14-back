import RenderProducts from "../controllers/productsController.js";
import { Router } from "express";


const router = Router();

//Renderizar mensagens
router.get("/products", RenderProducts);

export default router;