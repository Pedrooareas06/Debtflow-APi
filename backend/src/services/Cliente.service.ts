import { clientes } from "../data/store";

export function criarCliente(data: { nome: string; cpf: string }) {
  const { nome, cpf } = data;

  if (!nome || !cpf) {
    throw new Error("Nome e CPF são obrigatórios");
  }

  const nomeTrimado = nome.trim();

  if (!nomeTrimado) {
    throw new Error("O nome não pode ser vazio");
  }

  const cpfLimpo = cpf.replace(/\D/g, "");

  if (cpfLimpo.length !== 11) {
    throw new Error("CPF inválido. Informe um CPF com 11 dígitos");
  }

  const cpfJaExiste = clientes.some((cliente) => cliente.cpf === cpfLimpo);

  if (cpfJaExiste) {
    throw new Error("Já existe um cliente cadastro com este CPF");
  }

  const novoCliente = {
    id: Date.now(),
    nome: nomeTrimado,
    cpf: cpfLimpo,
  };

  clientes.push(novoCliente);

  return novoCliente;
}

export function listarClientes() {
  return {
    total: clientes.length,
    clientes,
  };
}

export function buscarClientePorId(id: number) {
  const cliente = clientes.find((cliente) => cliente.id === id);

  if (!cliente) {
    throw new Error("Cliente não encontrado");
  }

  return cliente;
}

export function removerCliente(id: number) {
  const clienteExiste = clientes.some((cliente) => cliente.id === id);

  if (!clienteExiste) {
    throw new Error("Cliente não encontrado");
  }

  const clientesAtualizados = clientes.filter((cliente) => cliente.id !== id);
  clientes.length = 0;
  clientes.push(...clientesAtualizados);

  return { message: "Cliente removido com sucesso" };
}