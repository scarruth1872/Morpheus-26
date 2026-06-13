
import React, { useState } from 'react';
import { SparklesIcon, ResetIcon } from './Icons';
import { QUERY_PRESETS, QueryPreset } from '../constants';

interface QueryInputProps {
  onSubmit: (query: string, context: string) => void;
  onReset: () => void;
  isLoading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, onReset, isLoading }) => {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSubmit(query, context);
  };

  const handlePresetClick = (preset: QueryPreset) => {
    setQuery(preset.query);
    setContext(preset.context || '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-xl glowing-border border border-blue-500/30">
      <div>
        <label htmlFor="query" className="block text-sm font-medium text-blue-300 mb-1">
          Your Inquiry (The Question):
        </label>
        <textarea
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-100 transition duration-150"
          placeholder="e.g., What is the nature of reality? or Tell me a story about courage."
          disabled={isLoading}
          aria-label="Your Inquiry"
        />
      </div>
      <div>
        <label htmlFor="context" className="block text-sm font-medium text-purple-300 mb-1">
          Situational Context (Optional):
        </label>
        <input
          type="text"
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-100 transition duration-150"
          placeholder="e.g., I need help understanding a complex problem or I'm looking for strategic advice."
          disabled={isLoading}
          aria-label="Situational Context"
        />
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-medium text-teal-300 mb-2">Exploration Starters:</h3>
        <div className="flex flex-wrap gap-2">
          {QUERY_PRESETS.map((preset) => (
            <button
              type="button"
              key={preset.label}
              onClick={() => handlePresetClick(preset)}
              disabled={isLoading}
              className="px-3 py-1.5 text-xs font-medium bg-teal-600/70 hover:bg-teal-500/70 text-teal-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              aria-label={`Preset: ${preset.label}`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4 pt-4">
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-3 border border-red-500/50 text-red-300 rounded-md shadow-sm hover:bg-red-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          aria-label="Reset Agent State"
        >
          <ResetIcon className="w-5 h-5 mr-2" />
          Reset Agent
        </button>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 transform hover:scale-105"
          aria-label="Submit query to MORPHEUS-7"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Processing...' : 'Engage MORPHEUS-7'}
        </button>
      </div>
    </form>
  );
};

export default QueryInput;
