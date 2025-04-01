const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Endpoint para criar uma captação
router.post("/", async (req, res) => {
  try {
    await prisma.processo.create({
      data: req.body,
    });
    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para atualizar o status da captação para 'captado'
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.processo.update({
    where: { id },
    data: { status: "captado"}
  })
  
  const query = 'UPDATE captacao SET status = "captado" WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar captação:", err);
      return res.status(500).send("Erro ao atualizar captação");
    }
    res.status(200).send("Captação atualizada com sucesso");
  });
});

// Endpoint para criar uma indicação
router.post("/indicar", (req, res) => {
  const { captacao_id, nome_indicado, data_indicacao } = req.body;
  const query =
    "INSERT INTO indicacao (captacao_id, nome_indicado, data_indicacao) VALUES (?, ?, ?)";
  db.query(
    query,
    [captacao_id, nome_indicado, data_indicacao],
    (err, results) => {
      if (err) {
        console.error("Erro ao registrar indicação:", err);
        return res.status(500).send("Erro ao registrar indicação");
      }
      res.status(201).send("Indicação registrada com sucesso");
    }
  );
});

// Rota para obter os dados de captacao_geral
router.get("/captacao_geral", (req, res) => {
  const query = "SELECT * FROM captacao_geral"; // Certifique-se que esse nome de tabela existe no seu banco de dados
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados de captacao_geral:", err);
      return res.status(500).send("Erro ao buscar dados");
    }
    res.json(results);
  });
});
// Endpoint para listar todas as indicações
router.get("/indicacao", (req, res) => {
  const query = "SELECT * FROM indicacao";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar indicações:", err);
      return res.status(500).send("Erro ao buscar indicações");
    }
    res.status(200).json(results);
  });
});

module.exports = router;
