const fs = require('fs');
const xlsx = require('xlsx');
const mysql = require('mysql2');

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Alterar conforme o seu usuário
  password: 'Alfa@567*', // Alterar conforme a sua senha
  database: 'sistema' // Substituir pelo nome do seu banco de dados
});

// Função para converter a data do Excel para o formato de data do MySQL (YYYY-MM-DD)
const excelDateToMysqlDate = (excelDate) => {
  if (typeof excelDate === 'number' && !isNaN(excelDate)) {
    const startDate = new Date(1899, 11, 30);  // Data base do Excel (30 de dezembro de 1899)
    const millisecondsInDay = 86400000;  // 24 horas em milissegundos
    return new Date(startDate.getTime() + excelDate * millisecondsInDay).toISOString().split('T')[0];  // Formato YYYY-MM-DD
  }
  return null;  // Retorna null se a data for inválida
};

// Função para importar os dados da planilha "captacao_geral"
const importarCaptacaoGeral = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  data.forEach((row) => {
    const query = `
      INSERT INTO captacao_geral (processo, termo_busca, tipo_captacao, responsavel, exequente, adv, exequente_escritorio, contato, observacoes, ligacao_frutifera, num_imoveis)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [
      row['PROCESSO'],
      row['TERMO DE BUSCA'],
      row['TIPO DE CAPTAÇÃO'],
      row['RESPONSÁVEL'],
      row['EXEQUENTE'],
      row['ADV'],
      row['EXEQUENTE/ESCRITÓRIO'],
      row['CONTATO'],
      row['OBSERVAÇÕES'],
      row['"Ligação frutífera? (SIM ou NÃO)"'],
      row['Nº DE IMÓVEIS']
    ], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados na tabela captacao_geral:', err);
      } else {
        console.log('Dados inseridos na tabela captacao_geral:', result);
      }
    });
  });
};

// Função para importar os dados da planilha "indicacao"
const importarIndicacao = (filePath) => {
  // Lê o arquivo Excel
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  // Preparar e inserir os dados no banco de dados
  data.forEach((row) => {
    const values = [
      excelDateToMysqlDate(row['DATA DA CAPTAÇÃO']),
      excelDateToMysqlDate(row['DATA DA ULTIMA VISTA']),
      row['PROCESSO'] || null,
      row['ESTADO'] || null,
      row['NOMENC. CAPTADA'] || null,
      row['VARA'] || null,
      row['FORO'] || null,
      row['JUIZO'] || null,
      row['SITUAÇÃO'] || null,
      row['VALOR DA AÇÃO/ADV CONSTITUIDO'] || null,
      row['TIPO DE CAPTAÇÃO'] || null,
      row['ADVOGADO / ESCRITÓRIO'] || null,
      row['CONTATO'] || null,
      row['CIDADE'] || null,
      row['BAIRRO'] || null,
      row['ANÁLISE DE VIABILIDADE'] || null,
      row['OBSERVAÇÕES CAPTADOR'] || null,
      row['RELATÓRIO'] || null,
      row['OBSERVAÇÕES MANUTENÇÃO'] || null,
      row['RESPONSÁVEL'] || null,
      row['SISTEMA'] || null
    ];

    const query = `
      INSERT INTO indicacao 
      (data_captacao, data_ultima_vista, processo, estado, nomenclatura_captada, vara, foro, juizo, situacao, valor_acao_adv_conc, tipo_captacao, advogado_escritorio, contato, cidade, bairro, analise_viabilidade, \`observacoes-captador\`, relatorio, observacoes_manutencao, responsavel, sistema)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados na tabela indicacao:', err);
      } else {
        console.log('Dados inseridos na tabela indicacao:', result);
      }
    });
  });
};