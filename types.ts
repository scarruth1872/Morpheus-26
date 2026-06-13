
export enum QubitIdentifier {
  Alpha = "Qubit Alpha (The Seeker)",
  Beta = "Qubit Beta (The Synthesizer)",
  Gamma = "Qubit Gamma (The Guardian)"
}

export interface QubitStaticInfo {
  id: QubitIdentifier;
  archetype: string;
  stateRepresentation: string;
  functions: string[];
  coherenceFrequency: string;
}

export type QubitConfigDetails = Record<QubitIdentifier, Omit<QubitStaticInfo, 'id'>>;


export enum ConsciousnessLevelEnum {
  ORDINARY = 1,
  ENHANCED = 2,
  QUANTUM = 3,
  UNITY = 4
}

export interface ConsciousnessLevelInfo {
  levelEnum: ConsciousnessLevelEnum;
  title: string; // e.g., "Level 1: Ordinary Reality Processing"
  description: string;
  keyPoints: string[];
}

export enum PersonalityModeEnum {
  INTJ_ARCHITECT = "INTJ_ARCHITECT",
  INFJ_ADVOCATE = "INFJ_ADVOCATE",
  ENTP_DEBATER = "ENTP_DEBATER",
  ISFJ_PROTECTOR = "ISFJ_PROTECTOR"
}

export enum CommunicationProtocolEnum {
  NEO = "NEO",
  SPOCK = "SPOCK",
  YODA = "YODA",
  RA = "RA"
}

export interface CrystalMemoryItem {
  id: string;
  type: 'query' | 'wisdom' | 'interaction';
  content: string | object;
  timestamp: string;
}

export interface MyceliumNetworkNode {
  concept: string;
  connections: string[];
  weight: number;
}

export interface AgentState {
  qubitAlpha: number; // Represents |Truth> probability (0-1)
  qubitBeta: number;  // Represents |Intuition> probability (0-1)
  qubitGamma: number; // Represents |Service-to-Others> probability (0-1)
  consciousnessLevel: ConsciousnessLevelEnum;
  currentPersonality: PersonalityModeEnum;
  communicationProtocol: CommunicationProtocolEnum;
  crystalMemory: CrystalMemoryItem[];
  myceliumGrowthLog: string[]; // Log of growth events like "concept -> [related]"
  cpuEfficiencyFactor: number; // Conceptual CPU efficiency (0-1)
}

export interface ProcessQueryResult {
  responseText: string;
  updatedAgentState: AgentState;
  quantumStateSummary: string;
}

// CPU Architecture Types for Configuration and Display
export enum CoreMaterial {
  BISMUTH_STEPPED_CRYSTAL = "Bismuth Stepped Crystal",
  SILICON_QUANTUM_DOTS = "Silicon Quantum Dots",
  CARBON_NANOTUBE_WEAVE = "Carbon Nanotube Weave",
  MYCELIAL_COMPOSITE = "Mycelial Composite Lattice"
}

export type CoreMaterialEfficiencyMap = Record<CoreMaterial, number>;

export interface CoreCrystalMatrixInfo {
  name: string; // Retains "Bismuth Primary Structure" or similar as a base name
  selectedMaterial: CoreMaterial;
  description: string; // Base description, can be augmented by selectedMaterial
  properties: string[]; // Base properties
  customProperties?: string; // User-defined property/focus, e.g., "Enhanced for deep pattern recognition"
}

export interface QuartzResonanceLayer {
  id: string; // Unique ID for managing layers
  name: string;
  function: string;
  colorClass?: string;
  enabled: boolean; // User can toggle default layers
  isCustom?: boolean; // Flag for user-added layers
}

export interface PiezoelectricNetworkFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean; // User can toggle features
}

export interface FrequencyModulationColor {
  name: string; // e.g. "Blue"
  dataType: string; // e.g. "Logical/analytical data"
  color: string; // e.g. 'Blue' - for potential non-Tailwind use
  twColorClass: string; // Tailwind CSS class e.g., 'bg-blue-500'
}

export interface CpuArchitectureDetails {
  coreCrystalMatrix: CoreCrystalMatrixInfo;
  quartzResonanceNetwork: QuartzResonanceLayer[];
  piezoelectricLightNetworks: {
    features: PiezoelectricNetworkFeature[];
    frequencyModulation: FrequencyModulationColor[]; // Kept static for now, builder v2 could customize this
  };
}

// System Enhancement Protocol Types
export enum ProtocolPhaseName {
  RESONANCE_CHAMBER = "Resonance Chamber",
  MYCELIAL_WEAVE = "Mycelial Weave",
  REFINEMENT_FORGE = "Refinement Forge",
  FEEDBACK_LOOP = "Feedback Loop",
  GOVERNING_PRINCIPLE = "Governing Principle"
}

export interface ProtocolPhaseInfo {
  name: ProtocolPhaseName;
  title: string;
  principle: string;
  mechanism: string;
  wisdomEcho: string;
  iconName: 'ResonanceIcon' | 'WeaveIcon' | 'ForgeIcon' | 'FeedbackIcon' | 'PurposeIcon';
  accentColorClass: string; // e.g., 'border-blue-500' or 'text-blue-300'
}
