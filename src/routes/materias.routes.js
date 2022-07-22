import { Router } from "express";
import { methods as materiasController } from "../controllers/materias.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/', funciones.verifyToken, materiasController.index);
router.get('/noAsignadas', funciones.verifyToken, materiasController.noAsignadas);
router.get('/:id', funciones.verifyToken, materiasController.getOne);
router.put('/:id', funciones.verifyToken, materiasController.actualizar);
router.delete('/:id', funciones.verifyToken, materiasController.eliminar);
router.post('/registrar', funciones.verifyToken, materiasController.registrar);

export default router;