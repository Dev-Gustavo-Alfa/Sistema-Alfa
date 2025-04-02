import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../../styles/ControleCaptacao.css";

const dadosDiarios = [
  { data: "01/03", joao: 8, maria: 5, pedro: 3, ana: 6, lucas: 4 },
  { data: "02/03", joao: 6, maria: 7, pedro: 4, ana: 9, lucas: 2 },
  { data: "03/03", joao: 10, maria: 8, pedro: 5, ana: 4, lucas: 3 },
  { data: "04/03", joao: 12, maria: 6, pedro: 7, ana: 8, lucas: 5 },
  { data: "05/03", joao: 9, maria: 7, pedro: 8, ana: 5, lucas: 4 },
];

const captacoesMensais = [
  { nome: "João Silva", quantidade: 45 },
  { nome: "Maria Souza", quantidade: 33 },
  { nome: "Pedro Lima", quantidade: 27 },
  { nome: "Ana Costa", quantidade: 32 },
  { nome: "Lucas Melo", quantidade: 25 },
];

const ControleDeCaptacao = () => {
  return (
    <div className="controle-captacao-container">
      <h1 className="titulo">Controle de Captação</h1>
      
      <div className="metas">
        <div className="meta">Meta Diária: <strong>10</strong></div>
        <div className="meta">Meta Mensal: <strong>200</strong></div>
      </div>

      <h2 className="subtitulo">Captação Diária</h2>
      <div className="grafico-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosDiarios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="joao" fill="#4CAF50" radius={[5, 5, 0, 0]} name="João Silva" />
            <Bar dataKey="maria" fill="#FF9800" radius={[5, 5, 0, 0]} name="Maria Souza" />
            <Bar dataKey="pedro" fill="#2196F3" radius={[5, 5, 0, 0]} name="Pedro Lima" />
            <Bar dataKey="ana" fill="#F44336" radius={[5, 5, 0, 0]} name="Ana Costa" />
            <Bar dataKey="lucas" fill="#9C27B0" radius={[5, 5, 0, 0]} name="Lucas Melo" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="subtitulo">Captação Mensal</h2>
      <div className="grafico-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={captacoesMensais}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#4CAF50" radius={[5, 5, 0, 0]} name="Captações Mensais" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="subtitulo">Captação por Colaborador</h2>
      <table className="tabela-captacao">
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Captações</th>
          </tr>
        </thead>
        <tbody>
          {captacoesMensais.map((colaborador, index) => (
            <tr key={index}>
              <td>{colaborador.nome}</td>
              <td>{colaborador.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ControleDeCaptacao;
