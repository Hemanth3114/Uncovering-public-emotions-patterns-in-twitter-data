
import React from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="bg-white/80 dark:bg-black/90 backdrop-blur-xl border-b border-slate-200 dark:border-[#2f3336] sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Custom Affecta Logo: The Affective Pulse */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1d9bf0] to-[#00ba7c] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-black p-2.5 rounded-2xl border border-slate-200 dark:border-[#2f3336] shadow-[0_0_20px_rgba(29,155,240,0.1)] dark:shadow-[0_0_20px_rgba(29,155,240,0.2)] flex-shrink-0 transition-colors">
              <svg 
                viewBox="0 0 100 100" 
                className="h-10 w-10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="10" fill="url(#logo-gradient)" className="opacity-20 animate-pulse" />
                <path 
                  d="M20 80C35 80 40 20 50 20C60 20 65 80 80 80" 
                  stroke="url(#logo-gradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  className="opacity-40"
                />
                <path 
                  d="M20 20C35 20 40 80 50 80C60 80 65 20 80 20" 
                  stroke="url(#logo-gradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                />
                <circle cx="50" cy="50" r="6" fill={theme === 'dark' ? '#000' : '#fff'} stroke="url(#logo-gradient)" strokeWidth="3" />
                <circle cx="50" cy="50" r="2" fill="url(#logo-gradient)" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1d9bf0" />
                    <stop offset="100%" stopColor="#00ba7c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

           <div className="flex flex-col min-w-0 flex-1">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none transition-colors">
              Affecta
            </h1>
            <div className="overflow-hidden whitespace-nowrap mt-1.5 max-w-[200px] md:max-w-xl lg:max-w-2xl">
              <p className="text-[10px] md:text-xs font-bold text-[#1d9bf0] dark:text-[#1d9bf0] uppercase tracking-widest animate-[marquee_20s_linear_infinite] inline-block">
                AN EMBEDDED MULTIMODAL ARTIFICIAL INTELLIGENCE BASED SYSTEM FOR REAL-TIME PUBLIC EMOTION ANALYSIS USING SOCIAL MEDIA DATA STREAMING, EDGE COMPUTING, AND ADAPTIVE EMOTION FUSION
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={onToggleTheme}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-[#16181c] border border-slate-200 dark:border-[#2f3336] hover:border-[#1d9bf0] transition-all group active:scale-90"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <div className="hidden lg:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ba7c] animate-pulse shadow-[0_0_8px_rgba(0,186,124,0.4)]"></span>
              <span className="text-[10px] font-black text-slate-800 dark:text-[#e7e9ea] uppercase tracking-[0.2em] transition-colors">
                Pulse-Shield Active
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-[#71767b] border-t border-slate-200 dark:border-[#2f3336] pt-1 mt-1 transition-colors">
              Built for ethical social data transparency
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
