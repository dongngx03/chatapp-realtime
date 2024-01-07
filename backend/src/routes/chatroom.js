import { Router } from "express";
import { createBoxChat, getMessages, joinBoxChat, roomList, sendMessage } from "../controllers/ChatRoomController";

const router = Router();

router.post('/create', createBoxChat)
router.get('/roomlist/:id', roomList)
router.post('/join', joinBoxChat)
router.post('/getmessage', getMessages)
router.post('/sendmessage', sendMessage)


export default router