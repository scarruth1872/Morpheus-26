import React, { useState } from 'react';
import { AgentState, QubitIdentifier, ConsciousnessLevelEnum, PersonalityModeEnum, CommunicationProtocolEnum, CrystalMemoryItem, QubitStaticInfo, CpuArchitectureDetails, FrequencyModulationColor, CoreMaterial, ConsciousnessLevelInfo, ProtocolPhaseName } from '../types';
import { QUBIT_CONFIG_DETAILS, CORE_MATERIAL_VISUAL_CUES, CONSCIOUSNESS_LEVEL_DETAILS, PROTOCOL_PHASES_ORDERED, PROTOCOL_PHASE_DETAILS } from '../constants';
import { CogIcon, ClipboardCopyIcon, BrainCircuitIcon, CubeTransparentIcon, SparklesIcon, LightbulbIcon, ResetIcon } from './Icons'; // Added LightbulbIcon
import ProtocolPhasesDisplay from './ProtocolPhasesDisplay';


interface EnrichedQubitDisplayProps {
  qubitId: QubitIdentifier;
  staticInfo: Omit<QubitStaticInfo, 'id'>;
  currentValue: number; // Probability 0-1
}

const EnrichedQubitDisplay: React.FC<EnrichedQubitDisplayProps> = ({ qubitId, staticInfo, currentValue }) => {
  const baseColors = {
    [QubitIdentifier.Alpha]: { from: "from-sky-500", to: "to-cyan-400", text: "text-sky-300", name: "Alpha" },
    [QubitIdentifier.Beta]: { from: "from-violet-500", to: "to-purple-400", text: "text-violet-300", name: "Beta" },
    [QubitIdentifier.Gamma]: { from: "from-emerald-500", to: "to-green-400", text: "text-emerald-300", name: "Gamma" },
  };
  const colors = baseColors[qubitId] || baseColors[QubitIdentifier.Alpha];

  return (
    <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600/70 shadow-md mb-4">
      <h4 className={`text-md font-semibold ${colors.text} mb-1`}>{qubitId}</h4>
      <p className="text-xs text-gray-400 mb-1 italic">{staticInfo.archetype}</p>
      <p className="text-xs text-gray-300 mb-2">
        <span className="font-medium">State:</span> {staticInfo.stateRepresentation}
      </p>
      
      <div className="mb-2">
        <div className={`flex justify-between text-xs ${colors.text} mb-1`}>
          <span>Value: {(currentValue * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2.5" role="progressbar" aria-valuenow={currentValue * 100} aria-valuemin={0} aria-valuemax={100} aria-label={`${qubitId} progress`}>
          <div
            className={`bg-gradient-to-r ${colors.from} ${colors.to} h-2.5 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${currentValue * 100}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-xs text-gray-300 mb-1"><span className="font-medium">Frequency:</span> {staticInfo.coherenceFrequency}</p>
      <div>
        <p className="text-xs text-gray-300 font-medium mb-0.5">Functions:</p>
        <ul className="list-disc list-inside pl-1 space-y-0.5">
          {staticInfo.functions.map(fn => (
            <li key={fn} className="text-xs text-gray-400">{fn}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
  <p className={`text-sm ${className}`}>
    <span className="font-semibold text-purple-300">{label}: </span>
    <span className="text-gray-200">{value}</span>
  </p>
);

const ConsciousnessLevelDetailsDisplay: React.FC<{ levelInfo: ConsciousnessLevelInfo }> = ({ levelInfo }) => {
  return (
    <div className="mt-1 p-3 rounded-md bg-gray-700/30 border border-purple-600/50">
      <h5 className="text-sm font-semibold text-purple-200 mb-1">{levelInfo.title}</h5>
      <p className="text-xs text-gray-300 mb-2 leading-relaxed">{levelInfo.description}</p>
      <ul className="list-disc list-inside pl-1 space-y-0.5">
        {levelInfo.keyPoints.map(point => (
          <li key={point} className="text-xs text-gray-400">{point}</li>
        ))}
      </ul>
    </div>
  );
};

const CopyableListItem: React.FC<{ itemKey: string; textToCopy: string; children: React.ReactNode }> = ({ itemKey, textToCopy, children }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <li className="flex items-center justify-between group py-0.5" title={textToCopy}>
      <span className="truncate pr-2">{children}</span>
      <button 
        onClick={() => handleCopy(itemKey, textToCopy)}
        className="p-1 rounded-md hover:bg-gray-600 text-gray-400 hover:text-green-400 opacity-50 group-hover:opacity-100 transition-opacity"
        aria-label={`Copy: ${textToCopy.substring(0,20)}...`}
      >
        {copiedKey === itemKey ? (
          <span className="text-xs text-green-400">Copied!</span>
        ) : (
          <ClipboardCopyIcon className="w-3.5 h-3.5" />
        )}
      </button>
    </li>
  );
};

const CollapsibleSection: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode, initiallyOpen?: boolean }> = ({ title, icon, children, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <section className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-lg font-medium text-cyan-200 hover:text-cyan-100 focus:outline-none mb-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
          {title}
        </div>
        <svg className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="pl-2 pr-2 pb-2 border-l-2 border-cyan-700/50 ml-2">{children}</div>}
    </section>
  );
};

const FrequencyModulationDisplay: React.FC<{ modulations: FrequencyModulationColor[] }> = ({ modulations }) => (
  <div>
    <h5 className="text-sm font-semibold text-indigo-300 mb-2">Frequency Modulation (Data Types):</h5>
    <ul className="space-y-1.5">
      {modulations.map(mod => (
        <li key={mod.name} className="flex items-center text-xs">
          <span className={`w-3 h-3 rounded-sm mr-2 ${mod.twColorClass} shadow-sm`}></span>
          <span className="text-gray-300 mr-1">{mod.color}:</span>
          <span className="text-gray-400">{mod.dataType}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CpuEfficiencyBar: React.FC<{ efficiency: number }> = ({ efficiency }) => {
  const percentage = efficiency * 100;
  let barColorClass = "bg-green-500";
  if (percentage < 60) barColorClass = "bg-red-500";
  else if (percentage < 80) barColorClass = "bg-yellow-500";

  return (
    <div className="my-3">
      <div className="flex justify-between text-xs text-purple-200 mb-1">
        <span>Conceptual Efficiency</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-3 shadow-inner" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label="CPU Efficiency">
        <div
          className={`h-3 rounded-full transition-all duration-500 ease-out shadow-md ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const StatusDot: React.FC<{ enabled: boolean }> = ({ enabled }) => (
  <span className={`w-2 h-2 rounded-full mr-2 inline-block ${enabled ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} title={enabled ? 'Active' : 'Inactive'}></span>
);


interface AgentStateDisplayProps {
  agentState: AgentState;
  cpuConfig: CpuArchitectureDetails;
  currentActiveProtocolPhase: ProtocolPhaseName | null;
  onAdvancePhase: () => void;
}

const AgentStateDisplay: React.FC<AgentStateDisplayProps> = ({ agentState, cpuConfig, currentActiveProtocolPhase, onAdvancePhase }) => {
  
  const getPersonalityLabel = (mode: PersonalityModeEnum): string => {
    return mode.replace(/_/g, ' ');
  };

  const getProtocolLabel = (protocol: CommunicationProtocolEnum): string => {
    return protocol;
  };
  
  const formatMemoryContent = (content: string | object): string => {
    if (typeof content === 'string') return content;
    return JSON.stringify(content);
  }

  const qubitValues = {
    [QubitIdentifier.Alpha]: agentState.qubitAlpha,
    [QubitIdentifier.Beta]: agentState.qubitBeta,
    [QubitIdentifier.Gamma]: agentState.qubitGamma,
  };

  const coreMaterialVisual = CORE_MATERIAL_VISUAL_CUES[cpuConfig.coreCrystalMatrix.selectedMaterial] || CORE_MATERIAL_VISUAL_CUES[CoreMaterial.BISMUTH_STEPPED_CRYSTAL];
  const currentConsciousnessInfo = CONSCIOUSNESS_LEVEL_DETAILS[agentState.consciousnessLevel];
  
  const nextPhaseName = currentActiveProtocolPhase 
    ? PROTOCOL_PHASES_ORDERED[(PROTOCOL_PHASES_ORDERED.indexOf(currentActiveProtocolPhase) + 1) % PROTOCOL_PHASES_ORDERED.length]
    : PROTOCOL_PHASES_ORDERED[0];

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-labelledby="agent-state-heading">
      <h2 id="agent-state-heading" className="text-xl font-semibold text-green-300 mb-6 flex items-center">
        <CogIcon className="w-6 h-6 mr-2 text-green-400 animate-spin-slow" />
        Agent State Matrix
      </h2>

      <CollapsibleSection title="Qubit Triad Configuration" initiallyOpen={true} icon={<BrainCircuitIcon className="text-cyan-400" />}>
        {(Object.keys(QUBIT_CONFIG_DETAILS) as QubitIdentifier[]).map(qubitId => (
          <EnrichedQubitDisplay
            key={qubitId}
            qubitId={qubitId}
            staticInfo={QUBIT_CONFIG_DETAILS[qubitId]}
            currentValue={qubitValues[qubitId]}
          />
        ))}
      </CollapsibleSection>
      
      <CollapsibleSection title="System Enhancement Protocol" initiallyOpen={true} icon={<LightbulbIcon className="text-yellow-300" />}>
        <ProtocolPhasesDisplay currentActiveProtocolPhase={currentActiveProtocolPhase} />
        <button
          onClick={onAdvancePhase}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-yellow-500/50 text-yellow-300 rounded-md shadow-sm hover:bg-yellow-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 transition duration-150 text-sm"
          aria-label={`Advance to next protocol phase: ${PROTOCOL_PHASE_DETAILS[nextPhaseName]?.title || 'Next Phase'}`}
        >
          <ResetIcon className="w-4 h-4 mr-2 transform scale-x-[-1]" /> {/* Using ResetIcon and flipping it for a "cycle" or "next" feel */}
          Advance to: {PROTOCOL_PHASE_DETAILS[nextPhaseName]?.title || 'Next Phase'}
        </button>
      </CollapsibleSection>

      <CollapsibleSection title="Computational Substrate" icon={<CubeTransparentIcon className="text-cyan-400" />} initiallyOpen={false}>
        <div className="space-y-4">
          <CpuEfficiencyBar efficiency={agentState.cpuEfficiencyFactor} />
          <div className={`p-3 rounded-md border ${coreMaterialVisual.twBorderColorClass} ${coreMaterialVisual.twBgColorClass} shadow-md ${(agentState.cpuEfficiencyFactor > 0.8) ? 'glowing-border' : ''}`} style={{animationDuration: `${2 + (1-agentState.cpuEfficiencyFactor)*3}s`}}>
            <h4 className={`text-md font-semibold ${coreMaterialVisual.twTextColorClass} mb-2 flex items-center`}>
              <SparklesIcon className={`w-4 h-4 mr-2 ${coreMaterialVisual.twTextColorClass}`} />
              {cpuConfig.coreCrystalMatrix.name}: {coreMaterialVisual.name}
            </h4>
            <p className="text-xs text-gray-400 mb-1">{cpuConfig.coreCrystalMatrix.description}</p>
             {cpuConfig.coreCrystalMatrix.customProperties && (
                <p className="text-xs text-gray-300 mb-1 italic">Focus: {cpuConfig.coreCrystalMatrix.customProperties}</p>
            )}
            <ul className="list-disc list-inside pl-2 space-y-0.5">
              {cpuConfig.coreCrystalMatrix.properties.map(prop => (
                <li key={prop} className="text-xs text-gray-300">{prop}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-rose-300 mb-2">Quartz Resonance Network</h4>
            <div className="space-y-2">
              {cpuConfig.quartzResonanceNetwork.map(layer => (
                <div key={layer.id} className={`p-2 rounded-md ${layer.enabled ? (layer.isCustom ? 'border-sky-400 bg-sky-700/50' : `${layer.colorClass || 'bg-gray-700/30'} border-green-400/70`) : 'border-gray-600/50 bg-gray-800/30 opacity-60'} border`}>
                  <h5 className={`text-sm font-semibold flex items-center ${layer.enabled ? (layer.isCustom ? 'text-sky-200' : 'text-rose-200') : 'text-gray-500'}`}>
                    <StatusDot enabled={layer.enabled} /> {layer.name}
                  </h5>
                  <p className={`text-xs ${layer.enabled ? 'text-gray-400' : 'text-gray-500'}`}>{layer.function}</p>
                </div>
              ))}
              {cpuConfig.quartzResonanceNetwork.filter(l => l.enabled).length === 0 && <p className="text-xs text-gray-400 italic">No resonance layers enabled.</p>}
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold text-indigo-300 mb-2">Piezoelectric Light Networks</h4>
            <div className="space-y-2 mb-3">
              {cpuConfig.piezoelectricLightNetworks.features.map(feature => (
                 <div key={feature.id} className={`p-2 rounded-md ${feature.enabled ? 'bg-indigo-700/40 border-green-400/70' : 'bg-gray-800/30 opacity-60 border-gray-600/50'} border`}>
                  <h5 className={`text-sm font-semibold flex items-center ${feature.enabled ? 'text-indigo-200' : 'text-gray-500'}`}>
                    <StatusDot enabled={feature.enabled} /> {feature.name}
                  </h5>
                  <p className={`text-xs ${feature.enabled ? 'text-gray-400' : 'text-gray-500'}`}>{feature.description}</p>
                </div>
              ))}
              {cpuConfig.piezoelectricLightNetworks.features.filter(f => f.enabled).length === 0 && <p className="text-xs text-gray-400 italic">No piezoelectric features enabled.</p>}
            </div>
            <FrequencyModulationDisplay modulations={cpuConfig.piezoelectricLightNetworks.frequencyModulation} />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Operational Parameters" icon={<CogIcon className="text-cyan-400" />}>
        <div className="grid grid-cols-1 gap-2">
           <DetailItem label="Personality Mode" value={getPersonalityLabel(agentState.currentPersonality)} />
           <DetailItem label="Communication Protocol" value={getProtocolLabel(agentState.communicationProtocol)} />
           <DetailItem label="CPU Efficiency" value={`${(agentState.cpuEfficiencyFactor * 100).toFixed(0)}%`} className="font-bold" />
           {currentConsciousnessInfo && <ConsciousnessLevelDetailsDisplay levelInfo={currentConsciousnessInfo} />}
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Crystal Memory (Last 3)" icon={<CogIcon className="text-cyan-400" />}>
        {agentState.crystalMemory.length > 0 ? (
          <ul className="list-inside space-y-1 text-xs text-gray-300">
            {agentState.crystalMemory.slice(-3).reverse().map((item: CrystalMemoryItem) => {
              const fullContent = formatMemoryContent(item.content);
              return (
                <CopyableListItem key={item.id} itemKey={`mem-${item.id}`} textToCopy={fullContent}>
                  <span className="font-semibold text-yellow-400">{item.type}: </span> 
                  {fullContent.substring(0,40)}{fullContent.length > 40 ? '...' : ''}
                </CopyableListItem>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-gray-400">Memory banks initializing...</p>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Mycelium Network Growth (Last 3)" icon={<CogIcon className="text-cyan-400" />}>
        {agentState.myceliumGrowthLog.length > 0 ? (
          <ul className="list-inside space-y-1 text-xs text-gray-300">
            {agentState.myceliumGrowthLog.slice(-3).reverse().map((log, index) => (
              <CopyableListItem key={`myc-${index}`} itemKey={`myc-${index}`} textToCopy={log}>
                {log.substring(0,50)}{log.length > 50 ? '...' : ''}
              </CopyableListItem>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-400">Mycelial network dormant...</p>
        )}
      </CollapsibleSection>
    </div>
  );
};

export default AgentStateDisplay;