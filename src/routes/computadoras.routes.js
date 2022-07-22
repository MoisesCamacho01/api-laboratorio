import { Router } from "express";
import { methods as computadorasController } from "../controllers/computadoras.controller";
import { methods as funciones } from "../controllers/funciones.controller";

const router = Router();

router.get('/', funciones.verifyToken, computadorasController.index);
router.get('/:id', funciones.verifyToken, computadorasController.getOne);
router.put('/:id', funciones.verifyToken, computadorasController.actualizar);
router.delete('/:id', funciones.verifyToken, computadorasController.eliminar);
router.post('/registrar', funciones.verifyToken, computadorasController.registrar);

// filtro
// router.delete('/laboratorio/:id', funciones.verifyToken, computadorasController.porlaboratorio);


export default router;