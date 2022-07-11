import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";

dotenv.config();

//Servidor
const app = express();
app.use(json());
app.use(cors());
const PORT = process.env.PORT;

app.use(authRouter);
app.use(productsRouter);
app.use(checkoutRouter);

app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});
