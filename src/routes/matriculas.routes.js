import { Router } from "express";
import { methods as matriculasController } from "../controllers/matriculas.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/', funciones.verifyToken, matriculasController.index);
router.get('/:id', funciones.verifyToken, matriculasController.getOne);
router.put('/:id', funciones.verifyToken, matriculasController.actualizar);
router.delete('/:id', funciones.verifyToken, matriculasController.eliminar);
router.post('/registrar', funciones.verifyToken, matriculasController.registrar);

export default router;