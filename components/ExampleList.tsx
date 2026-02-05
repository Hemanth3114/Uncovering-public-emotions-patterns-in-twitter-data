
import React from 'react';
import { ExampleTweet } from '../types';

interface ExampleListProps {
  examples: ExampleTweet[];
  onSelect: (text: string) => void;
}

const ExampleList: React.FC<ExampleListProps> = ({ examples, onSelect }) => {
  return (
    <div className="bg-white dark:bg-[#16181c] p-6 rounded-2xl border border-slate-200 dark:border-[#2f3336] shadow-xl transition-colors">
      <h3 className="text-sm font-black text-slate-500 dark:text-[#71767b] uppercase tracking-widest mb-1">Safety Examples</h3>
      <p className="text-[10px] text-slate-400 dark:text-[#71767b] font-medium leading-tight mb-4">
        Example texts demonstrating how our system classifies content for emotional safety and moderation.
      </p>
      <div className="space-y-3">
        {examples.map((example, i) => (
          <button
            key={i}
            onClick={() => onSelect(example.text)}
            className="w-full p-4 bg-slate-50 dark:bg-black hover:bg-slate-100 dark:hover:bg-[#202327] border border-slate-200 dark:border-[#2f3336] rounded-xl text-left transition-all group shadow-sm"
          >
            <p className="text-sm text-slate-800 dark:text-[#e7e9ea] line-clamp-2 mb-2 group-hover:text-[#1d9bf0] transition-colors">{example.text}</p>
            <span className="text-[10px] font-bold text-slate-400 dark:text-[#71767b] uppercase group-hover:text-[#1d9bf0]/70">{example.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleList;
