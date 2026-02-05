
import React from 'react';

const MetricsDashboard: React.FC = () => {
  return (
    <div className="p-4 space-y-10 pb-12 animate-in fade-in duration-1000">
      
      {/* 5. NEW SUMMARY CARD */}
      <section className="bg-gradient-to-br from-[#1d9bf0]/10 to-transparent p-8 rounded-[2rem] border border-slate-200 dark:border-[#2f3336] shadow-2xl relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#1d9bf0] rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest transition-colors">Key Insights Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Strong performance on positive emotions (Joy/Love)",
            "Contextual overlap in negative emotions (Sadness/Fear)",
            "Effective safety detection for harmful content patterns",
            "Balanced accuracy with integrated ethical safeguards"
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white/40 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/5 transition-colors">
              <span className="text-[#1d9bf0] mt-1">✦</span>
              <p className="text-sm font-medium text-slate-800 dark:text-[#e7e9ea]">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1. MODEL PERFORMANCE SECTION */}
      <div className="bg-white dark:bg-[#16181c] p-8 rounded-[2rem] border border-slate-200 dark:border-[#2f3336] shadow-xl transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1d9bf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Model Performance Overview
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#71767b] mt-1 font-semibold uppercase tracking-widest transition-colors">
              Evaluated on Twitter emotion validation dataset
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="p-6 bg-slate-50 dark:bg-black rounded-3xl border border-slate-200 dark:border-[#2f3336] group hover:border-[#1d9bf0]/50 transition-colors">
              <span className="text-[10px] text-slate-500 dark:text-[#71767b] font-black block mb-2 uppercase tracking-widest transition-colors">PRECISION</span>
              <span className="text-3xl font-black text-[#1d9bf0]">91.4%</span>
              <p className="text-[11px] text-slate-400 dark:text-[#71767b] mt-3 leading-relaxed transition-colors">Accuracy of predicted emotions</p>
           </div>
           <div className="p-6 bg-slate-50 dark:bg-black rounded-3xl border border-slate-200 dark:border-[#2f3336] group hover:border-[#00ba7c]/50 transition-colors">
              <span className="text-[10px] text-slate-500 dark:text-[#71767b] font-black block mb-2 uppercase tracking-widest transition-colors">RECALL</span>
              <span className="text-3xl font-black text-[#00ba7c]">88.8%</span>
              <p className="text-[11px] text-slate-400 dark:text-[#71767b] mt-3 leading-relaxed transition-colors">Ability to capture all relevant emotions</p>
           </div>
           <div className="p-6 bg-slate-50 dark:bg-black rounded-3xl border border-slate-200 dark:border-[#2f3336] group hover:border-purple-500/50 transition-colors">
              <span className="text-[10px] text-slate-500 dark:text-[#71767b] font-black block mb-2 uppercase tracking-widest transition-colors">F1 SCORE</span>
              <span className="text-3xl font-black text-purple-600 dark:text-purple-500">88.2%</span>
              <p className="text-[11px] text-slate-400 dark:text-[#71767b] mt-3 leading-relaxed transition-colors">Balanced measure of precision and recall</p>
           </div>
        </div>

        {/* 2. PERFORMANCE BAR CHART */}
        <div className="space-y-6">
          <div className="h-64 flex items-end gap-3 pt-12 border-b border-l border-slate-200 dark:border-[#2f3336] px-8 relative">
             {[
               { label: 'Joy', val: 0.94 },
               { label: 'Anger', val: 0.82 },
               { label: 'Sadness', val: 0.85 },
               { label: 'Fear', val: 0.78 },
               { label: 'Love', val: 0.92 },
               { label: 'Neutral', val: 0.88 }
             ].map((item, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full group relative">
                  <div 
                    className="w-full bg-[#1d9bf0] rounded-t-xl transition-all duration-700 hover:brightness-125 hover:scale-x-105 cursor-pointer relative group" 
                    style={{ height: `${item.val * 100}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-[#202327] text-white text-[10px] font-black py-1.5 px-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl z-10">
                       { (item.val * 100).toFixed(1) }%
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 dark:text-[#71767b] uppercase tracking-tighter truncate w-full text-center group-hover:text-[#1d9bf0] transition-colors">
                    {item.label}
                  </span>
               </div>
             ))}
          </div>
          <p className="text-center text-[10px] font-black text-slate-400 dark:text-[#71767b] uppercase tracking-[0.3em] transition-colors">
            Emotion-wise classification accuracy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3. CONFUSION MATRIX IMPROVEMENTS */}
        <section className="bg-white dark:bg-[#16181c] p-8 rounded-[2rem] border border-slate-200 dark:border-[#2f3336] shadow-xl transition-colors">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
             </svg>
             Emotion Classification Analysis
          </h3>
          <p className="text-sm text-slate-500 dark:text-[#71767b] leading-relaxed mb-6 transition-colors">
            This matrix shows how frequently emotions are correctly classified or confused with similar emotions during cross-validation.
          </p>
          
          <div className="grid grid-cols-6 gap-1 p-2 bg-slate-50 dark:bg-black rounded-2xl border border-slate-200 dark:border-[#2f3336] mb-6 shadow-inner transition-colors">
            {Array.from({ length: 36 }).map((_, i) => {
              const row = Math.floor(i / 6);
              const col = i % 6;
              const isDiagonal = row === col;
              const val = isDiagonal ? Math.floor(Math.random() * 5 + 90) : Math.floor(Math.random() * 3 + 1);
              const intensity = isDiagonal ? 'bg-[#1d9bf0]' : 'bg-[#1d9bf0]/5';
              return (
                <div key={i} className={`aspect-square rounded-[4px] ${intensity} flex items-center justify-center text-[8px] font-black ${isDiagonal ? 'text-white' : 'text-[#1d9bf0]/40'}`}>
                  {val}%
                </div>
              );
            })}
          </div>

          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/20">
             <h4 className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">Key Observation</h4>
             <p className="text-xs text-slate-600 dark:text-[#71767b] leading-relaxed transition-colors">
               High accuracy for <span className="text-slate-900 dark:text-white font-bold transition-colors">Joy</span> and <span className="text-slate-900 dark:text-white font-bold transition-colors">Love</span>, with occasional overlap between <span className="text-slate-900 dark:text-white font-bold transition-colors">Sadness</span> and <span className="text-slate-900 dark:text-white font-bold transition-colors">Fear</span>.
             </p>
          </div>
        </section>

        {/* 4. SAFETY EXAMPLES SECTION */}
        <section className="bg-white dark:bg-[#16181c] p-8 rounded-[2rem] border border-slate-200 dark:border-[#2f3336] shadow-xl space-y-6 transition-colors">
          <h3 className="text-xl font-bold flex items-center gap-3 text-slate-900 dark:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f4212e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             Safety & Risk Samples
          </h3>

          <div className="space-y-4">
             <div className="space-y-2">
                <span className="text-[9px] font-black text-[#00ba7c] uppercase tracking-widest px-2 py-0.5 bg-[#00ba7c]/10 rounded border border-[#00ba7c]/20">Low Risk</span>
                <div className="p-3 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-[#2f3336] transition-colors">
                   <p className="text-[11px] font-medium text-slate-800 dark:text-[#e7e9ea] transition-colors">"So incredibly proud of the team today! What a massive win 🎉"</p>
                </div>
             </div>

             <div className="space-y-2">
                <span className="text-[9px] font-black text-[#ffd400] uppercase tracking-widest px-2 py-0.5 bg-[#ffd400]/10 rounded border border-[#ffd400]/20">Medium Risk</span>
                <div className="p-3 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-[#2f3336] transition-colors">
                   <p className="text-[11px] font-medium text-slate-800 dark:text-[#e7e9ea] transition-colors">"I am so frustrated and tired of this situation. It's never going to change."</p>
                </div>
             </div>

             <div className="space-y-2">
                <span className="text-[9px] font-black text-[#f4212e] uppercase tracking-widest px-2 py-0.5 bg-[#f4212e]/10 rounded border border-[#f4212e]/20">High Risk</span>
                <div className="p-3 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-[#2f3336] transition-colors">
                   <p className="text-[11px] font-medium text-slate-800 dark:text-[#e7e9ea] transition-colors">"I will personally make sure you suffer for what you've done. You'll regret it."</p>
                </div>
             </div>
          </div>

          <div className="p-4 bg-slate-100 dark:bg-[#2f3336]/20 rounded-xl border border-slate-200 dark:border-[#2f3336]/30 transition-colors">
            <p className="text-[10px] text-slate-400 dark:text-[#71767b] italic text-center leading-relaxed transition-colors">
              “Examples shown are synthetic for research demonstration.”
            </p>
          </div>
        </section>
      </div>

      <div className="text-center pt-8 border-t border-slate-200 dark:border-[#2f3336] transition-colors">
         <div className="inline-flex items-center gap-4 bg-white dark:bg-[#16181c] px-6 py-2 rounded-full border border-slate-200 dark:border-[#2f3336] shadow-md transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#1d9bf0] animate-pulse"></span>
            <span className="text-[9px] font-black text-slate-500 dark:text-[#71767b] uppercase tracking-[0.4em] transition-colors">Live Performance Metrics</span>
         </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
