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

const App = () => {
    const [activeTab, setActiveTab] = useState('captacao');
    const [activeSubTab, setActiveSubTab] = useState('captacao_diarias');

    const renderTabContent = () => {
        if (activeTab === 'captacao') {
            if (activeSubTab === 'homecaptacao') {
                return <HomeCaptacao />;
            }
              else if (activeSubTab === 'captacao_diarias') {
                return <CaptacaoDiarias />;
            } else if (activeSubTab === 'controle_de_captação') {
                return <ControleDeCaptacao />;
            } else if (activeSubTab === 'solicitacoes_internas') {
                return <SolicitacoesInternas />;
            } else if (activeSubTab === 'controle_de_juizes') {
                return <ControleDeJuizes />;
            } else if (activeSubTab === 'resultados') {
                return <Resultados />;
            } else if (activeSubTab === 'captacao_nova') {
                return <CaptacaoNova />;
            }
        } else if (activeTab === 'avaliacao') {
            if (activeSubTab === 'avaliacao_form') {
                return <AvaliacaoForm />;
            } else if (activeSubTab === 'avaliacao_resultados') {
                return <AvaliacaoResultados />;
            }
        } else if (activeTab === 'juridico') {
            if (activeSubTab === 'juridico_form') {
                return <JuridicoForm />;
            } else if (activeSubTab === 'juridico_resultados') {
                return <JuridicoResultados />;
            }
        }
    };

    return (
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
    );
};

export default App;
