import { Router } from "express";
import { methods as laboratorioController } from "../controllers/laboratorio.controller";
import { methods as funciones } from "../controllers/funciones.controller";
const router = Router();

router.post('/computadorasDisponibles',funciones.verifyToken, laboratorioController.computadorasDisponibles);

export default router;