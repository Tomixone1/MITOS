import React, { useState, useCallback, useEffect } from 'react';

interface UserSubmissionFormProps {
  onClose: () => void;
}

const UserSubmissionForm: React.FC<UserSubmissionFormProps> = ({ onClose }) => {
  const [myth, setMyth] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable body scroll
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myth.trim() || !explanation.trim()) return;
    
    // Simulate submission to a backend
    console.log('User Submission:', { myth, explanation });
    setIsSubmitted(true);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-parchment-light border border-parchment rounded-lg shadow-xl p-6 w-full max-w-lg m-4 text-ink transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sky mb-4">¡Gracias por tu Contribución!</h2>
            <p className="text-ink-light mb-6">Tu mito ha sido enviado para su revisión. Apreciamos tu ayuda para expandir el conocimiento.</p>
            <button
              onClick={handleClose}
              className="px-6 py-2 font-bold text-white bg-sky rounded-lg hover:bg-sky-light transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-sky">Contribuye con un Mito</h2>
              <button onClick={handleClose} className="text-ink-light hover:text-ink text-2xl font-bold">&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="user-myth" className="block mb-2 font-semibold text-ink">Mito o Leyenda</label>
                <textarea
                  id="user-myth"
                  value={myth}
                  onChange={(e) => setMyth(e.target.value)}
                  placeholder="Ej: La leyenda de El Dorado..."
                  className="w-full h-24 p-2 bg-white border border-parchment rounded-md focus:ring-2 focus:ring-sky shadow-inner"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="user-explanation" className="block mb-2 font-semibold text-ink">Explicación Racional</label>
                <textarea
                  id="user-explanation"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Proporciona una explicación basada en la ciencia, la historia o la psicología..."
                  className="w-full h-32 p-2 bg-white border border-parchment rounded-md focus:ring-2 focus:ring-sky shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-bold text-lg text-white bg-sky rounded-lg hover:bg-sky-light transition-colors disabled:bg-parchment disabled:cursor-not-allowed disabled:text-ink-light"
                disabled={!myth.trim() || !explanation.trim()}
              >
                Enviar para Revisión
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSubmissionForm;