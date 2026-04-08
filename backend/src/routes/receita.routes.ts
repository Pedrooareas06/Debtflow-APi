import { Router } from "express";
import { postReceita, getReceitas } from "../controllers/receita.controller";

const router = Router();

router.post("/", postReceita);
router.get("/", getReceitas);

export default router;