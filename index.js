import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './routes/authRouter.js'

dotenv.config();

//Servidor
const app = express();
app.use(json());
app.use(cors());
const PORT = process.env.PORT;

app.use(authRouter)

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`)
});
