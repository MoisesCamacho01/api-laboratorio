import { Router } from "express";
import { methods as docentesController } from "../controllers/docentes.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/', funciones.verifyToken, docentesController.index);
router.get('/:id', funciones.verifyToken, docentesController.getOne);
router.put('/:id', funciones.verifyToken, docentesController.actualizar);
router.delete('/:id', funciones.verifyToken, docentesController.eliminar);
router.post('/registrar', funciones.verifyToken, docentesController.registrar);

export default router;