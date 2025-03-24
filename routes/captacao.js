const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // ou o seu usuário MySQL
    password: 'Alfa@567*', // altere a senha se necessário
    database: 'sistema'
});

// Endpoint para criar uma captação
router.post('/', (req, res) => {
    const { nome, numero_processo, data_inicio } = req.body;
    const query = 'INSERT INTO captacao (nome, numero_processo, data_inicio) VALUES (?, ?, ?)';
    db.query(query, [nome, numero_processo, data_inicio], (err, results) => {
        if (err) {
            console.error('Erro ao inserir captação:', err);
            return res.status(500).send('Erro ao inserir captação');
        }
        res.status(201).send('Captação criada com sucesso');
    });
});

// Endpoint para atualizar o status da captação para 'captado'
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE captacao SET status = "captado" WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar captação:', err);
            return res.status(500).send('Erro ao atualizar captação');
        }
        res.status(200).send('Captação atualizada com sucesso');
    });
});

// Endpoint para registrar uma indicação
router.post('/indicar', (req, res) => {
    const { captacao_id, nome_indicado, data_indicacao } = req.body;
    const query = 'INSERT INTO indicacao (captacao_id, nome_indicado, data_indicacao) VALUES (?, ?, ?)';
    db.query(query, [captacao_id, nome_indicado, data_indicacao], (err, results) => {
        if (err) {
            console.error('Erro ao registrar indicação:', err);
            return res.status(500).send('Erro ao registrar indicação');
        }
        res.status(201).send('Indicação registrada com sucesso');
    });
});

// Rota para obter os dados de captacao_geral
router.get('/captacao_geral', (req, res) => {
    const query = 'SELECT * FROM captacao_geral'; // Certifique-se que esse nome de tabela existe no seu banco de dados
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados de captacao_geral:', err);
            return res.status(500).send('Erro ao buscar dados');
        }
        res.json(results);
    });
});
// Endpoint para listar todas as indicações
router.get('/indicacao', (req, res) => {
    const query = 'SELECT * FROM indicacao';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar indicações:', err);
            return res.status(500).send('Erro ao buscar indicações');
        }
        res.status(200).json(results);
    });
});


module.exports = router;
