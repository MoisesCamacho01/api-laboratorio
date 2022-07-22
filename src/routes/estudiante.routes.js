import { Router } from "express";
import { methods as estudianteController } from "../controllers/estudiante.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.post('/', estudianteController.encontrarEstudiante);

//administración
router.get('/', funciones.verifyToken, estudianteController.index);
router.get('/:id', funciones.verifyToken, estudianteController.getOne);
router.put('/:id', funciones.verifyToken, estudianteController.actualizar);
router.delete('/:id', funciones.verifyToken, estudianteController.eliminar);
router.post('/registrar', funciones.verifyToken, estudianteController.registrar);

export default router;