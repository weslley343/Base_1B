import { Router } from 'express';
import { body, param, query } from 'express-validator';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  deleteById,
  updateVehicle
} from '../../controllers/vehicle';

const router = Router();

router.get('/', getAllVehicles);
router.get('/:id', param('id').isUUID(), getVehicleById);
router.post('/', createVehicle);
router.delete('/:id', deleteById);
router.put('/:id', updateVehicle)



export default router;
