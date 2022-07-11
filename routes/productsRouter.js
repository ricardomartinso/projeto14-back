import renderProducts from "../controllers/productsController.js";
import renderSale from "../controllers/saleController.js";
import { Router } from "express";

const router = Router();

//Renderizar produtos
router.get("/products", renderProducts);

//Renderiza promoções
router.get("/sale", renderSale);

export default router;
