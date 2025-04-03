import React, { useState } from "react";
import "../../styles/SolicitacoesInternas.css";
import axios from "axios"; // Importando axios para fazer requisições HTTP

const SolicitacoesInternas = () => {
    const [formData, setFormData] = useState({
        vara: "",
        foro: "",
        juiz: "",
        captante: "",
        dataCaptacao: "",
        nomeExequente: "",
        nomeAdvogado: "",
        observacoes: "",
        tipoBem: "movel",
        tipoMovel: "veiculo",
        avaliacao: "",
        dadosVeiculo: "",
        prioridade: "",
        dataEntrega: "",
        documento: null,
        busca: "", // Adicionando estado para a busca
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? e.target.files[0] : value,
        });
    };

    // Função para realizar a busca
    const handleSearch = async () => {
        if (!formData.busca) return;
        console.log("Busca realizada para:", formData.busca);  // Verifique se isso aparece no console
        try {
            // Alterando a URL para refletir a nova rota
            const response = await axios.get(`http://localhost:3001/api/buscar/${formData.busca}`);
            console.log("Resultado da busca:", response.data);
        } catch (error) {
            console.error("Erro ao realizar busca:", error);
        }
    };

    // Função para enviar os dados do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulário enviado:", formData);  // Verificar os dados do formulário antes de enviar
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
    
            const response = await axios.post("http://localhost:3001/api/solicitacao", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Solicitação enviada:", response.data);  // Verificar a resposta da solicitação
        } catch (error) {
            console.error("Erro ao enviar solicitação:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Nova Solicitação Interna</h2>
            <form onSubmit={handleSubmit}>
                {/* Campo de busca */}
                <div className="search-container">
                    <input
                        type="text"
                        name="busca"
                        value={formData.busca}
                        placeholder="Buscar processo"
                        onChange={handleChange}
                        onBlur={handleSearch} // Busca ao sair do campo
                    />
                </div>

                <div className="grid-container">
                    <input type="text" name="vara" placeholder="Vara" onChange={handleChange} />
                    <input type="text" name="foro" placeholder="Foro" onChange={handleChange} />
                    <input type="text" name="juiz" placeholder="Juiz" onChange={handleChange} />
                    <input type="text" name="captante" placeholder="Captante" onChange={handleChange} />
                    <input type="date" name="dataCaptacao" onChange={handleChange} />
                    <input type="text" name="nomeExequente" placeholder="Nome do Exequente" onChange={handleChange} />
                    <input type="text" name="nomeAdvogado" placeholder="Nome do Advogado" onChange={handleChange} />
                </div>

                <div className="radio-group">
                    <label>
                        <input type="radio" name="tipoBem" value="movel" checked={formData.tipoBem === "movel"} onChange={handleChange} />
                        Móvel
                    </label>
                    <label>
                        <input type="radio" name="tipoBem" value="imovel" checked={formData.tipoBem === "imovel"} onChange={handleChange} />
                        Imóvel
                    </label>
                </div>

                {formData.tipoBem === "imovel" && (
                    <div className="imovel-container">
                        <h3>Imóvel</h3>
                        <div className="grid-container">
                            <input type="text" name="relatorio_comparativo" placeholder="Relatório Comparativo" onChange={handleChange} />
                            <input type="text" name="avaliacao_particular" placeholder="Avaliação Particular" onChange={handleChange} />
                            <input type="text" name="analise_de_matricula" placeholder="Análise de Matrícula" onChange={handleChange} />
                            
                            {/* Campo de seleção para prioridade */}
                            <select name="prioridade" onChange={handleChange}>
                                <option value="">Selecione a Prioridade</option>
                                <option value="Alta">Alta</option>
                                <option value="Média">Média</option>
                                <option value="Baixa">Baixa</option>
                            </select>

                            <input type="date" name="dataEntrega" onChange={handleChange} />
                        </div>
                        <div className="file-upload">
                            <label>Relatório Comparativo</label>
                            <input type="file" name="documento" onChange={handleChange} />
                        </div>
                        <div className="file-upload">
                            <label>Documentos do Imóvel</label>
                            <input type="file" name="documento" onChange={handleChange} />
                        </div>
                        <textarea name="observacoes" placeholder="Observações" onChange={handleChange}></textarea>
                    </div>
                )}

                {formData.tipoBem === "movel" && (
                    <div className="movel-container">
                        <h3>Tipo de Móvel</h3>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="tipoMovel" value="veiculo" checked={formData.tipoMovel === "veiculo"} onChange={handleChange} />
                                Veículo
                            </label>
                            <label>
                                <input type="radio" name="tipoMovel" value="outros" checked={formData.tipoMovel === "outros"} onChange={handleChange} />
                                Outros bens
                            </label>
                        </div>

                        {formData.tipoMovel === "veiculo" && (
                            <div className="grid-container">
                                <input type="text" name="avaliacao" placeholder="Avaliação" onChange={handleChange} />
                                <input type="text" name="dadosVeiculo" placeholder="Dados do Veículo" onChange={handleChange} />

                                {/* Campo de seleção para prioridade */}
                                <select name="prioridade" onChange={handleChange}>
                                    <option value="">Selecione a Prioridade</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </select>

                                <input type="date" name="dataEntrega" onChange={handleChange} />
                            </div>
                        )}

                        {formData.tipoMovel === "outros" && (
                            <div className="grid-container">
                                {/* Apenas os campos necessários para "outros bens" */}
                                <select name="prioridade" onChange={handleChange}>
                                    <option value="">Selecione a Prioridade</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </select>

                                <input type="date" name="dataEntrega" onChange={handleChange} />
                                <textarea name="observacoes" placeholder="Observações" onChange={handleChange}></textarea>
                            </div>
                        )}

                        {formData.tipoMovel === "veiculo" && (
                            <div className="file-upload">
                                <label>Documentos do Veículo</label>
                                <input type="file" name="documento" onChange={handleChange} />
                            </div>
                        )}
                    </div>
                )}

                <button type="submit" className="submit-button">Enviar</button>
            </form>
        </div>
    );
};

export default SolicitacoesInternas;
