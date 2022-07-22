import { Router } from "express";
import { methods as reportesController } from "../controllers/reportes.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/', funciones.verifyToken, reportesController.index);
router.get('/porLaboratorio/:id', funciones.verifyToken, reportesController.porLaboratorio);
router.get('/porHorario/:id', funciones.verifyToken, reportesController.porHorario);
router.get('/porDocente/:id', funciones.verifyToken, reportesController.porDocente);
router.get('/porMateria/:id', funciones.verifyToken, reportesController.porMateria);
router.get('/obtenerHoras/:id', funciones.verifyToken, reportesController.obtenerHoras);
// router.get('/:id', funciones.verifyToken, reportesController.getOne);
// router.put('/:id', funciones.verifyToken, reportesController.actualizar);
// router.delete('/:id', funciones.verifyToken, reportesController.eliminar);
// router.post('/registrar', funciones.verifyToken, reportesController.registrar);

export default router;