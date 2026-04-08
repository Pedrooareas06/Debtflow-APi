export const clientes: { id: number; nome: string; cpf: string }[] = [];

export const receitas: {
  id: number;
  usuarioId: number;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
}[] = [];

export const despesas: {
  id: number;
  usuarioId: number;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
}[] = [];