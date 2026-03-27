import express from "express"; // Cria o servidor e rotas
import cors from "cors"; // Permite que o servidor se comunique com o frontend

const app = express (); // Criando o servidor

app.use(cors()); // Permite que o servidor se comunique com o frontend
app.use(express.json()); // Transforma o corpo da requisição em um objeto JSON

const clientes: { id: number,nome: string, cpf: string}[] = []; //Cria um array de clientes

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "API online",});
});


app.post("/clientes", (req, res) => { // Cria um novo cliente
    const {nome , cpf} = req.body; // Pega o nome e o CPF do cliente
    if (!nome || !cpf) { // Se o nome ou o CPF não forem informados, retorna um erro
        return res.status(400).json({ message: "Nome e CPF são obrigatórios"}); // retorna um erro 400
    }

    const novoCliente = { id: Date.now(),nome, cpf};
    clientes.push(novoCliente);

    return res.status(201).json({ message: "Cliente criado  com sucesso com sucesso", // Se o cliente for criado com sucesso, retorna um JSON com o nome e o CPF do cliente
        id: Date.now(),
        cliente: novoCliente,
    });
});

app.delete("/clientes/:id", (req, res) => {
    const id = Number(req.params.id);


    const clienteExiste = clientes.some((cliente) => cliente.id === id);

    if (!clienteExiste) {
        return res.status(404).json({ message: "Cliente não encontrado",});
    }

    const clientesAtualizados = clientes.filter((cliente) => cliente.id !== id);
    clientes.length = 0;
    clientes.push(...clientesAtualizados);

    return res.status(200).json({
        message: "Cliente removido com sucesso",
    });
});


app.get("/clientes", (req, res) => {
    return res.status(200).json({ total: clientes.length, clientes: clientes});
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});