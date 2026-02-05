
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  // Navigation items updated to use valid AppTab values to resolve type errors
  const navItems: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'analyze', label: 'Home', icon: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/><path d="M20 9.857V5h-4.857L12 1.143 8.857 5H4v4.857L.143 12 4 15.143V20h4.857L12 23.857 15.143 20H20v-4.857L23.857 12 20 9.857zM18 14.143V18h-3.857L12 20.857 9.857 18H6v-3.857L3.143 12 6 9.857V6h3.857L12 3.143 14.143 6H18v3.857L20.857 12 18 14.143z"/></svg> },
    { id: 'safety', label: 'Safety', icon: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg> },
    { id: 'registry', label: 'Datasets', icon: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M19 5v2h-4V5h4M9 5v2H5V5h4m10 8v2h-4v-2h4M9 13v2H5v-2h4m11-9h-6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM10 4H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm10 8h-6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zM10 12H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2z"/></svg> },
    { id: 'about', label: 'Ethics', icon: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg> },
    { id: 'eval', label: 'Stats', icon: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg> },
    { id: 'source', label: 'Code', icon: <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg> },
  ];

  return (
    <aside className="w-[88px] xl:w-[275px] h-screen sticky top-0 flex flex-col items-center xl:items-start p-2 gap-4">
      <div className="p-3 hover:bg-[#181818] rounded-full transition-all cursor-pointer">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#eff3f4]" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>

      <nav className="flex flex-col w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-4 p-3 xl:pr-6 rounded-full hover:bg-[#181818] transition-all group w-fit xl:w-full ${
              activeTab === item.id ? 'font-bold' : 'font-normal'
            }`}
          >
            <div className={`transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-[#eff3f4]' : 'text-[#eff3f4]'}`}>
              {item.icon}
            </div>
            <span className="hidden xl:block text-xl text-[#eff3f4]">{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="hidden xl:block w-[90%] bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold py-4 rounded-full mt-4 transition-all shadow-lg text-lg">
        Analyze
      </button>
      <button className="xl:hidden bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white p-3 rounded-full mt-4 transition-all shadow-lg">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H13V11h-2V9.5h2V7.5h1.5v2H16V11zM1 22h4v-2H1v2z"/></svg>
      </button>
    </aside>
  );
};

export default Sidebar;
