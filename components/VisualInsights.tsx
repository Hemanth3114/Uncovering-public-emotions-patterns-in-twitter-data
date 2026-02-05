
import React from 'react';
import { AnalysisResult, BatchAuditResult, Emotion } from '../types';

interface VisualInsightsProps {
  result: AnalysisResult | null;
  batchResult: BatchAuditResult | null;
}

const EMOTION_COLORS: Record<Emotion, string> = {
  joy: '#00ba7c',
  sadness: '#1d9bf0',
  anger: '#f4212e',
  love: '#f91880',
  fear: '#ffd400',
  surprise: '#7856ff'
};

const VisualInsights: React.FC<VisualInsightsProps> = ({ result, batchResult }) => {
  if (!result && !batchResult) return null;

  const getPieData = () => {
    if (batchResult) {
      return batchResult.patterns.map(p => ({
        label: p.emotion,
        value: p.percentage,
        color: EMOTION_COLORS[p.emotion] || '#1d9bf0'
      }));
    }
    if (result) {
      return [
        { label: result.emotion, value: result.confidence * 100, color: EMOTION_COLORS[result.emotion] },
        { label: 'Other', value: (1 - result.confidence) * 100, color: '#94a3b8' }
      ];
    }
    return [];
  };

  const pieData = getPieData();
  let cumulativePercent = 0;
  const pieSlices = pieData.map((slice) => {
    const startPercent = cumulativePercent;
    cumulativePercent += slice.value;
    const getCoordinatesForPercent = (percent: number) => {
      const x = Math.cos(2 * Math.PI * percent / 100);
      const y = Math.sin(2 * Math.PI * percent / 100);
      return [x, y];
    };
    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = slice.value > 50 ? 1 : 0;
    return (
      <path
        key={slice.label}
        d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`}
        fill={slice.color}
        className="transition-all duration-500 hover:opacity-80 cursor-pointer"
      />
    );
  });

  return (
    <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-grow bg-slate-200 dark:bg-[#2f3336] transition-colors"></div>
        <h2 className="text-[10px] font-black text-slate-400 dark:text-[#71767b] uppercase tracking-[0.3em] whitespace-nowrap transition-colors">Visual Insights</h2>
        <div className="h-px flex-grow bg-slate-200 dark:bg-[#2f3336] transition-colors"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#16181c] p-6 rounded-3xl border border-slate-200 dark:border-[#2f3336] shadow-xl flex flex-col items-center transition-colors">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 self-start transition-colors">Emotion Distribution</h3>
          <div className="relative w-40 h-40">
            <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
              {pieSlices}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white dark:bg-[#16181c] rounded-full border border-slate-200 dark:border-[#2f3336] flex flex-col items-center justify-center transition-colors">
                <span className="text-[10px] font-bold text-slate-400 dark:text-[#71767b] uppercase transition-colors">Primary</span>
                <span className="text-sm font-black text-slate-900 dark:text-white capitalize transition-colors">
                  {batchResult ? batchResult.dominantEmotion : result?.emotion}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 w-full">
            {pieData.map(slice => (
              <div key={slice.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: slice.color }}></div>
                <span className="text-[10px] font-medium text-slate-500 dark:text-[#71767b] capitalize transition-colors">{slice.label}: {slice.value.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#16181c] p-6 rounded-3xl border border-slate-200 dark:border-[#2f3336] shadow-xl flex flex-col transition-colors">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 transition-colors">Sentiment Intensity</h3>
          <div className="flex-grow flex flex-col justify-center space-y-6">
            {result ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-[#1d9bf0]">Emotional Positivity</span>
                    <span className="text-slate-900 dark:text-white transition-colors">{((result.valence + 1) * 50).toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-black rounded-full overflow-hidden border border-slate-200 dark:border-[#2f3336] transition-colors">
                    <div className="h-full bg-gradient-to-r from-red-500 via-gray-400 dark:via-gray-500 to-[#1d9bf0] transition-all duration-1000" style={{ width: `${(result.valence + 1) * 50}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-orange-500">Emotional Intensity</span>
                    <span className="text-slate-900 dark:text-white transition-colors">{(result.arousal * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-black rounded-full overflow-hidden border border-slate-200 dark:border-[#2f3336] transition-colors">
                    <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${result.arousal * 100}%` }} />
                  </div>
                </div>
              </>
            ) : batchResult ? (
               <div className="space-y-4">
                 <div className="p-4 bg-slate-50 dark:bg-black rounded-2xl border border-slate-200 dark:border-[#2f3336] flex justify-between items-center transition-colors">
                    <span className="text-[10px] font-black text-slate-400 dark:text-[#71767b] uppercase transition-colors">Global Safety</span>
                    <span className="text-xl font-black text-[#00ba7c]">{batchResult.safetyRating}%</span>
                 </div>
               </div>
            ) : null}
          </div>
        </div>

        <div className="bg-white dark:bg-[#16181c] p-6 rounded-3xl border border-slate-200 dark:border-[#2f3336] border-dashed shadow-xl flex flex-col items-center justify-center text-center opacity-60 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300 dark:text-[#2f3336] mb-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <p className="text-[10px] font-bold text-slate-400 dark:text-[#71767b] uppercase tracking-widest leading-relaxed transition-colors">
            Trend data restricted<br/>for academic sessions
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualInsights;
