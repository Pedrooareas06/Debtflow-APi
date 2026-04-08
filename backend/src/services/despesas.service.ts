import { despesas } from "../data/store";

type DespesaInput = {
  usuarioId: number;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
};

export function criarDespesa(data: DespesaInput) {
  const { usuarioId, descricao, valor, categoria, data: dataDespesa } = data;

  if (!usuarioId || !descricao || !valor || !categoria || !dataDespesa) {
    throw new Error("Todos os campos são obrigatórios");
  }

  const descricaoTrimada = descricao.trim();
  const valorNumero = Number(valor);

  if (!descricaoTrimada) {
    throw new Error("A descrição não pode ser vazia");
  }

  if (valorNumero <= 0) {
    throw new Error("O valor deve ser maior que zero");
  }

  const novaDespesa = {
    id: Date.now(),
    usuarioId,
    descricao: descricaoTrimada,
    valor: valorNumero,
    categoria,
    data: dataDespesa,
  };

  despesas.push(novaDespesa);

  return novaDespesa;
}

export function listarDespesas() {
  return {
    total: despesas.length,
    despesas,
  };
}