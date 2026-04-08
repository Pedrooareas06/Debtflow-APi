import express from "express";
import cors from "cors";

import clienteRoutes from "./routes/Clientes.routes";
import receitaRoutes from "./routes/receita.routes";
import despesasRoutes from "./routes/despesas.route";
import resumoRoutes from "./routes/resumo.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "API online" });
});

app.use("/clientes", clienteRoutes);
app.use("/receitas", receitaRoutes);
app.use("/despesas", despesasRoutes);
app.use("/resumo-mensal", resumoRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});