const fs = require("fs");
const path = require("path");
const os = require("os");

// Pasta segura do app para dados do usuário (Windows)
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");

// Função para reiniciar a API (deixa como tá)
const restart = (req, res) => {
  const flagPath = path.resolve(__dirname, "../../restart.flag");
  fs.writeFileSync(flagPath, `Reiniciado em: ${new Date().toISOString()}`);
  console.log("API será reiniciada...");
  res.send("Reiniciando...");
  process.exit(0);
};

// Função para deletar imagem, usando versão async do unlink pra evitar callback hell
const deletarImagem = (nomeArquivo) => {
  const caminhoImagem = path.join(userDataPath, "uploads", nomeArquivo);
  console.log("Tentando deletar:", caminhoImagem);

  if (fs.existsSync(caminhoImagem)) {
    fs.unlink(caminhoImagem, (err) => {
      if (err) {
        console.error("Erro ao deletar imagem:", err);
      } else {
        console.log("Imagem deletada com sucesso:", nomeArquivo);
      }
    });
  } else {
    console.warn("Arquivo não encontrado:", nomeArquivo);
  }
};

const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios." });
  }

  // Garante que a pasta segura exista
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }

  const caminhoCredenciais = path.join(userDataPath, "credenciais.json");
  const dados = { email, senha };

  try {
    // Escreve sempre, sobrescrevendo se o arquivo já existir
    fs.writeFileSync(caminhoCredenciais, JSON.stringify(dados, null, 2));
    console.log("Credenciais salvas ou atualizadas em:", caminhoCredenciais);
    res.status(200).json({ mensagem: "Credenciais salvas com sucesso." });
  } catch (err) {
    console.error("Erro ao salvar credenciais:", err);
    res.status(500).json({ erro: "Erro ao salvar credenciais." });
  }
};

module.exports = {
  restart,
  deletarImagem,
  login,
};
