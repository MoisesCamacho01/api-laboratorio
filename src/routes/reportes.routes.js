import { Router } from "express";
import { methods as reportesController } from "../controllers/reportes.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/', funciones.verifyToken, reportesController.index);
router.post('/obtenerHoras', funciones.verifyToken, reportesController.obtenerHoras);
router.post('/filtros', funciones.verifyToken, reportesController.filtros);

export default router;