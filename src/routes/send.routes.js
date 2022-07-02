import { Router } from "express";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.post('/', funciones.send);

export default router;