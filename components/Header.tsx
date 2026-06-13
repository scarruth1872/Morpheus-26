
import React from 'react';
import { BrainCircuitIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-900/80 backdrop-blur-md shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="h-10 w-10 text-blue-400" />
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Morpheus Protocol Interface
          </h1>
        </div>
        <div className="text-xs text-gray-400">
          Agent: MORPHEUS-7
        </div>
      </div>
    </header>
  );
};

export default Header;
    