import { receitas } from "../data/store";

type ReceitaInput = {
  usuarioId: number;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
};

export function criarReceita(data: ReceitaInput) {
  const { usuarioId, descricao, valor, categoria, data: dataReceita } = data;

  if (!usuarioId || !descricao || !valor || !categoria || !dataReceita) {
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

  const novaReceita = {
    id: Date.now(),
    usuarioId,
    descricao: descricaoTrimada,
    valor: valorNumero,
    categoria,
    data: dataReceita,
  };

  receitas.push(novaReceita);

  return novaReceita;
}

export function listarReceitas() {
  return {
    total: receitas.length,
    receitas,
  };
}