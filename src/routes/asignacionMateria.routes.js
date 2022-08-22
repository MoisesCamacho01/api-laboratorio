import { Router } from "express";
import { methods as asignacionMateriaController } from "../controllers/asignacionMateria.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/a/:id', funciones.verifyToken, asignacionMateriaController.index);
router.delete('/:id', funciones.verifyToken, asignacionMateriaController.eliminar);
router.post('/registrar', funciones.verifyToken, asignacionMateriaController.registrar);
router.post('/E/registrar', funciones.verifyToken, asignacionMateriaController.registrarE);

export default router;