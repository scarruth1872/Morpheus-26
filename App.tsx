
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QueryInput from './components/QueryInput';
import ResponseDisplay from './components/ResponseDisplay';
import AgentStateDisplay from './components/AgentStateDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import CpuBuilder from './components/CpuBuilder'; 
import { AgentState, ProcessQueryResult, CpuArchitectureDetails, CoreMaterial, ProtocolPhaseName } from './types';
import { INITIAL_AGENT_STATE, DEFAULT_CPU_ARCHITECTURE_DETAILS, CORE_MATERIAL_EFFICIENCY_MAP, PROTOCOL_PHASES_ORDERED } from './constants';
import { processQuery as callMorpheusApi } from './services/geminiService';
import { UserIcon, CogIcon } from './components/Icons'; 

const App: React.FC = () => {
  const [agentState, setAgentState] = useState<AgentState>(INITIAL_AGENT_STATE);
  const [customCpuConfig, setCustomCpuConfig] = useState<CpuArchitectureDetails>(DEFAULT_CPU_ARCHITECTURE_DETAILS);
  const [responseText, setResponseText] = useState<string>('');
  const [quantumSummary, setQuantumSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [isCpuBuilderOpen, setIsCpuBuilderOpen] = useState<boolean>(false);
  const [currentActiveProtocolPhase, setCurrentActiveProtocolPhase] = useState<ProtocolPhaseName | null>(ProtocolPhaseName.MYCELIAL_WEAVE); // Start at Phase 2

  const handleQuerySubmit = useCallback(async (query: string, context: string) => {
    setIsLoading(true);
    setError(null);
    setResponseText('');
    setQuantumSummary('');
    setCurrentQuery(query);

    try {
      const result: ProcessQueryResult = await callMorpheusApi(query, context, agentState, customCpuConfig);
      setResponseText(result.responseText);
      setAgentState(result.updatedAgentState);
      setQuantumSummary(result.quantumStateSummary);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [agentState, customCpuConfig]); 

  const handleResetAgent = useCallback(() => {
    const initialEfficiency = CORE_MATERIAL_EFFICIENCY_MAP[DEFAULT_CPU_ARCHITECTURE_DETAILS.coreCrystalMatrix.selectedMaterial] || 0.7;
    let bonusEfficiency = 0;
    DEFAULT_CPU_ARCHITECTURE_DETAILS.quartzResonanceNetwork.forEach(l => { if (l.enabled) bonusEfficiency += 0.01; });
    DEFAULT_CPU_ARCHITECTURE_DETAILS.piezoelectricLightNetworks.features.forEach(f => { if (f.enabled) bonusEfficiency += 0.01; });
    const finalInitialEfficiency = Math.max(0.5, Math.min(0.95, initialEfficiency + bonusEfficiency));

    setAgentState({
        ...INITIAL_AGENT_STATE,
        cpuEfficiencyFactor: finalInitialEfficiency
    });
    setCustomCpuConfig(DEFAULT_CPU_ARCHITECTURE_DETAILS); 
    setResponseText('');
    setCurrentQuery('');
    setQuantumSummary('');
    setError(null);
    setIsCpuBuilderOpen(false);
    setCurrentActiveProtocolPhase(ProtocolPhaseName.RESONANCE_CHAMBER); // Reset active phase to Phase 1
  }, []);

  const handleCpuConfigChange = (newConfig: CpuArchitectureDetails) => {
    setCustomCpuConfig(newConfig);
    const newEfficiency = CORE_MATERIAL_EFFICIENCY_MAP[newConfig.coreCrystalMatrix.selectedMaterial] || 0.7;
    let bonusEfficiency = 0;
    newConfig.quartzResonanceNetwork.forEach(l => { if (l.enabled) bonusEfficiency += 0.01; });
    newConfig.piezoelectricLightNetworks.features.forEach(f => { if (f.enabled) bonusEfficiency += 0.01; });
    const finalNewEfficiency = Math.max(0.5, Math.min(0.95, newEfficiency + bonusEfficiency));

    setAgentState(prev => ({...prev, cpuEfficiencyFactor: finalNewEfficiency }));
  };

  const handleNextPhase = useCallback(() => {
    setCurrentActiveProtocolPhase(prevPhase => {
      if (!prevPhase) return PROTOCOL_PHASES_ORDERED[0]; // Default to first if null
      const currentIndex = PROTOCOL_PHASES_ORDERED.indexOf(prevPhase);
      const nextIndex = (currentIndex + 1) % PROTOCOL_PHASES_ORDERED.length;
      return PROTOCOL_PHASES_ORDERED[nextIndex];
    });
  }, []);

  useEffect(() => {
    document.body.classList.add('bg-gray-900', 'text-gray-100', 'min-h-screen', 'flex', 'flex-col');
    return () => {
      document.body.classList.remove('bg-gray-900', 'text-gray-100', 'min-h-screen', 'flex', 'flex-col');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/40">
      <Header />
      <main data-testid="main-content-area" className="container mx-auto px-4 py-8 flex-grow w-full">
        <div data-testid="layout-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <section className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-gray-700/70">
              <button
                onClick={() => setIsCpuBuilderOpen(!isCpuBuilderOpen)}
                className="w-full flex items-center justify-between text-left text-lg font-medium text-lime-300 hover:text-lime-200 focus:outline-none mb-2 p-2 rounded-md hover:bg-gray-700/50 transition-colors"
                aria-expanded={isCpuBuilderOpen}
                aria-controls="cpu-builder-panel"
              >
                <div className="flex items-center">
                  <CogIcon className="w-5 h-5 mr-2" />
                  Conceptual CPU Configuration
                </div>
                <svg className={`w-5 h-5 transform transition-transform duration-200 ${isCpuBuilderOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCpuBuilderOpen && (
                <div id="cpu-builder-panel">
                  <CpuBuilder
                    currentConfig={customCpuConfig}
                    onConfigChange={handleCpuConfigChange}
                    defaultConfig={DEFAULT_CPU_ARCHITECTURE_DETAILS}
                  />
                </div>
              )}
            </section>

            <QueryInput onSubmit={handleQuerySubmit} onReset={handleResetAgent} isLoading={isLoading} />
            
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            
            {currentQuery && !isLoading && !error && (
               <div className="mt-4 p-4 bg-gray-800/50 rounded-lg shadow-md border border-gray-700/50">
                <h3 className="text-md font-semibold text-blue-300 mb-2 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-blue-400" />
                  Your Query:
                </h3>
                <p className="text-gray-300 italic">{currentQuery}</p>
              </div>
            )}
            {responseText && <ResponseDisplay responseText={responseText} quantumStateSummary={quantumSummary} />}
          </div>
          <div className="lg:col-span-1">
            <AgentStateDisplay 
              agentState={agentState} 
              cpuConfig={customCpuConfig}
              currentActiveProtocolPhase={currentActiveProtocolPhase}
              onAdvancePhase={handleNextPhase} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
