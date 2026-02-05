
import React from 'react';

interface AnalyzerFormProps {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  isRecording: boolean;
  onStartRecord: () => void;
  onStopRecord: () => void;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ 
  value, onChange, onAnalyze, isLoading, isRecording, onStartRecord, onStopRecord 
}) => {
  const topics = ['#AI', 'Elections', 'Tech Layoffs', 'Climate Change'];

  return (
    <div className="bg-white dark:bg-[#16181c] p-7 rounded-[2rem] border border-slate-200 dark:border-[#2f3336] shadow-xl dark:shadow-2xl space-y-5 transition-colors">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-black text-slate-500 dark:text-[#71767b] uppercase tracking-widest">Inference Input</h2>
        <div className="flex gap-2">
           <button 
             onMouseDown={onStartRecord}
             onMouseUp={onStopRecord}
             className={`p-2.5 rounded-xl border transition-all ${
               isRecording 
                 ? 'bg-red-500/10 border-red-500/40 text-red-500 animate-pulse' 
                 : 'bg-slate-50 dark:bg-black border-slate-200 dark:border-[#2f3336] text-slate-500 dark:text-[#71767b] hover:text-[#1d9bf0] hover:border-[#1d9bf0]/50'
             }`}
             title="Hold to analyze audio pulse"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 003 3.5m0-16.5a3 3 0 013 3v10a3 3 0 01-3 3" />
             </svg>
           </button>
        </div>
      </div>

      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste a tweet, hashtag, or topic to explore how people really feel."
          className="w-full h-40 p-5 bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2f3336] rounded-2xl outline-none focus:ring-1 focus:ring-[#1d9bf0] transition-all resize-none text-slate-900 dark:text-[#e7e9ea] placeholder-slate-400 dark:placeholder-[#71767b] text-lg leading-relaxed shadow-inner"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-20">
             <div className="flex items-center gap-4 bg-white dark:bg-[#16181c] px-8 py-4 rounded-full shadow-2xl border border-slate-200 dark:border-[#2f3336] animate-in zoom-in-95">
                <div className="w-5 h-5 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Syncing Public Vibe...</span>
             </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-bold text-slate-400 dark:text-[#71767b] uppercase tracking-tighter">Quick Explore:</span>
        <div className="flex flex-wrap gap-2.5">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => onChange(topic)}
              className="px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-[#2f3336] text-slate-600 dark:text-[#e7e9ea] hover:bg-[#1d9bf0] hover:border-[#1d9bf0] hover:text-white transition-all bg-white dark:bg-black active:scale-95 shadow-sm"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onAnalyze}
        disabled={isLoading || !value.trim()}
        className="w-full py-5 bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:bg-[#1d9bf0]/20 disabled:text-white/20 text-white font-black text-lg rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Go for analysis
      </button>
    </div>
  );
};

export default AnalyzerForm;
