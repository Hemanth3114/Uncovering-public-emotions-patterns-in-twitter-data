
import React, { useState } from 'react';
import { BatchAuditResult } from '../types';

interface DatasetRegistryProps {
  onBatchAnalyze: (tweets: string[]) => void;
  isLoading: boolean;
  batchResult: BatchAuditResult | null;
}

const DatasetRegistry: React.FC<DatasetRegistryProps> = ({ onBatchAnalyze, isLoading, batchResult }) => {
  const [bulkText, setBulkText] = useState('');

  const handleBatch = () => {
    const lines = bulkText.split('\n').filter(l => l.trim().length > 5);
    if (lines.length > 0) {
      onBatchAnalyze(lines);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Sources */}
        <div className="space-y-6">
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Standard Benchmarks</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">Connect to public high-quality datasets for baseline training and validation.</p>
            
            <div className="space-y-4">
              {[
                { name: "HuggingFace 'emotion'", size: "20k tweets", labels: "6 classes", link: "https://huggingface.co/datasets/emotion" },
                { name: "Kaggle Twitter Sentiment", size: "1.6m tweets", labels: "Binary/Multiclass", link: "https://www.kaggle.com/datasets/kazanova/sentiment140" },
                { name: "ISEAR Global Emotion", size: "7.6k reports", labels: "7 classes", link: "https://www.unige.ch/cisa/isear" }
              ].map((ds, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-300 transition-colors group">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{ds.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">{ds.size} • {ds.labels}</p>
                  </div>
                  <a href={ds.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl">
             <h3 className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">Batch Processing Logic</h3>
             <p className="text-sm text-slate-300 leading-relaxed mb-6">Paste multiple tweets (one per line) below to uncover **collective public emotion patterns**. This simulates a bulk data ingestion pipeline.</p>
             <textarea 
               value={bulkText}
               onChange={(e) => setBulkText(e.target.value)}
               placeholder="Paste tweets here...&#10;Tweet 1...&#10;Tweet 2..."
               className="w-full h-40 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-4"
             />
             <button 
               onClick={handleBatch}
               disabled={isLoading || !bulkText.trim()}
               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 rounded-xl font-bold transition-all"
             >
               {isLoading ? 'Auditing Batch...' : 'Run Pattern Audit'}
             </button>
          </section>
        </div>

        {/* Right: Results */}
        <div className="space-y-6">
          {!batchResult && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="font-bold text-slate-500">No Pattern Detected</h4>
              <p className="text-xs mt-2">Link a dataset or run a batch audit to see collective public emotion patterns.</p>
            </div>
          )}

          {isLoading && (
            <div className="h-64 flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-slate-200">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Aggregating Statistics...</p>
            </div>
          )}

          {batchResult && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-500">
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                 <div>
                   <h3 className="text-2xl font-black text-slate-900">Pattern Report</h3>
                   <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Aggregate Analysis of {batchResult.totalAnalyzed} entries</p>
                 </div>
                 <div className="text-right">
                   <span className="text-xs font-black text-slate-400 uppercase block mb-1">Safety Rating</span>
                   <span className={`text-2xl font-black ${batchResult.safetyRating > 70 ? 'text-emerald-500' : 'text-orange-500'}`}>
                     {batchResult.safetyRating}/100
                   </span>
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Emotional Distribution</h4>
                    <div className="space-y-3">
                      {batchResult.patterns.map((p, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="capitalize text-slate-700">{p.emotion}</span>
                            <span className="text-slate-400">{p.percentage}% ({p.count})</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 transition-all duration-1000" 
                              style={{ width: `${p.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-2xl p-6 text-white">
                    <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">Trend Reasoning</h4>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"{batchResult.trendReasoning}"</p>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetRegistry;
