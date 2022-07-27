import { Router } from "express";
import { methods as usuarioController } from "../controllers/usuario.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.post('/', usuarioController.insertar);
router.get('/usuariosDatos', funciones.verifyToken, usuarioController.usuarioDatos);
export default router;
