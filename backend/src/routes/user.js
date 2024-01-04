import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthController";
import { searchUser } from "../controllers/UserController";
const router = Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/:id', searchUser)

export default router