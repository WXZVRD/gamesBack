import express from "express";
import RoomController from "../controllers/roomController.js";
const router = express.Router()

router.post('/create', RoomController.create)
router.post('/join', RoomController.joinRoom)
router.post('/leave', RoomController.leaveRoom)

router.get('/getOne', RoomController.getById)
router.get('/getAll', RoomController.getAll)

export default router