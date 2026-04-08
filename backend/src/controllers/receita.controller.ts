import { Request, Response } from "express";
import { criarReceita, listarReceitas } from "../services/receita.service";

export function postReceita(req: Request, res: Response) {
  try {
    const receita = criarReceita(req.body);

    return res.status(201).json({
      message: "Receita cadastrada com sucesso",
      receita,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
}

export function getReceitas(req: Request, res: Response) {
  const resultado = listarReceitas();
  return res.status(200).json(resultado);
}