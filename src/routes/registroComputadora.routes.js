import { Router } from "express";
import { methods as laboratorioController } from "../controllers/registroComputadora.controller";
import { methods as funciones } from "../controllers/funciones.controller";
const router = Router();

router.post('/computadorasDisponibles',funciones.verifyToken, laboratorioController.computadorasDisponibles);

router.post('/registrar', funciones.verifyToken, laboratorioController.registro)
router.get('/hay', funciones.verifyToken, laboratorioController.hay)
router.get('/historial', funciones.verifyToken, laboratorioController.historial)

export default router;