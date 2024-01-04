import { Router } from "express";
import routerUser from "./user";
import routerChatroom from "./chatroom"
const router = Router();

router.use('/auth', routerUser)
router.use('/chatroom', routerChatroom)

export default router