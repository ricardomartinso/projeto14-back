import { createUser} from '../controllers/authController.js';
import { Router } from 'express'

const router = Router()

//Sing-up
router.post("/cadastro", createUser);

export default router;