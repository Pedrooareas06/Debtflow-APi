import { Router } from "express";
import { postDespesa, getDespesas } from "../controllers/despesas.controller";

const router = Router();

router.post("/", postDespesa);
router.get("/", getDespesas);

export default router;