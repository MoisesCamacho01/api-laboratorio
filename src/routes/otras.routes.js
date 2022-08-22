import { Router } from "express";
import { methods as otrosController } from "../controllers/otros.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/materiaDocente', funciones.verifyToken, otrosController.materiaDocente);
router.get('/noAsignadasM/:id', funciones.verifyToken, otrosController.noAsignadasM);
export default router;

router.delete('/EliminarMatriculaA/:id', funciones.verifyToken, otrosController.eliminarE);