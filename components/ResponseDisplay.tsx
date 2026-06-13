
import React from 'react';
import { ChatBubbleIcon } from './Icons';

interface ResponseDisplayProps {
  responseText: string;
  quantumStateSummary?: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ responseText, quantumStateSummary }) => {
  if (!responseText) return null;

  // Basic markdown-like formatting for **bold** and *italic*
  const formatText = (text: string) => {
    let formattedText = text;
    // Replace **text** with <strong>text</strong>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *text* or _text_ with <em>text</em>
    formattedText = formattedText.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
    // Replace newlines with <br />
    formattedText = formattedText.replace(/\n/g, '<br />');
    return { __html: formattedText };
  };

  return (
    <div className="mt-8 p-6 bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-xl font-semibold text-teal-300 mb-4 flex items-center">
        <ChatBubbleIcon className="w-6 h-6 mr-2 text-teal-400" />
        MORPHEUS-7 Responds:
      </h2>
      <div className="prose prose-sm prose-invert max-w-none text-gray-200 leading-relaxed" dangerouslySetInnerHTML={formatText(responseText)} />
      {quantumStateSummary && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="text-md font-semibold text-purple-300 mb-2">Quantum State Resonance:</h3>
          <pre className="text-xs bg-gray-900 p-3 rounded-md overflow-x-auto text-purple-200 whitespace-pre-wrap">{quantumStateSummary}</pre>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
    