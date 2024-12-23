import { Router, Request, Response } from 'express';
import multer from "multer";
import { supabase } from '../../config/supabase';
import { deleteImage, uploadimage } from '../../controllers/image';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Deve fazer upload de uma foto e associá-la ao veículo especificado
router.post("/upload", upload.single("file"), uploadimage);
router.delete("/remove", deleteImage);

export default router;
