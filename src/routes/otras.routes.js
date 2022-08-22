import { Router } from "express";
import { methods as otrosController } from "../controllers/otros.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/materiaDocente', funciones.verifyToken, otrosController.materiaDocente);

export default router;