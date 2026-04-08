import { Request, Response } from "express";
import { obterResumoMensal } from "../services/resumo.service";

export function getResumoMensal(req: Request, res: Response) {
  const resumo = obterResumoMensal();
  return res.status(200).json(resumo);
}