import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky"></div>
      <p className="text-lg text-sky font-semibold tracking-wider">
        Consultando los anales de la razón...
      </p>
    </div>
  );
};

export default Loader;