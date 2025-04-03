import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useUser } from "../context/UserContext";
import "../../styles/ControleCaptacao.css";

const ControleDeCaptacao = ({ isAdmin }) => {
  const { user } = useUser(); // Usando o hook useUser corretamente
  const [metas, setMetas] = useState({ diaria: 0, mensal: 0 });
  const [captacoes, setCaptacoes] = useState({
    imediatasDiarias: [],
    mediatasDiarias: [],
    imediatasMensais: [],
    mediatasMensais: [],
  });

  useEffect(() => {
    axios.get("/api/metas").then((res) => setMetas(res.data));
    axios.get("/api/captacoes").then((res) => setCaptacoes(res.data));
  }, []);

  const handleMetaChange = (tipo, valor) => {
    setMetas((prev) => ({ ...prev, [tipo]: valor }));
  };

  const salvarMetas = () => {
    axios.put("/api/metas", metas).then(() => alert("Metas atualizadas!"));
  };

  return (
    <div className="controle-captacao-container">
      <h1 className="titulo">Controle de Captação</h1>
      <div className="metas">
        <div className="meta">
          Meta Diária: {isAdmin ? (
            <input type="number" value={metas.diaria} onChange={(e) => handleMetaChange("diaria", e.target.value)} />
          ) : (
            <strong>{metas.diaria}</strong>
          )}
        </div>
        <div className="meta">
          Meta Mensal: {isAdmin ? (
            <input type="number" value={metas.mensal} onChange={(e) => handleMetaChange("mensal", e.target.value)} />
          ) : (
            <strong>{metas.mensal}</strong>
          )}
        </div>
      </div>
      {isAdmin && <button onClick={salvarMetas}>Salvar Metas</button>}

      <h2 className="subtitulo">Captação Diária - Imediatas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={captacoes.imediatasDiarias}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey={user?.nome} fill="#4CAF50" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="subtitulo">Captação Diária - Mediatas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={captacoes.mediatasDiarias}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey={user?.nome} fill="#FF9800" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="subtitulo">Captação Mensal - Imediatas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={captacoes.imediatasMensais}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#2196F3" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="subtitulo">Captação Mensal - Mediatas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={captacoes.mediatasMensais}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#F44336" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ControleDeCaptacao;