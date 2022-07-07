import dotenv from "dotenv";
import joi from "joi";
import bcrypt, { compareSync } from "bcrypt";
import { db } from "../database/mongoDB.js";
import jwt from "jsonwebtoken";

dotenv.config();

//Sign-Up
export async function createUser(req, res) {
  const usuario = req.body;
  const usuarioSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    passwordValid: joi.ref("password"),
  });

  const usedEmail = await db
    .collection("cadastros")
    .findOne({ email: usuario.email });

  if (usedEmail) {
    return res.status(409).send("Email já cadastrado");
  }

  const { error } = usuarioSchema.validate(usuario);
  if (error) {
    return res.sendStatus(422);
  }

  const passwordHash = bcrypt.hashSync(usuario.password, 10);

  await db.collection("cadastros").insertOne({
    ...usuario,
    password: passwordHash,
    passwordValid: passwordHash,
  });

  res.status(201).send("Usuário criado");
}

//Sign-In
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await db.collection("cadastros").findOne({ email });

  if (user && compareSync(password, user.password)) {
    const chaveSecreta = process.env.JWT_SECRET;

    const configuracoes = { expiresIn: 60 };

    const token = jwt.sign(user._id, chaveSecreta, configuracoes);

    await db.collection("sessions").insertOne({ token });

    return res.send(token);
  }

  res.status(422).send("Email e/ou senha incorretos!");
}
