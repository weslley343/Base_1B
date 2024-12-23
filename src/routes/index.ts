import { Router } from "express";
import carRouters from "./modules/vehicle";
import uploadRouters from "./modules/upload";

const router = Router()

router.use('/vehicle', carRouters)
router.use('/upload', uploadRouters)
export default router