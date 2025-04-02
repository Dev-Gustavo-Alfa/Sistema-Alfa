const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Conexão com o banco de dados
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alfa@567*',
    database: 'sistema'
});

// Endpoint para criar uma captação
router.post('/', (req, res) => {
    const { 
        data_captacao, 
        data_ultima_vista, 
        processo, 
        estado, 
        nomenclatura_captada, 
        vara, 
        foro, 
        juizo, 
        situacao, 
        valor_acao_adv_conc, 
        tipo_captacao, 
        advogado_escritorio, 
        contato, 
        cidade, 
        bairro, 
        analise_viabilidade, 
        relatorio, 
        observacoes_manutencao, 
        responsavel, 
        sistema, 
        observacoes_captador,
        status, 
        termo_busca 
    } = req.body;

    if (!data_captacao || !data_ultima_vista || !processo || !estado || !nomenclatura_captada || 
        !vara || !foro || !juizo || !situacao || !valor_acao_adv_conc || !tipo_captacao || 
        !advogado_escritorio || !contato || !cidade || !bairro || !analise_viabilidade || 
        !relatorio || !observacoes_manutencao || !responsavel || !sistema || !observacoes_captador || 
        !status || !termo_busca) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    // Inserção no banco, dependendo do status
    if (status === 'captado') {
        const query = `
         INSERT INTO indicacao 
        (data_captacao, data_ultima_vista, processo, estado, nomenclatura_captada, vara, foro, juizo, situacao, valor_acao_adv_conc, tipo_captacao, advogado_escritorio, contato, cidade, bairro, analise_viabilidade, observacoes_captador,relatorio, observacoes_manutencao, responsavel)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        db.query(query, [
            data_captacao, data_ultima_vista, processo, estado, nomenclatura_captada, vara, foro, juizo, 
            situacao, valor_acao_adv_conc, tipo_captacao, advogado_escritorio, contato, cidade, bairro, 
            analise_viabilidade, relatorio, observacoes_manutencao, responsavel, sistema, observacoes_captador
        ], (err, results) => {
            if (err) {
                console.error('Erro ao inserir na tabela indicacao:', err);
                return res.status(500).send('Erro ao registrar captação captada');
            }
            res.status(201).send('Captação captada registrada com sucesso');
        });
    } else if (status === 'contatado') {
        const query = `
            INSERT INTO captacao_geral (
                processo, termo_busca, tipo_captacao, responsavel, exequente, contato, observacoes, 
                ligacao_frutifera, num_imoveis, data_captacao, exequente_ou_adv, adv_exequente_escritorio
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [
            processo, termo_busca, tipo_captacao, responsavel, exequente, contato, observacoes, 
            ligacao_frutifera, num_imoveis, data_captacao, exequente_ou_adv, adv_exequente_escritorio
        ], (err, results) => {
            if (err) {
                console.error('Erro ao inserir na tabela captacao_geral:', err);
                return res.status(500).send('Erro ao registrar captação contatada');
            }
            res.status(201).send('Captação contatada registrada com sucesso');
        });
    } else {
        res.status(400).send('Status inválido. Use "captado" ou "contatado"');
    }
});


// Endpoint para listar todas as indicações (captados)
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

// Endpoint para listar todas as captações gerais (contatados)
router.get('/captacao_geral', (req, res) => {
    const query = 'SELECT * FROM captacao_geral';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados de captacao_geral:', err);
            return res.status(500).send('Erro ao buscar dados');
        }
        res.json(results);
    });
});
router.get('/captacoes/dia', (req, res) => {
    const query = `
        SELECT captador, COUNT(*) as total
        FROM captacao_geral
        WHERE DATE(data_criacao) = CURDATE()
        GROUP BY captador;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar captações diárias:', err);
            return res.status(500).send('Erro ao buscar dados');
        }
        res.json(results);
    });
});

router.get('/captacoes/mes', (req, res) => {
    const query = `
        SELECT captador, COUNT(*) as total
        FROM captacao_geral
        WHERE MONTH(data_criacao) = MONTH(CURDATE()) AND YEAR(data_criacao) = YEAR(CURDATE())
        GROUP BY captador;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar captações mensais:', err);
            return res.status(500).send('Erro ao buscar dados');
        }
        res.json(results);
    });
});


router.get('/buscar/:processo', (req, res) => {
    const { processo } = req.params;
    console.log('Buscando o processo:', processo);

    // Verifica primeiro na tabela "indicacao"
    const queryIndicacao = 'SELECT * FROM indicacao WHERE processo = ?';

    db.query(queryIndicacao, [processo], (err, resultsIndicacao) => {
        if (err) {
            console.error('Erro ao buscar na tabela indicacao:', err);
            return res.status(500).send('Erro ao buscar captação');
        }

        if (resultsIndicacao.length > 0) {
            console.log('Encontrado na tabela indicacao:', resultsIndicacao);
            return res.json({ tabela: 'indicacao', dados: resultsIndicacao });
        }

        console.log('Não encontrado na tabela indicacao, verificando tabela captacao_geral...');

        // Se não encontrou em "indicacao", procura em "captacao_geral"
        const queryCaptacaoGeral = 'SELECT * FROM captacao_geral WHERE processo = ?';

        db.query(queryCaptacaoGeral, [processo], (err, resultsCaptacaoGeral) => {
            if (err) {
                console.error('Erro ao buscar na tabela captacao_geral:', err);
                return res.status(500).send('Erro ao buscar captação');
            }

            if (resultsCaptacaoGeral.length > 0) {
                console.log('Encontrado na tabela captacao_geral:', resultsCaptacaoGeral);
                return res.json({ tabela: 'captacao_geral', dados: resultsCaptacaoGeral });
            }

            // Se não encontrou em nenhuma das duas tabelas
            console.log('Captação não encontrada');
            res.status(404).send('Captação não encontrada');
        });
    });
});


module.exports = router;
