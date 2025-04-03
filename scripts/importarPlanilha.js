const fs = require('fs');
const xlsx = require('xlsx');
const mysql = require('mysql2');

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Alfa@567*',
  database: 'sistema',
  connectTimeout: 50000
});

// Função para converter datas do Excel para o formato MySQL (YYYY-MM-DD)
const excelDateToMysqlDate = (excelDate) => {
  if (typeof excelDate === 'number' && !isNaN(excelDate)) {
    const startDate = new Date(1899, 11, 30);
    return new Date(startDate.getTime() + excelDate * 86400000).toISOString().split('T')[0];
  }
  return null;
};

// Função para processar "Ligação Frutífera"
const processarLigacaoFrutifera = (valor) => {
  if (valor === true || valor === "SIM" || valor === 1 || valor === "Sim") return "SIM";
  return "NÃO";
};

// Função para processar "Número de Imóveis" como texto
const processarNumImoveis = (valor) => {
  console.log("Valor recebido em processarNumImoveis:", valor); // Log para verificar o valor recebido

  if (!valor) return null;
  return valor.toString().trim(); // Agora tratamos como texto
};

// Função genérica para importar dados de planilhas para o MySQL
const importarDados = (filePath, tableName, columnsMap) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  console.log("Colunas encontradas:", Object.keys(data[0])); // Log para verificar os nomes das colunas

  data.forEach((row) => {
    const values = columnsMap.map((col) => {
      console.log(JSON.stringify(row))
      if (col.type === 'date' || col.type === 'data_ultima_vista') return excelDateToMysqlDate(row[col.name]);
      if (col.type === 'ligacao_frutifera') return processarLigacaoFrutifera(row[col.name]);
      if (col.type === 'num_imoveis') return processarNumImoveis(row[col.name]);
      return row[col.name] || null;
    });

    console.log(`Inserindo dados na tabela ${tableName}:`, values); // Log para ver os dados antes de inserir

    const placeholders = columnsMap.map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columnsMap.map(c => c.db).join(', ')}) VALUES (${placeholders})`;

    db.query(query, values, (err, result) => {
      if (err) {
        console.error(`Erro ao inserir dados na tabela ${tableName}:`, err);
      } else {
        console.log(`Dados inseridos na tabela ${tableName}:`, result);
      }
    });
  });
};

// Mapeamento das colunas para a tabela "captacao_geral"
const captacaoGeralColumns = [
  { name: 'DATA', db: 'data_captacao', type: 'date' },
  { name: 'PROCESSO', db: 'processo' },
  { name: 'TERMO DE BUSCA', db: 'termo_busca' },
  { name: 'TIPO DE CAPTAÇÃO', db: 'tipo_captacao' },
  { name: 'EXEQUENTE', db: 'exequente' },
  { name: 'ADV EXEQUENTE/ESCRITÓRIO', db: 'adv_exequente_escritorio' },
  { name: 'RESPONSÁVEL', db: 'responsavel' },
  { name: 'CONTATO', db: 'contato' },
  { name: 'OBSERVAÇÕES', db: 'observacoes' },
  { name: 'Ligação frutífera? \r\n(SIM ou NÃO)', db: 'ligacao_frutifera', type: 'ligacao_frutifera' },
  { name: 'Nº DE IMÓVEIS ', db: 'num_imoveis', type: 'num_imoveis' },
];

// Mapeamento das colunas para a tabela "indicacao"
const indicacaoColumns = [
  { name: 'DATA DA CAPTAÇÃO', db: 'data_captacao', type: 'date' },
  { name: 'DATA DA ULTIMA VISTA', db: 'data_ultima_vista', type: 'date' },
  { name: 'PROCESSO', db: 'processo' },
  { name: 'ESTADO', db: 'estado' },
  { name: 'NOMENC. CAPTADA', db: 'nomenclatura_captada' },
  { name: 'VARA', db: 'vara' },
  { name: 'FORO', db: 'foro' },
  { name: 'JUIZO', db: 'juizo' },
  { name: 'SITUAÇÃO', db: 'situacao' },
  { name: 'VALOR DA AÇÃO/ADV CONSTITUÍDO', db: 'valor_acao_adv_conc' },
  { name: 'TIPO DE CAPTAÇÃO', db: 'tipo_captacao' },
  { name: 'ADVOGADO / ESCRITÓRIO', db: 'advogado_escritorio' },
  { name: 'CONTATO', db: 'contato' },
  { name: 'CIDADE', db: 'cidade' },
  { name: 'BAIRRO', db: 'bairro' },
  { name: 'ANÁLISE DE VIABILIDADE', db: 'analise_viabilidade' },
  { name: 'OBSERVAÇÕES CAPTADOR', db: 'observacoes_captador' },
  { name: 'RELATÓRIO', db: 'relatorio' },
  { name: 'OBSERVAÇÕES MANUTENÇÃO', db: 'observacoes_manutencao' },
  { name: 'RESPONSÁVEL', db: 'responsavel' },
];

// Caminhos dos arquivos Excel
const fileCaptacaoGeral = 'C:/Users/nbas/Downloads/sistema-captacao/captacao_geral.xlsx'; // trocar para o caminho da sua maquina
const fileIndicacao = 'C:/Users/nbas/Downloads/sistema-captacao/indicacao.xlsx';

// Importar os dados
importarDados(fileCaptacaoGeral, 'captacao_geral', captacaoGeralColumns);
importarDados(fileIndicacao, 'indicacao', indicacaoColumns);
