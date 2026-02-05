
import React from 'react';

interface ResearchConsoleProps {
  strictness: number;
  onStrictnessChange: (val: number) => void;
}

const ResearchConsole: React.FC<ResearchConsoleProps> = ({ strictness, onStrictnessChange }) => {
  return (
    <div className="bg-[#16181c] p-6 rounded-2xl text-white border border-[#2f3336] shadow-2xl">
      <h3 className="text-[#1d9bf0] text-[10px] font-black uppercase tracking-widest mb-6">Research Console</h3>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-[#71767b]">Interception Threshold</span>
            <span className="text-xs font-mono bg-[#1d9bf0]/10 px-2 py-1 rounded text-[#1d9bf0] border border-[#1d9bf0]/20">{strictness}%</span>
          </div>
          <input 
            type="range" min="1" max="100" value={strictness} 
            onChange={(e) => onStrictnessChange(parseInt(e.target.value))}
            className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-[#1d9bf0]"
          />
          <p className="text-[10px] text-[#71767b] mt-4 leading-relaxed uppercase font-bold tracking-tight">
            Adjusting for automatic content interception. Higher values require more extreme patterns to trigger a block.
          </p>
        </div>

        <div className="pt-4 border-t border-[#2f3336] space-y-3">
          <div className="flex items-center gap-3 text-xs text-[#71767b]">
            <div className="w-2 h-2 rounded-full bg-[#00ba7c] shadow-sm shadow-green-900" />
            <span>XAI Interpretability: ACTIVE</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#71767b]">
            <div className="w-2 h-2 rounded-full bg-[#00ba7c] shadow-sm shadow-green-900" />
            <span>Ethical Auditor: ACTIVE</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#71767b]">
             <div className="w-2 h-2 rounded-full bg-[#1d9bf0] shadow-sm shadow-blue-900 animate-pulse" />
             <span>Audio Prosody Stream: SYNCED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchConsole;
