import dotenv from "dotenv";
import joi from "joi";
import bcrypt, { compareSync } from "bcrypt";
import { db } from "../database/mongoDB.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

dotenv.config();

//Sign-Up
export async function createUser(req, res) {
  const usuario = req.body;
  const usuarioSchema = joi.object({
    name: joi.string().required().min(4),
    email: joi.string().required().min(4),
    password: joi.string().required().min(4),
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
    const configuracoes = {
      expiresIn: 60 * 20,
    };

    const dados = {
      email: user.email,
    };

    const token = jwt.sign(dados, chaveSecreta, configuracoes);
    await db.collection("sessions").insertOne({ userId: user._id, token });

    delete user.password,
      delete user.passwordValid,
      delete user.email,
      delete user._id;

    return res.send({ token, user });
  }

  res.status(422).send("Email e/ou senha incorretos!");
}