import { Router } from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  deleteById,
  updateVehicle
} from '../../controllers/vehicle';

const router = Router();

router.get('/', getAllVehicles); // Listar todos os veículos
router.get('/:id', getVehicleById); // Obter veículo por ID
router.post('/', createVehicle); // Criar novo veículo
router.delete('/:id', deleteById); // Criar novo veículo
router.put('/:id', updateVehicle)

export default router;
