import React, { useState } from 'react';
import axios from 'axios';

function CaptacaoForm() {
    const [nome, setNome] = useState('');
    const [numeroProcesso, setNumeroProcesso] = useState('');
    const [dataInicio, setDataInicio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/captacao', {
                nome,
                numero_processo: numeroProcesso,
                data_inicio: dataInicio,
            });
            alert('Captação criada com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao criar captação');
        }
    };

    return (
        <div>
            <h2>Criar Captação</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Número do Processo:</label>
                    <input
                        type="text"
                        value={numeroProcesso}
                        onChange={(e) => setNumeroProcesso(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data de Início:</label>
                    <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Criar Captação</button>
            </form>
        </div>
    );
}

export default CaptacaoForm;
