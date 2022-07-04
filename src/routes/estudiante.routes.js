import { Router } from "express";
import { methods as estudianteController } from "../controllers/estudiante.controller";

const router = Router();

router.post('/', estudianteController.encontrarEstudiante);

export default router;