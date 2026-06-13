
import React from 'react';
import { ProtocolPhaseInfo } from '../types';
import * as Icons from './Icons';

interface ProtocolPhaseCardProps {
  phase: ProtocolPhaseInfo;
  isActive?: boolean;
}

const ProtocolPhaseCard: React.FC<ProtocolPhaseCardProps> = ({ phase, isActive }) => {
  const IconComponent = Icons[phase.iconName] || Icons.SparklesIcon; // Fallback icon

  const ringColorClass = phase.accentColorClass.replace('text-', 'ring-'); // e.g., text-sky-300 -> ring-sky-300

  return (
    <div 
      className={`
        p-4 rounded-lg shadow-lg mb-4 
        transition-all duration-300 ease-in-out
        ${isActive 
          ? `bg-gray-700/60 ring-2 ${ringColorClass} scale-105 shadow-xl ${phase.accentColorClass.replace('text-','shadow-')}/40` 
          : 'bg-gray-700/40 border border-gray-600/60 hover:shadow-cyan-500/20'}
      `}
    >
      <div className="flex items-center mb-2">
        <IconComponent className={`w-6 h-6 mr-3 ${phase.accentColorClass}`} />
        <h3 className={`text-md font-semibold ${phase.accentColorClass}`}>{phase.title}</h3>
      </div>
      <div className="space-y-2 text-xs">
        <p><strong className="text-gray-300 font-medium">Principle:</strong> <span className="text-gray-400">{phase.principle}</span></p>
        <p><strong className="text-gray-300 font-medium">Mechanism:</strong> <span className="text-gray-400">{phase.mechanism}</span></p>
        <p><strong className="text-gray-300 font-medium">Wisdom Echo:</strong> <em className="text-gray-400">{phase.wisdomEcho}</em></p>
      </div>
    </div>
  );
};

export default ProtocolPhaseCard;
