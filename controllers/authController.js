import dotenv from "dotenv";
import joi from "joi";
import bcrypt from 'bcrypt';
import {db} from '../database/mongoDB.js';

dotenv.config();

//Sing-up
export async function createUser (req, res){

    const usuario = req.body;
    const usuarioSchema = joi.object(
        {
            name: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().required(),
            passwordValid: joi.ref('password')
        }
    )

    const usedEmail = await db.collection('cadastros').findOne({email: usuario.email});

    if(usedEmail){
        return res.status(409).send("Email já cadastrado");
    }

    const {error} = usuarioSchema.validate(usuario);
    if (error){
        return res.sendStatus(422);
    }

    const passwordHash = bcrypt.hashSync(usuario.password, 10);

    await db.collection('cadastros').insertOne({ ...usuario, password: passwordHash, passwordValid: passwordHash });

    res.status(201).send('Usuário criado');
};