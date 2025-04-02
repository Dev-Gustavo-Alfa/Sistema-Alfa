import React, { useState } from "react";
import axios from "axios"; // Importa o axios
import "../../styles/CaptacaoDiaria.css";

const CaptacaoDiaria = () => {
  const [formData, setFormData] = useState({
    processo: "",
    vara: "",
    juiz: "",
    foro: "",
    termoBusca: "",
    tipoCaptacao: "mediata",
    exequente: "",
    advogado: "",
    dataContato: "",
    numeroImovel: "",
    status: "",
    observacoes: "",
    responsavel: "",
    nomenclaturaCaptada: "",
    contatoCaptado: "",
    dataCaptacao: "",
    dataUltimaVista: "",
    estado: "",
    situacao: "",
    valorAcao: "",
    cidade: "",
    bairro: "",
    analiseViabilidade: "",
    relatorio: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked ? value : ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados para o backend
      const response = await axios.post("http://localhost:3001/api/captacao", formData);
      console.log('Dados enviados com sucesso:', response.data);
      
      // Resposta do servidor (opcional para feedback ao usuário)
      if (response.status === 200) {
        alert("Captação registrada com sucesso!");
        // Limpar o formulário após o envio
        setFormData({
          processo: "",
          vara: "",
          juiz: "",
          foro: "",
          termoBusca: "",
          tipoCaptacao: "mediata",
          exequente: "",
          advogado: "",
          dataContato: "",
          numeroImovel: "",
          status: "",
          observacoes: "",
          responsavel: "",
          nomenclaturaCaptada: "",
          contatoCaptado: "",
          dataCaptacao: "",
          dataUltimaVista: "",
          estado: "",
          situacao: "",
          valorAcao: "",
          cidade: "",
          bairro: "",
          analiseViabilidade: "",
          relatorio: ""
        });
      } else {
        alert("Erro ao registrar a captação.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o backend:", error);
      alert("Houve um erro ao enviar os dados.");
    }
  };

  return (
    <div className="captacao-container">
      <h2>Captação Diária</h2>
      <form onSubmit={handleSubmit}>
        <label>Nº do Processo: <input type="text" name="processo" value={formData.processo} onChange={handleChange} required /></label>
        <label>Vara: <input type="text" name="vara" value={formData.vara} onChange={handleChange} /></label>
        <label>Juiz: <input type="text" name="juiz" value={formData.juiz} onChange={handleChange} /></label>
        <label>Foro: <input type="text" name="foro" value={formData.foro} onChange={handleChange} /></label>
        <label>Contato:<input type="text" name="contato" value={formData.contato} onChange={handleChange} /></label>
        <label>Termo de Busca: <input type="text" name="termoBusca" value={formData.termoBusca} onChange={handleChange} /></label>

        {/* Tipo de Captação com radio buttons */}
        <label>Tipo de Captação:</label>
        <div>
          <label>
            <input
              type="radio"
              name="tipoCaptacao"
              value="mediata"
              checked={formData.tipoCaptacao === "mediata"}
              onChange={handleChange}
            />
            Mediata
          </label>
          <label>
            <input
              type="radio"
              name="tipoCaptacao"
              value="imediata"
              checked={formData.tipoCaptacao === "imediata"}
              onChange={handleChange}
            />
            Imediata
          </label>
        </div>

        <label>Exequente: <input type="text" name="exequente" value={formData.exequente} onChange={handleChange} /></label>
        <label>Nome do Advogado/Escritório: <input type="text" name="advogado" value={formData.advogado} onChange={handleChange} /></label>
        <label>Data do Contato: <input type="date" name="dataContato" value={formData.dataContato} onChange={handleChange} required /></label>
        <label>Número do Imóvel: <input type="text" name="numeroImovel" value={formData.numeroImovel} onChange={handleChange} /></label>

        {/* Status com radio buttons */}
        <label>Status:</label>
        <div>
          <label>
            <input
              type="radio"
              name="status"
              value="contatado"
              checked={formData.status === "contatado"}
              onChange={handleChange}
            />
            Contatado
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="captado"
              checked={formData.status === "captado"}
              onChange={handleChange}
            />
            Captado
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="nao_contatar"
              checked={formData.status === "nao_contatar"}
              onChange={handleChange}
            />
            Não quer que o contate
          </label>
        </div>

        {formData.status === "captado" && (
          <>
            <label>Responsável: <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} /></label>
            <label>Nomenclatura Captada: <input type="text" name="nomenclaturaCaptada" value={formData.nomenclaturaCaptada} onChange={handleChange} /></label>
            <label>Contato da Pessoa Captada: <input type="text" name="contatoCaptado" value={formData.contatoCaptado} onChange={handleChange} /></label>
            <label>Data Captação: <input type="date" name="dataCaptacao" value={formData.dataCaptacao} onChange={handleChange} /></label>
            <label>Data Última Vista: <input type="date" name="dataUltimaVista" value={formData.dataUltimaVista} onChange={handleChange} /></label>
            <label>Estado: <input type="text" name="estado" value={formData.estado} onChange={handleChange} /></label>
            <label>Situação: <input type="text" name="situacao" value={formData.situacao} onChange={handleChange} /></label>
            <label>Juiz:<input type="text" name="juizo" value={formData.juizo} onChange={handleChange} /></label>
            <label>Valor da Ação/Advogado Constituido: <input type="text" name="valorAcao" value={formData.valorAcao} onChange={handleChange} /></label>
            <label>Cidade/Bairro: <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} /></label>
            <label>Análise Viabilidade: <input type="text" name="analiseViabilidade" value={formData.analiseViabilidade} onChange={handleChange} /></label>
            <label>Relatório: <textarea name="relatorio" value={formData.relatorio} onChange={handleChange} /></label>
          </>
        )}

        <label>Observações: <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} /></label>
        <button type="submit" class="btn-cadastrar">Cadastrar Captação</button>
        <button type="button" class="btn-cancelar">Cancelar Captação</button>

      </form>
    </div>
  );
};

export default CaptacaoDiaria;
