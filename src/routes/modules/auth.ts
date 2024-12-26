import Router from 'express'
import { signin } from "../../controllers/auth"
import { body } from 'express-validator'
const router = Router()

router.post("/signin", 
    body('user').isString(),
    body('password').isString(), 
    signin)

export default router