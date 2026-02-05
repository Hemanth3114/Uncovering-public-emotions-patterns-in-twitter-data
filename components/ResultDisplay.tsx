
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const isBlocked = result.action === 'block';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`p-8 rounded-3xl border shadow-2xl bg-white dark:bg-[#16181c] transition-colors ${isBlocked ? 'border-red-500/30' : 'border-slate-200 dark:border-[#2f3336]'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-100 dark:border-[#2f3336] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isBlocked ? 'bg-[#f4212e] text-white' : 'bg-[#00ba7c] text-white'}`}>
                ACTION: {result.action}
              </span>
              <span className="text-xs text-slate-400 dark:text-[#71767b] font-medium">#{result.agentId}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white capitalize transition-colors">{result.emotion} Pattern Detected</h3>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-slate-400 dark:text-[#71767b] uppercase block mb-1">Confidence Score</span>
            <span className="text-3xl font-black text-[#1d9bf0]">{(result.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-[#2f3336] transition-colors">
                 <h4 className="text-[10px] font-black text-slate-500 dark:text-[#71767b] uppercase tracking-widest mb-2">Key Insight</h4>
                 <p className="text-slate-800 dark:text-[#e7e9ea] font-medium leading-relaxed italic transition-colors">"{result.keyInsight}"</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#1d9bf0]/10 p-4 rounded-xl border border-[#1d9bf0]/20">
                    <span className="text-[9px] font-bold text-[#1d9bf0] uppercase block">Emotional Positivity</span>
                    <span className="text-xl font-bold text-[#1d9bf0]">{result.valence.toFixed(2)}</span>
                 </div>
                 <div className={`p-4 rounded-xl border transition-colors ${result.arousal > 0.5 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-slate-100 dark:bg-[#2f3336]/30 border-slate-200 dark:border-[#2f3336]'}`}>
                    <span className={`text-[9px] font-bold uppercase block ${result.arousal > 0.5 ? 'text-orange-500' : 'text-slate-500 dark:text-[#71767b]'}`}>Emotional Intensity</span>
                    <span className={`text-xl font-bold ${result.arousal > 0.5 ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>{result.arousal.toFixed(2)}</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-50 dark:bg-black p-6 rounded-2xl text-slate-900 dark:text-white shadow-xl relative overflow-hidden border border-slate-200 dark:border-[#2f3336] transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-[#1d9bf0]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-[#1d9bf0] text-[10px] font-black uppercase tracking-widest mb-4">Situational Scenario</h4>
              <p className="text-slate-600 dark:text-[#71767b] text-sm leading-relaxed relative z-10 transition-colors">{result.scenario}</p>
           </div>
        </div>

        <div className="bg-[#1d9bf0] p-6 rounded-2xl text-white shadow-lg">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold">Safety Agent Justification</h4>
           </div>
           <p className="text-white/90 text-sm leading-relaxed">{result.safetyJustification}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
