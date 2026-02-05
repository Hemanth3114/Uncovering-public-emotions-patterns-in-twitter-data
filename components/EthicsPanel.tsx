
import React from 'react';

const EthicsPanel: React.FC = () => {
  return (
    <div className="p-4 space-y-8 animate-in fade-in duration-700">
      {/* 1. About Affecta Intro Section */}
      <section className="bg-gradient-to-br from-[#1d9bf0]/10 to-indigo-500/5 p-8 rounded-[2.5rem] border border-slate-200 dark:border-[#2f3336] shadow-sm transition-colors">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 transition-colors">About Affecta</h2>
        <p className="text-slate-800 dark:text-[#e7e9ea] text-lg leading-relaxed font-medium transition-colors">
          Affecta is an advanced research platform designed to analyze and understand the complex emotional landscape of public discourse. By processing Twitter data through high-fidelity AI models, we uncover real-time sentiment patterns to provide deeper insights into the digital mood of our society.
        </p>
        <p className="text-slate-500 dark:text-[#71767b] text-sm mt-4 leading-relaxed transition-colors">
          Our core mission is to promote transparency in social data while ensuring that privacy, fairness, and safety remain at the heart of every insight we generate.
        </p>
      </section>

      {/* 2. Responsible AI & Ethics Section */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-grow bg-slate-200 dark:bg-[#2f3336] transition-colors"></div>
        <h3 className="text-[10px] font-black text-slate-400 dark:text-[#71767b] uppercase tracking-[0.3em] whitespace-nowrap transition-colors">Responsible AI & Ethics</h3>
        <div className="h-px flex-grow bg-slate-200 dark:bg-[#2f3336] transition-colors"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3. Simplified Community Safety */}
        <section className="bg-white dark:bg-[#16181c] p-6 rounded-3xl border border-slate-200 dark:border-[#2f3336] hover:border-[#1d9bf0]/30 transition-colors group">
          <div className="w-10 h-10 bg-[#00ba7c]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <span className="text-xl">🛡️</span>
          </div>
          <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white transition-colors">Community Safety</h3>
          <p className="text-sm text-slate-500 dark:text-[#71767b] leading-relaxed transition-colors">
            To maintain a healthy digital environment, our system automatically moderates content to prevent the spread of harmful or abusive language. We ensure only safe and constructive data is included in our public insights.
          </p>
        </section>
        
        {/* 4. Bias Protection with clarification */}
        <section className="bg-white dark:bg-[#16181c] p-6 rounded-3xl border border-slate-200 dark:border-[#2f3336] hover:border-[#1d9bf0]/30 transition-colors group">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <span className="text-xl">⚖️</span>
          </div>
          <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white transition-colors">Bias Protection</h3>
          <p className="text-sm text-slate-500 dark:text-[#71767b] leading-relaxed transition-colors">
            Fairness is critical in AI. Our system is continuously evaluated and refined to reduce bias across language and demographic patterns, respecting the nuance of every community's voice.
          </p>
        </section>
      </div>

      {/* 5. Privacy First clarified */}
      <div className="bg-white dark:bg-[#16181c] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-[#2f3336] shadow-xl transition-colors">
        <div className="p-8">
          <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white transition-colors">Our Core Principles</h3>
          <ul className="space-y-6">
            {[
              { 
                title: "Privacy First", 
                desc: "No tweet or user data is permanently stored. Analysis happens in a temporary, non-persistent context and is cleared immediately after the session ends.", 
                icon: "🔒" 
              },
              { 
                title: "Transparency", 
                desc: "Every emotional verdict is accompanied by linguistic reasoning to explain how the model reached its conclusion.", 
                icon: "👁️" 
              },
              { 
                title: "Scientific Integrity", 
                desc: "Models are benchmarked against established psychological frameworks to ensure the highest possible accuracy.", 
                icon: "🧪" 
              }
            ].map((p, i) => (
              <li key={i} className="flex gap-5 p-5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/10 group">
                <span className="text-3xl shrink-0 group-hover:scale-125 transition-transform">{p.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-[#eff3f4] text-base transition-colors">{p.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-[#71767b] mt-1.5 leading-relaxed transition-colors">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EthicsPanel;
