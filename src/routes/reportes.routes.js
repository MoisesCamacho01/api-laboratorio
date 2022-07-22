import { Router } from "express";
import { methods as reportesController } from "../controllers/reportes.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/', funciones.verifyToken, reportesController.index);
router.get('/porlaboratorio/:id', funciones.verifyToken, reportesController.porLaboratorio);
// router.get('/:id', funciones.verifyToken, reportesController.getOne);
// router.put('/:id', funciones.verifyToken, reportesController.actualizar);
// router.delete('/:id', funciones.verifyToken, reportesController.eliminar);
// router.post('/registrar', funciones.verifyToken, reportesController.registrar);

export default router;