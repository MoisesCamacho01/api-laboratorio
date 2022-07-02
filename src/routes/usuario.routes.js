import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";

const router = Router();

router.post('/', usuarioController.insertar);
export default router;
