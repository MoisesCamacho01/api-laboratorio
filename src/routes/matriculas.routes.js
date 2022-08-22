import { Router } from "express";
import { methods as matriculasController } from "../controllers/matriculas.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/:id', funciones.verifyToken, matriculasController.index);
router.get('/:id/:idSemestre', funciones.verifyToken, matriculasController.getAsignadas);
router.put('/:id/:idSemestre/:idMatricula', funciones.verifyToken, matriculasController.actualizar);
router.delete('/:id', funciones.verifyToken, matriculasController.eliminar);
router.post('/registrar', funciones.verifyToken, matriculasController.registrar);

export default router;