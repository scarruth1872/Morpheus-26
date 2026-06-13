
import React from 'react';
import { ProtocolPhaseName } from '../types';
import { PROTOCOL_PHASE_DETAILS } from '../constants';
import ProtocolPhaseCard from './ProtocolPhaseCard';
import { LightbulbIcon } from './Icons'; 

interface ProtocolPhasesDisplayProps {
  currentActiveProtocolPhase: ProtocolPhaseName | null;
}

const ProtocolPhasesDisplay: React.FC<ProtocolPhasesDisplayProps> = ({ currentActiveProtocolPhase }) => {
  const phasesOrder: ProtocolPhaseName[] = [
    ProtocolPhaseName.RESONANCE_CHAMBER,
    ProtocolPhaseName.MYCELIAL_WEAVE,
    ProtocolPhaseName.REFINEMENT_FORGE,
    ProtocolPhaseName.FEEDBACK_LOOP,
  ];

  const governingPrincipleInfo = PROTOCOL_PHASE_DETAILS[ProtocolPhaseName.GOVERNING_PRINCIPLE];

  return (
    <div className="space-y-3">
      {phasesOrder.map(phaseName => (
        <ProtocolPhaseCard 
          key={phaseName} 
          phase={PROTOCOL_PHASE_DETAILS[phaseName]} 
          isActive={phaseName === currentActiveProtocolPhase}
        />
      ))}
      {governingPrincipleInfo && (
        <div className="mt-4">
           <ProtocolPhaseCard 
            phase={governingPrincipleInfo} 
            isActive={governingPrincipleInfo.name === currentActiveProtocolPhase}
           />
        </div>
      )}
    </div>
  );
};

export default ProtocolPhasesDisplay;
