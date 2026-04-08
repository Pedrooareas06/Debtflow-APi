import { Request, Response } from "express";
import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  removerCliente,
} from "../services/Cliente.service";

export function postCliente(req: Request, res: Response) {
  try {
    const cliente = criarCliente(req.body);

    return res.status(201).json({
      message: "Cliente criado com sucesso",
      cliente,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
}

export function getClientes(req: Request, res: Response) {
  const resultado = listarClientes();
  return res.status(200).json(resultado);
}

export function getClienteById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const cliente = buscarClientePorId(id);

    return res.status(200).json({ cliente });
  } catch (error) {
    return res.status(404).json({
      message: (error as Error).message,
    });
  }
}

export function deleteCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const resultado = removerCliente(id);

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(404).json({
      message: (error as Error).message,
    });
  }
}