import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.post("/", usuarioController.login);
router.post("/salir", funciones.verifyToken, usuarioController.logout);
router.post("/password", funciones.verifyToken, usuarioController.password);
router.post("/nivel", funciones.verifyToken, usuarioController.nivel);

export default router;