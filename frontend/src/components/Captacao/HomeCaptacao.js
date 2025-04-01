import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const HomeCaptacao = () => {
  const [captacaoGeral, setCaptacaoGeral] = useState([]);
  const [indicacao, setIndicacao] = useState([]);
  const [activeTab, setActiveTab] = useState("captacaoGeral");
  const [error, setError] = useState(null);
  const [captacaoGeralFilters, setCaptacaoGeralFilters] = useState({});
  const [indicacaoFilters, setIndicacaoFilters] = useState({});

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy'); // Exemplo: 29/01/2020
  };
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de itens por página
  
  const sortByDate = (data) => {
    return data.sort((a, b) => new Date(b.data_captacao || b.data_captacao) - new Date(a.data_captacao || a.data_captacao));
  };

  // Função para buscar os dados do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const captacaoResponse = await axios.get(
          "http://localhost:3001/api/captacao/captacao_geral"
        );
        const indicacaoResponse = await axios.get(
          "http://localhost:3001/api/captacao/indicacao"
        );
        console.log('Captacao Geral:', captacaoResponse.data);
        console.log('Indicação:', indicacaoResponse.data);
        setCaptacaoGeral(captacaoResponse.data);
        setIndicacao(indicacaoResponse.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao buscar os dados.");
      }
    };

    fetchData();
  }, []);

  // Função para filtrar os dados
  const filterData = (data, filters) => {
    return data.filter((item) =>
      Object.keys(filters).every((key) => {
        if(item[key]?.includes('mediata')) {
          return item[key] ? item[key].toString().toLowerCase() === filters[key].toLowerCase() : true
        }
         return item[key] ? item[key].toString().toLowerCase().includes(filters[key].toLowerCase()) : true
      }
      )
    );
  };

  // Função para atualizar os filtros
  const handleFilterChange = (e, filterType) => {
    const { name, value } = e.target;
    if (filterType === "captacaoGeral") {
      setCaptacaoGeralFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    } else if (filterType === "indicacao") {
      setIndicacaoFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  // Função para calcular a página atual
  const paginate = (data) => {
    const filteredData = filterData(data, activeTab === "captacaoGeral" ? captacaoGeralFilters : indicacaoFilters);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  // Função para mudar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Função para exibir o número de páginas
  const totalPages = (data) => {
    const filteredData = filterData(data, activeTab === "captacaoGeral" ? captacaoGeralFilters : indicacaoFilters);
    return Math.ceil(filteredData.length / itemsPerPage);
  };

  return (
    <div>
      <h1>Home da Captação</h1>

      {/* Exibindo a mensagem de erro, se houver */}
      {error && <div className="error-message">{error}</div>}

      {/* Abas para alternar entre Captação Geral e Indicação */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "captacaoGeral" ? "active" : ""}`}
          onClick={() => setActiveTab("captacaoGeral")}
        >
          Captação Geral
        </div>
        <div
          className={`tab ${activeTab === "indicacao" ? "active" : ""}`}
          onClick={() => setActiveTab("indicacao")}
        >
          Indicação
        </div>
      </div>

      {/* Conteúdo da Captação Geral */}
      {activeTab === "captacaoGeral" && (
        <div>
          <h2>Captação Geral</h2>

          {/* Filtros */}
      <div className="filters">
          <input
          type="text"
          name="responsavel"
          placeholder="Filtrar por Responsável"
          onChange={(e) => handleFilterChange(e, "captacao_geral")}
      />
          <input
            type="text"
            name="exequente"
            placeholder="Filtrar por Exequente"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
          <input
            type="text"
            name="advogado"
            placeholder="Filtrar por Advogado"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
          <input
            type="text"
            name="escritorio"
            placeholder="Filtrar por Escritório"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
          <input
            type="text"
            name="contato"
            placeholder="Filtrar por Contato"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
          <input
            type="text"
            name="observacoes"
            placeholder="Filtrar por Observações"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
          <input
            type="text"
            name="ligacao_frutifera"
            placeholder="Filtrar por Ligação Frutífera"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
          <input
            type="text"
            name="numero_imoveis"
            placeholder="Filtrar por Número de Imóveis"
            onChange={(e) => handleFilterChange(e, "captacao_geral")}
          />
            <input
              type="text"
              name="processo"
              placeholder="Filtrar por Processo"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />
            <input
              type="text"
              name="termo_busca"
              placeholder="Filtrar por Termo de Busca"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />
            <input
              type="text"
              name="tipo_captacao"
              placeholder="Filtrar por Tipo de Captação"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />
          </div>

          <table border="1">
            <thead>
              <tr>
                <th>Processo</th>
                <th>Termo de Busca</th>
                <th>Tipo de Captação</th>
                <th>Responsável</th>
                <th>Exequente</th>
                <th>Advogado</th>
                <th>Escritório</th>
                <th>Contato</th>
                <th>Observações</th>
                <th>Ligação Frutífera</th>
                <th>Número de Imóveis</th>
              </tr>
            </thead>
            <tbody>
              {paginate(sortByDate(captacaoGeral)).map((item, index) => (
                <tr key={index}>
                  <td>{item.processo}</td>
                  <td>{item.termo_busca}</td>
                  <td>{item.tipo_captacao}</td>
                  <td>{item.responsavel}</td>
                  <td>{item.exequente}</td>
                  <td>{item.adv}</td>
                  <td>{item.exequente_escritorio}</td>
                  <td>{item.contato}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.ligacao_frutifera}</td>
                  <td>{item.num_imoveis}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages(captacaoGeral)}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages(captacaoGeral)}
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo da Indicação */}
      {activeTab === "indicacao" && (
        <div>
          <h2>Indicação</h2>

          {/* Filtros */}
          <div className="filters">
            <input
              type="text"
              name="data_captacao"
              placeholder="Filtrar por Data Captação"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="estado"
              placeholder="Filtrar por Estado"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="nomenclatura_captada"
              placeholder="Filtrar por Nomenclatura Captada"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="data_captacao"
              placeholder="Filtrar por Data Captação"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="data_ultima_vista"
              placeholder="Filtrar por Data Última Vista"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="processo"
              placeholder="Filtrar por Processo"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="estado"
              placeholder="Filtrar por Estado"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="nomenclatura_captada"
              placeholder="Filtrar por Nomenclatura Captada"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="vara"
              placeholder="Filtrar por Vara"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="foro"
              placeholder="Filtrar por Foro"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="juizo"
              placeholder="Filtrar por Juízo"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="situacao"
              placeholder="Filtrar por Situação"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="valor_acao"
              placeholder="Filtrar por Valor da Ação"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="tipo_captacao"
              placeholder="Filtrar por Tipo de Captação"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="advogado"
              placeholder="Filtrar por Advogado"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
      
            <input
              type="text"
              name="cidade"
              placeholder="Filtrar por Cidade"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="bairro"
              placeholder="Filtrar por Bairro"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="analise_viabilidade"
              placeholder="Filtrar por Análise Viabilidade"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="relatorio"
              placeholder="Filtrar por Relatório"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="manutencao"
              placeholder="Filtrar por Manutenção"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="responsavel"
              placeholder="Filtrar por Responsável"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
            <input
              type="text"
              name="sistema"
              placeholder="Filtrar por Sistema"
              onChange={(e) => handleFilterChange(e, "indicacao")}
            />
         
          </div>

          <table class = "table-indicacao" border="1">
            <thead>
              <tr>
                <th>Data Captação</th>
                <th>Data Última Vista</th>
                <th>Processo</th>
                <th>Estado</th>
                <th>Nomenclatura Captada</th>
                <th>Vara</th>
                <th>Foro</th>
                <th>Juízo</th>
                <th>Situação</th>
                <th>Valor da Ação</th>
                <th>Tipo de Captação</th>
                <th>Advogado</th>
                <th>Contato</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Análise Viabilidade</th>
                <th>Observações</th>
                <th>Relatório</th>
                <th>Manutenção</th>
                <th>Responsável</th>
                <th>Sistema</th>
              </tr>
            </thead>
            <tbody>
              {paginate(sortByDate(indicacao)).map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.data_captacao)}</td>
                  <td>{item.data_ultima_vista}</td>
                  <td>{item.processo}</td>
                  <td>{item.estado}</td>
                  <td>{item.nomenclatura_captada}</td>
                  <td>{item.vara}</td>
                  <td>{item.foro}</td>
                  <td>{item.juizo}</td>
                  <td>{item.situacao}</td>
                  <td>{item.valor_acao_adv_conc}</td>
                  <td>{item.tipo_captacao}</td>
                  <td>{item.advogado_escritorio}</td>
                  <td>{item.contato}</td>
                  <td>{item.cidade}</td>
                  <td>{item.bairro}</td>
                  <td>{item.analise_viabilidade}</td>
                  <td>{item.observacoes_captador}</td>
                  <td>{item.relatorio}</td>
                  <td>{item.observacoes_manutencao}</td>
                  <td>{item.responsavel}</td>
                  <td>{item.sistema}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages(indicacao)}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages(indicacao)}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCaptacao;
