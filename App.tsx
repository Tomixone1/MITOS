import React, { useState, useCallback } from 'react';
import { Status, ExplanationResponse } from './types';
import { getRationalExplanation } from './services/geminiService';
import MythInputForm from './components/MythInputForm';
import ExplanationDisplay from './components/ExplanationDisplay';
import SparklesIcon from './components/icons/SparklesIcon';
import PopularMyths from './components/PopularMyths';
import UserSubmissionForm from './components/UserSubmissionForm';
import MythosToLogos from './components/MythosToLogos';

const POPULAR_MYTHS_LIST = [
  'El mito de la caja de Pandora',
  'La leyenda del Rey Arturo y Excalibur',
  'El Kraken, terror de los mares',
  'El mito de Ícaro y Dédalo',
  'Anansi, el dios araña de las historias',
];

const App: React.FC = () => {
  const [myth, setMyth] = useState<string>('');
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const performExplanation = useCallback(async (mythToExplain: string) => {
    if (!mythToExplain.trim()) return;

    setStatus(Status.LOADING);
    setError(null);
    setExplanation(null);

    try {
      const result = await getRationalExplanation(mythToExplain);
      setExplanation(result);
      setStatus(Status.SUCCESS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error desconocido ha ocurrido.');
      setStatus(Status.ERROR);
    }
  }, []);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      performExplanation(myth);
  }, [myth, performExplanation]);

  const handlePopularMythClick = useCallback((popularMyth: string) => {
    setMyth(popularMyth);
    performExplanation(popularMyth);
    document.getElementById('explanation-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [performExplanation]);

  return (
    <div className="min-h-screen bg-parchment-light text-ink p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-3xl">
        <header className="text-center my-8">
          <div className="inline-flex items-center gap-4">
            <SparklesIcon className="h-10 w-10 text-sky" />
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ink to-sky">
              El Ejercicio del Mito al Logos
            </h1>
            <SparklesIcon className="h-10 w-10 text-sky" />
          </div>
          <p className="mt-4 text-lg text-ink-light max-w-2xl mx-auto">
            Descubre la ciencia y la historia detrás de las leyendas. Ingresa un mito y obtén una explicación racional.
          </p>
        </header>

        <main className="flex flex-col items-center gap-8">
          <div className="w-full p-6 bg-parchment border border-ink/10 rounded-lg shadow-lg">
            <MythInputForm
              myth={myth}
              setMyth={setMyth}
              onSubmit={handleSubmit}
              isLoading={status === Status.LOADING}
            />
          </div>

          <div className="w-full text-center">
            <button 
              onClick={() => setShowSubmissionForm(true)}
              className="px-6 py-2 border border-sky text-sky rounded-full hover:bg-sky/20 transition-colors duration-300"
            >
              ¿Conoces un mito? ¡Contribuye con la comunidad!
            </button>
          </div>

          <PopularMyths 
            myths={POPULAR_MYTHS_LIST}
            onMythClick={handlePopularMythClick}
            isLoading={status === Status.LOADING}
          />

          <MythosToLogos />
          
          <div id="explanation-section" className="w-full">
            <ExplanationDisplay
              status={status}
              explanation={explanation}
              error={error}
            />
          </div>
        </main>
        
        {showSubmissionForm && <UserSubmissionForm onClose={() => setShowSubmissionForm(false)} />}

        <footer className="text-center mt-12 py-4 text-ink-light/80">
          <p>Potenciado por la API de Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;