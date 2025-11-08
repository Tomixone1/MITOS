import React from 'react';
import BrainIcon from './icons/BrainIcon';

interface MythInputFormProps {
  myth: string;
  setMyth: (myth: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MythInputForm: React.FC<MythInputFormProps> = ({ myth, setMyth, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <label htmlFor="myth-input" className="text-lg font-semibold text-ink">
          Describe el mito o fantasía
        </label>
        <textarea
          id="myth-input"
          value={myth}
          onChange={(e) => setMyth(e.target.value)}
          placeholder="Ej: El mito de Ícaro y Dédalo, que volaron demasiado cerca del sol..."
          className="w-full h-48 p-4 bg-parchment-light border border-parchment rounded-lg text-ink placeholder-ink-light focus:ring-2 focus:ring-sky focus:border-sky transition-all duration-300 resize-y shadow-inner"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !myth.trim()}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-lg text-white bg-sky rounded-lg shadow-lg hover:bg-sky-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-parchment-light focus:ring-sky transition-all duration-300 disabled:bg-parchment disabled:cursor-not-allowed disabled:text-ink-light transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              <span>Analizando...</span>
            </>
          ) : (
            <>
              <BrainIcon className="w-6 h-6" />
              <span>Desmitificar</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default MythInputForm;