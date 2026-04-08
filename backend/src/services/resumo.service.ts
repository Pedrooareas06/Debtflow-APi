import { receitas, despesas } from "../data/store";

export function obterResumoMensal() {
  const totalReceitas = receitas.reduce((total, receita) => {
    return total + receita.valor;
  }, 0);

  const totalDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  const saldo = totalReceitas - totalDespesas;

  return {
    totalReceitas,
    totalDespesas,
    saldo,
  };
}