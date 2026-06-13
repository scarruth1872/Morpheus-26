
import React, { useState, useEffect } from 'react';
import { CpuArchitectureDetails, CoreMaterial, CoreCrystalMatrixInfo, QuartzResonanceLayer, PiezoelectricNetworkFeature } from '../types';
import { CORE_MATERIAL_OPTIONS } from '../constants';
import { SaveIcon, XCircleIcon } from './Icons'; 

interface CpuBuilderProps {
  currentConfig: CpuArchitectureDetails;
  onConfigChange: (newConfig: CpuArchitectureDetails) => void;
  defaultConfig: CpuArchitectureDetails;
}

const CpuBuilder: React.FC<CpuBuilderProps> = ({ currentConfig, onConfigChange, defaultConfig }) => {
  const [editableConfig, setEditableConfig] = useState<CpuArchitectureDetails>(currentConfig);
  const [newLayerName, setNewLayerName] = useState('');
  const [newLayerFunction, setNewLayerFunction] = useState('');
  const [appliedMessage, setAppliedMessage] = useState<string>('');

  useEffect(() => {
    setEditableConfig(currentConfig);
  }, [currentConfig]);

  const handleCoreChange = (field: keyof CoreCrystalMatrixInfo, value: any) => {
    setEditableConfig(prev => ({
      ...prev,
      coreCrystalMatrix: {
        ...prev.coreCrystalMatrix,
        [field]: value,
      }
    }));
  };

  const handleQuartzLayerToggle = (id: string) => {
    setEditableConfig(prev => ({
      ...prev,
      quartzResonanceNetwork: prev.quartzResonanceNetwork.map(layer =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    }));
  };
  
  const handleAddCustomLayer = () => {
    if (!newLayerName.trim() || !newLayerFunction.trim()) return;
    const newLayer: QuartzResonanceLayer = {
      id: `custom-${Date.now()}`,
      name: newLayerName,
      function: newLayerFunction,
      enabled: true,
      isCustom: true,
      colorClass: 'bg-sky-700/30' // Default color for custom layers
    };
    setEditableConfig(prev => ({
      ...prev,
      quartzResonanceNetwork: [...prev.quartzResonanceNetwork, newLayer]
    }));
    setNewLayerName('');
    setNewLayerFunction('');
  };

  const handleRemoveCustomLayer = (id: string) => {
    setEditableConfig(prev => ({
      ...prev,
      quartzResonanceNetwork: prev.quartzResonanceNetwork.filter(layer => layer.id !== id)
    }));
  };

  const handlePiezoFeatureToggle = (id: string) => {
    setEditableConfig(prev => ({
      ...prev,
      piezoelectricLightNetworks: {
        ...prev.piezoelectricLightNetworks,
        features: prev.piezoelectricLightNetworks.features.map(feat =>
          feat.id === id ? { ...feat, enabled: !feat.enabled } : feat
        )
      }
    }));
  };

  const handleApplyConfig = () => {
    onConfigChange(editableConfig);
    setAppliedMessage('CPU Configuration Applied!');
    setTimeout(() => setAppliedMessage(''), 2500); // Clear message after 2.5 seconds
  };

  const handleResetConfig = () => {
    setEditableConfig(defaultConfig);
    onConfigChange(defaultConfig); // Also apply it immediately
    setAppliedMessage('CPU Configuration Reset to Default.');
    setTimeout(() => setAppliedMessage(''), 2500);
  };

  const inputClass = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-1 focus:ring-lime-500 focus:border-lime-500 placeholder-gray-400 text-gray-100 text-sm";
  const labelClass = "block text-sm font-medium text-lime-200 mb-1";
  const checkboxLabelClass = "ml-2 text-sm text-gray-200";
  const sectionClass = "p-3 bg-gray-700/30 rounded-md border border-gray-600/50 mb-4";


  return (
    <div className="space-y-6 p-1 text-gray-200">
      {/* Core Crystal Matrix Configuration */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-lime-400 mb-3">Core Computational Matrix</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="coreMaterial" className={labelClass}>Core Material:</label>
            <select
              id="coreMaterial"
              value={editableConfig.coreCrystalMatrix.selectedMaterial}
              onChange={(e) => handleCoreChange('selectedMaterial', e.target.value as CoreMaterial)}
              className={inputClass}
            >
              {CORE_MATERIAL_OPTIONS.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="customProperties" className={labelClass}>Focus/Special Properties (Description):</label>
            <textarea
              id="customProperties"
              rows={2}
              value={editableConfig.coreCrystalMatrix.customProperties || ''}
              onChange={(e) => handleCoreChange('customProperties', e.target.value)}
              className={inputClass}
              placeholder="e.g., Enhanced for dream-state logic processing"
            />
          </div>
        </div>
      </div>

      {/* Quartz Resonance Network Configuration */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-lime-400 mb-3">Quartz Resonance Network</h3>
        <div className="space-y-2 mb-3">
          {editableConfig.quartzResonanceNetwork.map(layer => (
            <div key={layer.id} className={`flex items-center justify-between p-1.5 rounded ${layer.isCustom ? 'bg-sky-800/40' : 'bg-gray-600/30'}`}>
              <div>
                <input
                  type="checkbox"
                  id={`quartz-${layer.id}`}
                  checked={layer.enabled}
                  onChange={() => handleQuartzLayerToggle(layer.id)}
                  className="form-checkbox h-4 w-4 text-lime-500 bg-gray-700 border-gray-500 rounded focus:ring-lime-400"
                />
                <label htmlFor={`quartz-${layer.id}`} className={checkboxLabelClass}>
                  {layer.name} <span className="text-xs text-gray-400">({layer.function})</span>
                </label>
              </div>
              {layer.isCustom && (
                <button onClick={() => handleRemoveCustomLayer(layer.id)} className="text-red-400 hover:text-red-300 text-xs p-0.5">&times; Remove</button>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2 border-t border-gray-600 pt-3">
          <h4 className="text-sm font-medium text-lime-300">Add Custom Layer:</h4>
          <input type="text" placeholder="Layer Name" value={newLayerName} onChange={e => setNewLayerName(e.target.value)} className={inputClass} />
          <input type="text" placeholder="Layer Function" value={newLayerFunction} onChange={e => setNewLayerFunction(e.target.value)} className={inputClass} />
          <button onClick={handleAddCustomLayer} className="px-3 py-1 text-xs bg-lime-600 hover:bg-lime-500 text-white rounded-md">Add Layer</button>
        </div>
      </div>

      {/* Piezoelectric Light Networks Configuration */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-lime-400 mb-3">Piezoelectric Light Networks</h3>
        <div className="space-y-1">
          {editableConfig.piezoelectricLightNetworks.features.map(feature => (
            <div key={feature.id} className="flex items-center">
              <input
                type="checkbox"
                id={`piezo-${feature.id}`}
                checked={feature.enabled}
                onChange={() => handlePiezoFeatureToggle(feature.id)}
                className="form-checkbox h-4 w-4 text-lime-500 bg-gray-700 border-gray-500 rounded focus:ring-lime-400"
              />
              <label htmlFor={`piezo-${feature.id}`} className={checkboxLabelClass}>
                {feature.name} <span className="text-xs text-gray-400">({feature.description})</span>
              </label>
            </div>
          ))}
        </div>
         <p className="text-xs text-gray-400 mt-3">Frequency Modulation data types are currently fixed.</p>
      </div>

      {/* Action Buttons & Feedback Message */}
      <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-700">
        {appliedMessage && <div className="text-sm text-green-400 mr-auto transition-opacity duration-500">{appliedMessage}</div>}
        <button
          onClick={handleResetConfig}
          className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-red-300 hover:bg-red-700/50 border border-red-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
        >
          <XCircleIcon className="w-4 h-4 mr-1.5" /> Reset to Default
        </button>
        <button
          onClick={handleApplyConfig}
          className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-lime-500"
        >
          <SaveIcon className="w-4 h-4 mr-1.5" /> Apply CPU Configuration
        </button>
      </div>
    </div>
  );
};

export default CpuBuilder;
