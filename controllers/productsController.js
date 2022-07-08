import { db, objectId } from "../database/mongoDB.js";

async function renderProducts(req, res, next) {
  try {
    const products = await db.collection("products").find().toArray();
    return res.send(products);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export default renderProducts;
