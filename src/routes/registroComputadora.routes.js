import { Router } from "express";
import { methods as laboratorioController } from "../controllers/registroComputadora.controller";
import { methods as funciones } from "../controllers/funciones.controller";
const router = Router();

router.post('/computadorasDisponibles',funciones.verifyToken, laboratorioController.computadorasDisponibles);

router.post('/registrar', laboratorioController.registro)

export default router;