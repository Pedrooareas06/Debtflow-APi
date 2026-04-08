import { Request, Response } from "express";
import { criarDespesa, listarDespesas } from "../services/despesas.service";

export function postDespesa(req: Request, res: Response) {
  try {
    const despesa = criarDespesa(req.body);

    return res.status(201).json({
      message: "Despesa cadastrada com sucesso",
      despesa,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
}

export function getDespesas(req: Request, res: Response) {
  const resultado = listarDespesas();
  return res.status(200).json(resultado);
}