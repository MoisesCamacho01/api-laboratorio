import { Router } from "express";
import { methods as carreraController } from "../controllers/carreras.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/', funciones.verifyToken, carreraController.index);
router.get('/:id', funciones.verifyToken, carreraController.getCarrera);
router.put('/:id', funciones.verifyToken, carreraController.actualizar);
router.delete('/:id', funciones.verifyToken, carreraController.eliminar);
router.post('/registrar', funciones.verifyToken, carreraController.registrar);

export default router;