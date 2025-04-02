import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CaptacaoList() {
    const [captacoes, setCaptacoes] = useState([]);

    const fetchCaptacoes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/captacao');
            setCaptacoes(response.data);
        } catch (err) {
            console.error('Erro ao buscar captações', err);
        }
    };

    const updateStatus = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/captacao/${id}`);
            fetchCaptacoes();  // Atualizar a lista após a atualização
            alert('Status atualizado para "captado"');
        } catch (err) {
            console.error('Erro ao atualizar captação', err);
            alert('Erro ao atualizar status');
        }
    };

    useEffect(() => {
        fetchCaptacoes();
    }, []);

    return (
        <div>
            <h2>Lista de Captações</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Número do Processo</th>
                        <th>Data de Início</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {captacoes.map((captacao) => (
                        <tr key={captacao.id}>
                            <td>{captacao.nome}</td>
                            <td>{captacao.numero_processo}</td>
                            <td>{captacao.data_inicio}</td>
                            <td>{captacao.status}</td>
                            <td>
                                {captacao.status !== 'captado' && (
                                    <button onClick={() => updateStatus(captacao.id)}>
                                        Marcar como Captado
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CaptacaoList;
