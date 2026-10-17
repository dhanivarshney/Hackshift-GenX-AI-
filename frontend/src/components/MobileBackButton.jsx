import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNexus } from '../context/NexusContext';

export default function MobileBackButton() {
  const { goBack } = useNexus();

  return (
    <button
      onClick={goBack}
      className="neon-back-floating-mobile md:hidden group"
      title="Go Back"
      aria-label="Go Back"
    >
      <span className="neon-ripple-container">
        <span className="neon-ripple"></span>
      </span>
      <ArrowLeft className="w-5 h-5 text-[#00ffff] transition-transform duration-200 group-hover:-translate-x-1" />
      <span className="neon-tooltip">Go Back</span>
    </button>
  );
}
