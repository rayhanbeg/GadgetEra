import express from "express"
import { addCart, getUserCart, updateCart } from "../controllers/cartController.js"
import { authenticateUser } from "../middleware/authMiddleware.js"

const cartRouter = express.Router()


cartRouter.post('/add', addCart)
cartRouter.put('/update', updateCart)

cartRouter.get('/getUserCart/:userId', getUserCart)

export default cartRouter