
export type Emotion = 'joy' | 'sadness' | 'anger' | 'love' | 'fear' | 'surprise';
export type Intent = 'safe' | 'ambiguous' | 'potentially harmful';
export type Action = 'allow' | 'block';

export interface TokenWeight {
  token: string;
  weight: number;
}

export interface AudioProsody {
  tone: string;
  pitch: 'low' | 'neutral' | 'high';
  pace: 'slow' | 'moderate' | 'fast';
  description: string;
}

export interface AnalysisResult {
  emotion: Emotion;
  confidence: number;
  intent: Intent;
  action: Action;
  keyInsight: string;
  scenario: string;
  linguisticReasoning: string;
  valence: number;
  arousal: number;
  emotionalStability: string;
  audioSimulation: AudioProsody;
  safetyJustification: string;
  interpretability: TokenWeight[];
  riskScore: number;
  agentId: string;
  timestamp: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  action: 'INTERCEPTED' | 'PASSED' | 'FLAGGED';
  reason: string;
  tweetSnippet: string;
  summary: string;
  scenario: string;
}

export interface BatchPattern {
  emotion: Emotion;
  percentage: number;
  count: number;
}

export interface BatchAuditResult {
  totalAnalyzed: number;
  safetyRating: number;
  patterns: BatchPattern[];
  dominantEmotion: Emotion;
  trendReasoning: string;
}

export interface ExampleTweet {
  text: string;
  description: string;
}

// Segmented Tabs
export type UserTab = 'analyze' | 'insights' | 'about' | 'source';
export type DevTab = 'safety' | 'registry' | 'eval' | 'system';
export type AppTab = UserTab | DevTab;
