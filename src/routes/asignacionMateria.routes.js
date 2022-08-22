import { Router } from "express";
import { methods as asignacionMateriaController } from "../controllers/asignacionMateria.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/a/:id', funciones.verifyToken, asignacionMateriaController.index);
router.get('/:id', funciones.verifyToken, asignacionMateriaController.getOne);
router.delete('/:id', funciones.verifyToken, asignacionMateriaController.eliminar);
router.post('/registrar', funciones.verifyToken, asignacionMateriaController.registrar);

export default router;