import { Router } from "express";
import { methods as semestreController } from "../controllers/semestres.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/', funciones.verifyToken, semestreController.index);
router.get('/:id', funciones.verifyToken, semestreController.getOne);
router.put('/:id', funciones.verifyToken, semestreController.actualizar);
router.delete('/:id', funciones.verifyToken, semestreController.eliminar);
router.post('/registrar', funciones.verifyToken, semestreController.registrar);

export default router;