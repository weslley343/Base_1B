import { Router } from "express";
import carRouters from "./modules/vehicle";
// import uploadRouter from "./modules/upload"


const router = Router()

router.use('/vehicle', carRouters)
// router.use('/upload', uploadRouter)

export default router