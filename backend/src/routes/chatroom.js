import { Router } from "express";
import { createBoxChat, roomList } from "../controllers/ChatRoomController";

const router = Router();

router.post('/create', createBoxChat)
router.get('/roomlist/:id', roomList)

export default router