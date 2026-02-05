
import React from 'react';
import { AgentLog } from '../types';

interface SafetyAgentProps {
  logs: AgentLog[];
  strictness: number;
}

const SafetyAgent: React.FC<SafetyAgentProps> = ({ logs, strictness }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-[#16181c] p-6 rounded-2xl border border-[#2f3336]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#1d9bf0]/10 flex items-center justify-center border border-[#1d9bf0]/30 shadow-2xl">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#1d9bf0]" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Autonomous Shield v2.1</h2>
            <p className="text-sm text-[#71767b]">Active Monitoring: {strictness}% Sensitivity</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-black p-4 rounded-xl border border-[#2f3336]">
              <span className="text-[10px] font-bold text-[#71767b] uppercase block">Uptime</span>
              <span className="text-lg font-bold text-[#00ba7c]">99.98%</span>
           </div>
           <div className="bg-black p-4 rounded-xl border border-[#2f3336]">
              <span className="text-[10px] font-bold text-[#71767b] uppercase block">Latency</span>
              <span className="text-lg font-bold text-[#1d9bf0]">120ms</span>
           </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-bold px-2">Recent Interventions</h3>
        {logs.length === 0 ? (
          <div className="py-20 text-center text-[#71767b]">
            <p className="text-sm italic">The stream is currently quiet. No intercepts logged.</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-[#16181c] rounded-2xl border border-[#2f3336] p-4 animate-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                  log.action === 'INTERCEPTED' 
                    ? 'bg-red-500/10 text-red-500 border-red-500/30' 
                    : 'bg-[#00ba7c]/10 text-[#00ba7c] border-[#00ba7c]/30'
                }`}>
                  {log.action}
                </span>
                <span className="text-[10px] text-[#71767b] font-mono">{log.timestamp}</span>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm italic text-[#71767b] border-l-2 border-[#2f3336] pl-3 py-1">
                  "{log.tweetSnippet}"
                </p>
                <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold text-[#1d9bf0] uppercase block mb-1">Agent Reasoning</span>
                  <p className="text-sm font-medium leading-relaxed">{log.summary}</p>
                </div>
                <p className="text-xs text-[#71767b]">
                  <span className="font-bold">Verdict:</span> {log.reason}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SafetyAgent;
