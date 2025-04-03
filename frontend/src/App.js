import React, { useState } from 'react';
import './styles/App.css';
import CaptacaoDiarias from './components/Captacao/CaptacaoDiarias';
import ControleDeCaptacao from './components/Captacao/ControleDeCaptacao';
import SolicitacoesInternas from './components/Captacao/SolicitacoesInternas';
import ControleDeJuizes from './components/Captacao/ControleDeJuizes';
import Resultados from './components/Captacao/Resultados';
import AvaliacaoForm from './components/Avaliacao/AvaliacaoForm';
import AvaliacaoResultados from './components/Avaliacao/AvaliacaoResultados';
import JuridicoForm from './components/Juridico/JuridicoForm';
import JuridicoResultados from './components/Juridico/JuridicoResultados';
import CaptacaoNova from './components/Captacao/CaptacaoNova';
import HomeCaptacao from './components/Captacao/HomeCaptacao';
import { UserProvider } from "./components/context/UserContext"; // Corrigido aqui
import Login from './components/Login/Login';

const App = () => {
    const [activeTab, setActiveTab] = useState('captacao');
    const [activeSubTab, setActiveSubTab] = useState('captacao_diarias');

    const renderTabContent = () => {
        if (activeTab === 'captacao') {
            switch (activeSubTab) {
                case 'homecaptacao': return <HomeCaptacao />;
                case 'captacao_diarias': return <CaptacaoDiarias />;
                case 'controle_de_captação': return <ControleDeCaptacao />;
                case 'solicitacoes_internas': return <SolicitacoesInternas />;
                case 'controle_de_juizes': return <ControleDeJuizes />;
                case 'resultados': return <Resultados />;
                case 'captacao_nova': return <CaptacaoNova />;
                case 'login': return <Login />;
                default: return null;
            }
        } else if (activeTab === 'avaliacao') {
            return activeSubTab === 'avaliacao_form' ? <AvaliacaoForm /> : <AvaliacaoResultados />;
        } else if (activeTab === 'juridico') {
            return activeSubTab === 'juridico_form' ? <JuridicoForm /> : <JuridicoResultados />;
        }
    };

    return (
        <UserProvider> {/* Agora o contexto está disponível para todos os componentes */}
            <div className="container">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'captacao' ? 'active' : ''}`}
                        onClick={() => setActiveTab('captacao')}
                    >
                        Captação
                    </div>
                    <div
                        className={`tab ${activeTab === 'avaliacao' ? 'active' : ''}`}
                        onClick={() => setActiveTab('avaliacao')}
                    >
                        Avaliação
                    </div>
                    <div
                        className={`tab ${activeTab === 'juridico' ? 'active' : ''}`}
                        onClick={() => setActiveTab('juridico')}
                    >
                        Jurídico
                    </div>
                    <div
                        className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                       Login
                    </div>
                </div>

                <div className="sub-tabs-container">
                    {activeTab === 'captacao' && (
                        <>
                            <div
                                className={`sub-tab ${activeSubTab === 'homecaptacao' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('homecaptacao')}
                            >
                                Home Captação
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'captacao_diarias' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('captacao_diarias')}
                            >
                                Captação Diárias
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'controle_de_captação' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('controle_de_captação')}
                            >
                                Controle de Captação
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'solicitacoes_internas' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('solicitacoes_internas')}
                            >
                                Solicitações Internas
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'controle_de_juizes' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('controle_de_juizes')}
                            >
                                Controle de Juízes
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'resultados' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('resultados')}
                            >
                                Resultados
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'captacao_nova' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('captacao_nova')}
                            >
                                Nova Captação
                            </div>
                        </>
                    )}

                    {activeTab === 'avaliacao' && (
                        <>
                            <div
                                className={`sub-tab ${activeSubTab === 'avaliacao_form' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('avaliacao_form')}
                            >
                                Avaliação Formulário
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'avaliacao_resultados' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('avaliacao_resultados')}
                            >
                                Resultados da Avaliação
                            </div>
                        </>
                    )}

                    {activeTab === 'juridico' && (
                        <>
                            <div
                                className={`sub-tab ${activeSubTab === 'juridico_form' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('juridico_form')}
                            >
                                Jurídico Formulário
                            </div>
                            <div
                                className={`sub-tab ${activeSubTab === 'juridico_resultados' ? 'active' : ''}`}
                                onClick={() => setActiveSubTab('juridico_resultados')}
                            >
                                Resultados Jurídicos
                            </div>
                        </>
                    )}
                </div>

                <div className="tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </UserProvider>
    );
};

export default App;
