import { Router } from "express";
import {
  postCliente,
  getClientes,
  getClienteById,
  deleteCliente,
} from "../controllers/Cliente.controller";

const router = Router();

router.post("/", postCliente);
router.get("/", getClientes);
router.get("/:id", getClienteById);
router.delete("/:id", deleteCliente);

export default router;