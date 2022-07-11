import { db, objectId } from "../database/mongoDB.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function checkout(req, res, next) {
  try {
    const { authorization } = req.headers;
    const tokenAuth = authorization?.replace("Bearer", "").trim();
    const pagamento = req.body;
    const dados = jwt.verify(tokenAuth, process.env.JWT_SECRET);

    //verificar validade do token
    if (dados) {
      await db
        .collection("buyedProducts")
        .insertOne({ ...pagamento, userId: dados.userId });
    } else {
      return res
        .status(404)
        .send("Sessão encerrada, por favor faça o login novamente!");
    }

    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export default checkout;
