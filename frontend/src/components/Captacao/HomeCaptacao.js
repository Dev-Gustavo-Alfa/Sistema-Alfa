import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../../styles/HomeCaptacao.css";

const HomeCaptacao = () => {
  const [captacaoGeral, setCaptacaoGeral] = useState([]);
  const [indicacao, setIndicacao] = useState([]);
  const [activeTab, setActiveTab] = useState("captacaoGeral");
  const [error, setError] = useState(null);
  const [captacaoGeralFilters, setCaptacaoGeralFilters] = useState({});
  const [indicacaoFilters, setIndicacaoFilters] = useState({});
  const [captacaoToEdit, setCaptacaoToEdit] = useState(null);

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/salvar-captacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(captacaoToEdit),
      });

      const data = await response.json();
      console.log('Captação editada com sucesso', data);
      setCaptacaoToEdit(null); // Limpar o formulário após salvar
    } catch (error) {
      console.error('Erro ao salvar a captação:', error);
    }
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    if(!dateString) return "-" 
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  // Funções de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortByDate = (data) => {
    return data.sort(
      (a, b) => new Date(b.data_captacao) - new Date(a.data_captacao)
    );
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

  const paginate = (data) => {
    const filteredData = filterData(
      data,
      activeTab === "captacaoGeral" ? captacaoGeralFilters : indicacaoFilters
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = (data) => {
    const filteredData = filterData(
      data,
      activeTab === "captacaoGeral" ? captacaoGeralFilters : indicacaoFilters
    );
    return Math.ceil(filteredData.length / itemsPerPage);
  };

  const handleEditClick = (captacao) => {
    setCaptacaoToEdit(captacao);
  };

  const handleCloseModal = () => {
    setCaptacaoToEdit(null);
  };

  return (
    <div>
      <h1>Home da Captação</h1>

      {error && <div className="error-message">{error}</div>}

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

      {activeTab === "captacaoGeral" && (
        <div>
          <h2>Captação Geral</h2>

          <div className="filters">
            <input
              type="text"
              name="data"
              placeholder="Filtrar por Data"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />
            <input
              type="text"
              name="exequente"
              placeholder="Filtrar por Exequente"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />
            
            {/* Filtro para Advogado */}
            <input
              type="text"
              name="advogado/escritorio"
              placeholder="Filtrar por Advogado"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />            

            {/* Filtro para Contato */}
            <input
              type="text"
              name="contato"
              placeholder="Filtrar por Contato"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />

            {/* Filtro para Observações */}
            <input
              type="text"
              name="observacoes"
              placeholder="Filtrar por Observações"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />

            {/* Filtro para Ligação Frutífera */}
            <input
              type="text"
              name="ligacao_frutifera"
              placeholder="Filtrar por Ligação Frutífera"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />

            {/* Filtro para Número de Imóveis */}
            <input
              type="text"
              name="numero_imoveis"
              placeholder="Filtrar por Número de Imóveis"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />  

            {/* Filtro para Processo */}
            <input
              type="text"
              name="processo"
              placeholder="Filtrar por Processo"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />

            {/* Filtro para Termo de Busca */}
            <input
              type="text"
              name="termo_busca"
              placeholder="Filtrar por Termo de Busca"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />

            {/* Filtro para Tipo de Captação */}
            <input
              type="text"
              name="tipo_captacao"
              placeholder="Filtrar por Tipo de Captação"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />
             <input
              type="text"
              name="juizo"
              placeholder="Juiz"
              onChange={(e) => handleFilterChange(e, "captacaoGeral")}
            />

          </div>

          <table border="1">
            <thead>
              <tr>
                <th>Data Captacao</th>
                <th>Processo</th>
                <th>Termo de Busca</th>
                <th>Tipo de Captação</th>
                <th>Exequente</th>
                <th>ADV / ESCRITÓRIO</th>
                <th>Contato</th>
                <th>Observações</th>
                <th>Ligação Frutífera</th>
                <th>Número de Imóveis</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginate(sortByDate(captacaoGeral)).map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.data_captacao)}</td>
                  <td>{item.processo}</td>
                  <td>{item.termo_busca}</td>
                  <td>{item.tipo_captacao}</td>
                  <td>{item.exequente}</td>
                  <td>{item.adv_exequente_escritorio}</td>
                  <td>{item.contato}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.ligacao_frutifera}</td>
                  <td>{item.num_imoveis}</td>
                  <td>
                    <button onClick={() => handleEditClick(item)}>
                      <i className="fa fa-search"></i> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {activeTab === "indicacao" && (
        <div>
          <h2>Indicação</h2>

          <div className="filters">
            <input
              type="text"
              name="advogado"
              placeholder="Filtrar por Advogado"
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

          <table className="table-indicacao" border="1">
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
                <th>Cidade/Bairro</th>
                <th>Observações</th>
                <th>Relatório</th>
                <th>Responsável</th>
                <th>Sistema</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginate(sortByDate(indicacao)).map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.data_captacao)}</td>
                  <td>{formatDate(item.data_ultima_vista)}</td>
                  <td>{item.processo}</td>
                  <td>{item.estado}</td>
                  <td>{item.nomenclatura_captada}</td>
                  <td>{item.vara}</td>
                  <td>{item.foro}</td>
                  <td>{item.juizo}</td>
                  <td>{item.situacao}</td>
                  <td>{item.valor_acao}</td>
                  <td>{item.tipo_captacao}</td>
                  <td>{item.advogado}</td>
                  <td>{item.contato}</td>
                  <td>{item.cidade_bairro}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.relatorio}</td>
                  <td>{item.responsavel}</td>
                  <td>{item.sistema}</td>
                  <td>
                    <button onClick={() => handleEditClick(item)}>
                      <i className="fa fa-edit"></i> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {/* Modal de Edição */}
      {captacaoToEdit && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="edit-captacao-modal" onClick={(e) => e.stopPropagation()}>
      <h3>Editar Captação</h3>
      <form onSubmit={handleSaveEdit}>
        <label>Nº do Processo:</label>
        <input
          type="text"
          value={captacaoToEdit.processo}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              processo: e.target.value,
            })
          }
        />

        <label>Vara:</label>
        <input
          type="text"
          value={captacaoToEdit.vara}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              vara: e.target.value,
            })
          }
        />

        <label>Juiz:</label>
        <input
          type="text"
          value={captacaoToEdit.juiz}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              juiz: e.target.value,
            })
          }
        />

        <label>Foro:</label>
        <input
          type="text"
          value={captacaoToEdit.foro}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              foro: e.target.value,
            })
          }
        />

        <label>Termo de Busca:</label>
        <input
          type="text"
          value={captacaoToEdit.termoBusca}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              termoBusca: e.target.value,
            })
          }
        />


        <label>Exequente:</label>
        <input
          type="text"
          value={captacaoToEdit.exequente}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              exequente: e.target.value,
            })
          }
        />

        <label>Advogado:</label>
        <input
          type="text"
          value={captacaoToEdit.advogado}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              advogado: e.target.value,
            })
          }
        />

        <label>Data de Contato:</label>
        <input
          type="date"
          value={captacaoToEdit.dataContato}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              dataContato: e.target.value,
            })
          }
        />

        <label>Número do Imóvel:</label>
        <input
          type="text"
          value={captacaoToEdit.numeroImovel}
          onChange={(e) =>
            setCaptacaoToEdit({
              ...captacaoToEdit,
              numeroImovel: e.target.value,
            })
          }
        />
         <label>
          Ligação Frutífera:
          <select
            name="ligacao_frutifera"
            value={captacaoToEdit.tipoCaptação}
            onChange={(e) => setCaptacaoToEdit({ ...captacaoToEdit, tipoCaptação: e.target.value })}
          >
            <option value="sim">SIM</option>
            <option value="nao">NÃO</option>
          </select>
        </label>

         {/* Tipo de Captação */}
         <label>
          Tipo de Captação:
          <select
            name="tipoCaptação"
            value={captacaoToEdit.tipoCaptação}
            onChange={(e) => setCaptacaoToEdit({ ...captacaoToEdit, tipoCaptação: e.target.value })}
          >
            <option value="mediata">Mediata</option>
            <option value="imediata">Imediata</option>
          </select>
        </label>

        {/* Status */}
        <label>
          Status:
          <select
            name="status"
            value={captacaoToEdit.status}
            onChange={(e) => setCaptacaoToEdit({ ...captacaoToEdit, status: e.target.value })}
          >
            <option value="contatado">Contatado</option>
            <option value="captado">Captado</option>
            <option value="naoQuer">Não quer que o contate</option>
          </select>
        </label>

        {/* Campos que aparecem quando o status for "Captado" */}
        {captacaoToEdit.status === "captado" && (
          <>
            <label>
              Responsável:
              <input
                type="text"
                name="responsavel"
                value={captacaoToEdit.responsavel}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, responsavel: e.target.value })
                }
              />
            </label>
            <label>
              Nomenclatura Captada:
              <input
                type="text"
                name="nomenclaturaCaptada"
                value={captacaoToEdit.nomenclaturaCaptada}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, nomenclaturaCaptada: e.target.value })
                }
              />
            </label>
            <label>
              Contato da Pessoa Captada:
              <input
                type="text"
                name="contatoCaptado"
                value={captacaoToEdit.contatoCaptado}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, contatoCaptado: e.target.value })
                }
              />
            </label>
            <label>
              Data Captação:
              <input
                type="date"
                name="dataCaptacao"
                value={captacaoToEdit.dataCaptacao}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, dataCaptacao: e.target.value })
                }
              />
            </label>
            <label>
              Data Última Vista:
              <input
                type="date"
                name="dataUltimaVista"
                value={captacaoToEdit.dataUltimaVista}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, dataUltimaVista: e.target.value })
                }
              />
            </label>
            <label>
              Estado:
              <input
                type="text"
                name="estado"
                value={captacaoToEdit.estado}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, estado: e.target.value })
                }
              />
            </label>
            <label>
              Situação:
              <input
                type="text"
                name="situacao"
                value={captacaoToEdit.situacao}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, situacao: e.target.value })
                }
              />
            </label>
            <label>
              Juiz:
              <input
                type="text"
                name="juizo"
                value={captacaoToEdit.juizo}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, juizo: e.target.value })
                }
              />
            </label>
            <label>
              Valor da Ação/Advogado Constituído:
              <input
                type="text"
                name="valorAcao"
                value={captacaoToEdit.valorAcao}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, valorAcao: e.target.value })
                }
              />
            </label>
            <label>
              Cidade/Bairro:
              <input
                type="text"
                name="cidade"
                value={captacaoToEdit.cidade}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, cidade: e.target.value })
                }
              />
            </label>
            <label>
              Análise Viabilidade:
              <input
                type="text"
                name="analiseViabilidade"
                value={captacaoToEdit.analiseViabilidade}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, analiseViabilidade: e.target.value })
                }
              />
            </label>
            <label>
              Relatório:
              <textarea
                name="relatorio"
                value={captacaoToEdit.relatorio}
                onChange={(e) =>
                  setCaptacaoToEdit({ ...captacaoToEdit, relatorio: e.target.value })
                }
              />
            </label>
          </>
        )}

        <button type="submit">Salvar</button>
        <button type="button" onClick={handleCloseModal}>Cancelar</button>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default HomeCaptacao;
