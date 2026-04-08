import { Router } from "express";
import { getResumoMensal } from "../controllers/resumo.controller";

const router = Router();

router.get("/", getResumoMensal);

export default router;