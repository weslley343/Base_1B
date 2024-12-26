import { Router } from "express";
import carRouters from "./modules/vehicle";
import uploadRouters from "./modules/upload";
import authRouter from "./modules/auth"

const router = Router()

router.use('/vehicle', carRouters)
router.use('/upload', uploadRouters)
router.use('/auth', authRouter)
export default router