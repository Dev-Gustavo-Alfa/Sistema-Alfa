import React, { useState } from 'react';
import axios from 'axios';

function IndicarForm() {
    const [captacaoId, setCaptacaoId] = useState('');
    const [nomeIndicado, setNomeIndicado] = useState('');
    const [dataIndicacao, setDataIndicacao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/indicar', {
                captacao_id: captacaoId,
                nome_indicado: nomeIndicado,
                data_indicacao: dataIndicacao,
            });
            alert('Indicação registrada com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao registrar indicação');
        }
    };

    return (
        <div>
            <h2>Registrar Indicação</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID da Captação:</label>
                    <input
                        type="text"
                        value={captacaoId}
                        onChange={(e) => setCaptacaoId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nome do Indicado:</label>
                    <input
                        type="text"
                        value={nomeIndicado}
                        onChange={(e) => setNomeIndicado(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data de Indicação:</label>
                    <input
                        type="date"
                        value={dataIndicacao}
                        onChange={(e) => setDataIndicacao(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar Indicação</button>
            </form>
        </div>
    );
}

export default IndicarForm;
