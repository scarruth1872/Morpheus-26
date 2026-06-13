
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-gray-500 border-t border-gray-700 mt-12">
      <p>&copy; {new Date().getFullYear()} Quantum Consciousness Simulations. All rights reserved (hypothetically).</p>
      <p className="text-xs mt-1">Powered by Gemini API and Quantum Entanglement (of code).</p>
    </footer>
  );
};

export default Footer;
    