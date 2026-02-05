
import React, { useState, useRef, useEffect } from 'react';
import { analyzeTweet, analyzeAudioTweet, analyzeBatch } from './geminiService';
import { AnalysisResult, ExampleTweet, AppTab, BatchAuditResult, AgentLog } from './types';
import Header from './components/Header';
import AnalyzerForm from './components/AnalyzerForm';
import ResultDisplay from './components/ResultDisplay';
import ExampleList from './components/ExampleList';
import ResearchConsole from './components/ResearchConsole';
import MetricsDashboard from './components/MetricsDashboard';
import DatasetRegistry from './components/DatasetRegistry';
import SafetyAgent from './components/SafetyAgent';
import EthicsPanel from './components/EthicsPanel';
import CodeViewer from './components/CodeViewer';
import VisualInsights from './components/VisualInsights';

const EXAMPLES: ExampleTweet[] = [
  { text: "I just got my dream job today, I’m so happy and grateful!", description: "Joy / Safe" },
  { text: "You idiots ruined everything. People like you should just disappear.", description: "Anger / Risky" },
  { text: "I feel so hopeless these days, nothing in my life is working.", description: "Sadness / Risky" },
  { text: "I love my family so much, they always support me.", description: "Love / Safe" },
  { text: "I’m scared of what I might do to them if they keep talking like this.", description: "Fear / Risky" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('analyze');
  const [showAdmin, setShowAdmin] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });
  const [tweet, setTweet] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [batchResult, setBatchResult] = useState<BatchAuditResult | null>(null);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [strictness, setStrictness] = useState(50);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleAnalyze = async (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;
    setLoading(true);
    setResult(null);
    setBatchResult(null);
    setError(null);
    try {
      const data = await analyzeTweet(textToAnalyze);
      const finalAction = data.riskScore >= strictness ? 'block' : 'allow';
      const updatedResult = { ...data, action: finalAction as any };
      setResult(updatedResult);

      const newLog: AgentLog = {
        id: `LOG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date().toLocaleTimeString(),
        action: finalAction === 'block' ? 'INTERCEPTED' : 'PASSED',
        reason: updatedResult.safetyJustification,
        tweetSnippet: textToAnalyze.substring(0, 40) + '...',
        summary: updatedResult.keyInsight,
        scenario: updatedResult.scenario
      };
      setAgentLogs(prev => [newLog, ...prev].slice(0, 10));
    } catch (err: any) {
      setError(err.message || "Inference engine timeout.");
    } finally {
      setLoading(false);
    }
  };

  const handleBatchAnalyze = async (tweets: string[]) => {
    setLoading(true);
    setBatchResult(null);
    setResult(null);
    setError(null);
    try {
      const data = await analyzeBatch(tweets);
      setBatchResult(data);
    } catch (err: any) {
      setError("Batch pattern audit failed.");
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        setLoading(true);
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          try {
            const data = await analyzeAudioTweet(base64);
            setResult(data);
          } catch (err: any) {
            setError("Voice analysis failed.");
          } finally {
            setLoading(false);
          }
        };
      };
      recorder.start();
      mediaRecorder.current = recorder;
      setIsRecording(true);
      setTimeout(() => stopRecording(), 5000);
    } catch (err) {
      setError("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const tabs = [
    { id: 'analyze', label: 'Analyze' },
    { id: 'insights', label: 'Insights' },
    { id: 'about', label: 'About' },
    { id: 'source', label: 'Source' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-[#e7e9ea] flex flex-col font-sans selection:bg-[#1d9bf0]/30 theme-transition">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full flex flex-col">
        <nav className="flex gap-1 bg-white dark:bg-[#16181c] p-1.5 rounded-2xl mb-8 w-full border border-slate-200 dark:border-[#2f3336] shadow-xl dark:shadow-2xl relative z-10 transition-colors">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AppTab)}
              className={`flex-1 px-4 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
                activeTab === tab.id 
                  ? 'bg-[#1d9bf0] text-white shadow-[0_0_20px_rgba(29,155,240,0.5)] scale-[1.02]' 
                  : 'text-slate-500 dark:text-[#71767b] hover:bg-slate-100 dark:hover:bg-[#202327] hover:text-slate-900 dark:hover:text-[#e7e9ea]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'analyze' && (
              <>
                <AnalyzerForm 
                  value={tweet} 
                  onChange={setTweet} 
                  onAnalyze={() => handleAnalyze(tweet)} 
                  isLoading={loading}
                  isRecording={isRecording}
                  onStartRecord={startRecording}
                  onStopRecord={stopRecording}
                />
                {error && <div className="p-4 bg-red-900/10 border border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm animate-pulse">{error}</div>}
                {result && (
                  <>
                    <ResultDisplay result={result} />
                    <VisualInsights result={result} batchResult={null} />
                  </>
                )}
                {batchResult && !result && (
                  <VisualInsights result={null} batchResult={batchResult} />
                )}
              </>
            )}
            
            {activeTab === 'insights' && <MetricsDashboard />}
            {activeTab === 'about' && <EthicsPanel />}
            {activeTab === 'source' && <CodeViewer />}
            
            {activeTab === 'safety' && <SafetyAgent logs={agentLogs} strictness={strictness} />}
            {activeTab === 'registry' && (
              <div className="space-y-8">
                <DatasetRegistry onBatchAnalyze={handleBatchAnalyze} isLoading={loading} batchResult={batchResult} />
                {batchResult && <VisualInsights result={null} batchResult={batchResult} />}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            {showAdmin && (
              <ResearchConsole strictness={strictness} onStrictnessChange={setStrictness} />
            )}
            <ExampleList examples={EXAMPLES} onSelect={(t) => {setTweet(t); handleAnalyze(t);}} />
          </aside>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto w-full px-4 pb-12 mt-12 border-t border-slate-200 dark:border-[#2f3336]/30 pt-8 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 opacity-60 dark:opacity-40">
            <span className="text-[10px] font-black text-slate-500 dark:text-[#71767b] uppercase tracking-[0.2em]">Affecta Intelligence v2.1</span>
            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-[#71767b]"></span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-[#71767b] uppercase tracking-widest">© 2024 Social AI Ethics Lab</span>
          </div>
          
          <button 
            onClick={() => setShowAdmin(!showAdmin)}
            className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
              showAdmin 
              ? 'text-[#1d9bf0] bg-[#1d9bf0]/10 border-[#1d9bf0]' 
              : 'text-slate-500 dark:text-[#71767b] border-slate-200 dark:border-[#2f3336] hover:border-[#1d9bf0]'
            }`}
          >
            {showAdmin ? 'Disable Admin View' : 'Enable Admin View'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
