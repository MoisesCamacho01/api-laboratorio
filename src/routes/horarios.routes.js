import { Router } from "express";
import { methods as horariosController } from "../controllers/horarios,controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/', funciones.verifyToken, horariosController.index);
router.get('/:id', funciones.verifyToken, horariosController.getOne);
router.put('/:id', funciones.verifyToken, horariosController.actualizar);
router.delete('/:id', funciones.verifyToken, horariosController.eliminar);
router.post('/registrar', funciones.verifyToken, horariosController.registrar);

export default router;