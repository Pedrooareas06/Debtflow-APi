import express from "express"; // Cria o servidor e rotas
import cors from "cors"; // Permite que o servidor se comunique com o frontend

const app = express(); // Criando o servidor

app.use(cors()); // Permite que o servidor se comunique com o frontend
app.use(express.json()); // Transforma o corpo da requisição em um objeto JSON

const clientes: { id: number; nome: string; cpf: string }[] = []; // Cria um array de clientes

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "API online" });
});

app.post("/clientes", (req, res) => {
  const { nome, cpf } = req.body;

  if (!nome || !cpf) {
    return res.status(400).json({ message: "Nome e CPF são obrigatórios" });
  }

  const nomeTrimado = nome.trim();
  

  if (!nomeTrimado) {
    return res.status(400).json({ message: "O nome não pode ser vazio"});
  }

  const cpfLimpo = cpf.replace(/\D/g, "");

  if (cpfLimpo.length !== 11) {
    return res.status(400).json({ message: "CPF inválido. Informe um CPF com 11 dígitos"})
  }

  const cpfJaExiste = clientes.some((cliente) => cliente.cpf === cpfLimpo);

  if (cpfJaExiste) {
    return res.status(400).json({ message: "Já existe um cliente cadastro com este CPF"});
  }

  const novoCliente = { id: Date.now(), nome: nomeTrimado, cpf: cpfLimpo, };
  clientes.push(novoCliente);

  return res.status(201).json({
    message: "Cliente criado com sucesso",
    cliente: novoCliente,
  });
});

app.get("/clientes", (req, res) => {
  return res.status(200).json({
    total: clientes.length,
    clientes: clientes,
  });
});

app.get("/clientes/:id", (req, res) => {
  const id = Number(req.params.id);

  const cliente = clientes.find((cliente) => cliente.id === id);

  if (!cliente) {
    return res.status(404).json({
      message: "Cliente não encontrado",
    });
  }

  return res.status(200).json({
    cliente,
  });
});

app.delete("/clientes/:id", (req, res) => {
  const id = Number(req.params.id);

  const clienteExiste = clientes.some((cliente) => cliente.id === id);

  if (!clienteExiste) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  const clientesAtualizados = clientes.filter((cliente) => cliente.id !== id);
  clientes.length = 0;
  clientes.push(...clientesAtualizados);

  return res.status(200).json({
    message: "Cliente removido com sucesso",
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});