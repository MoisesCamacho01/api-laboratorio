import {Router} from "express";
import { methods as languageController } from "./../controllers/language.controller";

const router = Router();

router.get("/", languageController.getLanguage);

export default router;