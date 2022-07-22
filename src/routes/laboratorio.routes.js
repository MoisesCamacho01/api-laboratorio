import { Router } from "express";
import { methods as laboratorioController } from "../controllers/laboratorio.controller";
import { methods as funciones } from "../controllers/funciones.controller";


const router = Router();

router.get('/', funciones.verifyToken, laboratorioController.index);
router.get('/:id', funciones.verifyToken, laboratorioController.getOne);
router.put('/:id', funciones.verifyToken, laboratorioController.actualizar);
router.delete('/:id', funciones.verifyToken, laboratorioController.eliminar);
router.post('/registrar', funciones.verifyToken, laboratorioController.registrar);

export default router;