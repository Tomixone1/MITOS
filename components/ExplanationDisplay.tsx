import React from 'react';
import { Status, ExplanationResponse } from '../types';
import Loader from './Loader';
import SparklesIcon from './icons/SparklesIcon';

interface ExplanationDisplayProps {
  status: Status;
  explanation: ExplanationResponse | null;
  error: string | null;
}

const ExplanationDisplay: React.FC<ExplanationDisplayProps> = ({ status, explanation, error }) => {
  const renderContent = () => {
    switch (status) {
      case Status.LOADING:
        return <Loader />;
      case Status.SUCCESS:
        if (!explanation) return null;
        return (
          <div>
            <div className="mb-4">
              <span className="px-3 py-1 text-sm font-semibold text-sky bg-sky/20 rounded-full border border-sky/50">
                {explanation.category}
              </span>
            </div>
            <div className="prose max-w-none text-ink prose-headings:text-sky prose-strong:text-ink">
              {explanation.explanation.split('\n').map((paragraph, index) => {
                 if (paragraph.startsWith('### ')) {
                   return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(4)}</h3>;
                 }
                 if (paragraph.startsWith('## ')) {
                   return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
                 }
                 if (paragraph.startsWith('# ')) {
                   return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
                 }
                 if (paragraph.trim().startsWith('* ')) {
                   return <li key={index} className="ml-5 list-disc">{paragraph.trim().substring(2)}</li>
                 }
                 return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/20 pt-4">
              {explanation.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs font-medium text-ink-light bg-parchment-light rounded">
                  #{tag.replace(/\s+/g, '_')}
                </span>
              ))}
            </div>
          </div>
        );
      case Status.ERROR:
        return (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
            <h3 className="font-bold text-red-900">Error</h3>
            <p>{error}</p>
          </div>
        );
      case Status.IDLE:
      default:
        return (
          <div className="text-center text-ink-light py-10">
            <SparklesIcon className="mx-auto h-12 w-12 text-parchment" />
            <p className="mt-4 text-lg">
              La explicación racional a tu mito aparecerá aquí.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-3xl font-bold text-center mb-4 text-ink">Análisis Racional</h2>
      <div className="p-6 bg-parchment border border-ink/10 rounded-lg shadow-lg min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ExplanationDisplay;