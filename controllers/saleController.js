import { db, objectId } from "../database/mongoDB.js";

async function renderSale(req, res, next) {
  try {
    const products = await db.collection("sale").find().toArray();
    return res.send(products);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export default renderSale;