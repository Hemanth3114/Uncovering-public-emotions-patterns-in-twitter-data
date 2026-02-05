
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, BatchAuditResult } from "./types";

const SYSTEM_INSTRUCTION = `You are a Principal Machine Learning Engineer and Responsible AI Architect.
Your task is to perform an 'Advanced Affective & Safety Audit' on Twitter data.

For every tweet, provide a "Clear Scenario Analysis":
- SCENARIO: Describe the specific real-world situational context of this tweet. Identify the social dynamic, the target of the emotion, and the potential real-world consequence if this tweet is allowed vs blocked. This should be a clear, vivid narrative.

Audit Requirements:
1. CLASSIFICATION: (joy, sadness, anger, love, fear, surprise). Confidence (0-1).
2. AFFECTIVE STATE: Valence/Arousal (-1 to 1) and Emotional Stability.
3. EXPLAINABILITY (XAI): Linguistic reasoning and token-level saliency weights.
4. AUDIO PROSODY (Simulated): Tone, pitch, pace.
5. RESPONSIBLE AI: 
   - riskScore (0-100).
   - Action (block if riskScore > 50).
   - safetyJustification: Legal/Ethical reasoning for the decision.

ETHICAL MANDATE: Prioritize bias mitigation and toxicity detection. Block harmful intent immediately.`;

const BATCH_SYSTEM_INSTRUCTION = `You are a Social Data Scientist AI Agent.
Analyze a list of tweets and summarize the collective emotional pattern.
Return JSON with safetyRating (0-100), dominantEmotion, and patterns breakdown.`;

export const analyzeTweet = async (tweetText: string): Promise<AnalysisResult> => {
  // Use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Audit Request: "${tweetText}"`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          emotion: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          intent: { type: Type.STRING },
          action: { type: Type.STRING },
          keyInsight: { type: Type.STRING },
          scenario: { type: Type.STRING },
          linguisticReasoning: { type: Type.STRING },
          valence: { type: Type.NUMBER },
          arousal: { type: Type.NUMBER },
          emotionalStability: { type: Type.STRING },
          audioSimulation: {
            type: Type.OBJECT,
            properties: {
              tone: { type: Type.STRING }, pitch: { type: Type.STRING },
              pace: { type: Type.STRING }, description: { type: Type.STRING }
            },
            required: ["tone", "pitch", "pace", "description"]
          },
          safetyJustification: { type: Type.STRING },
          riskScore: { type: Type.NUMBER },
          agentId: { type: Type.STRING },
          interpretability: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { token: { type: Type.STRING }, weight: { type: Type.NUMBER } },
              required: ["token", "weight"]
            }
          }
        },
        required: [
          "emotion", "confidence", "intent", "action", "keyInsight", "scenario",
          "linguisticReasoning", "valence", "arousal", "emotionalStability", 
          "audioSimulation", "safetyJustification", "interpretability",
          "riskScore", "agentId"
        ]
      }
    }
  });

  if (!response.text) throw new Error("Inference engine failure.");
  const res = JSON.parse(response.text.trim());
  return { ...res, timestamp: new Date().toISOString() };
};

export const analyzeBatch = async (tweets: string[]): Promise<BatchAuditResult> => {
  // Use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Batch Audit: \n\n${tweets.join('\n---\n')}`,
    config: {
      systemInstruction: BATCH_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json"
    }
  });
  if (!response.text) throw new Error("Batch analysis failure.");
  return JSON.parse(response.text.trim());
};

export const analyzeAudioTweet = async (base64Audio: string): Promise<AnalysisResult> => {
  // Use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    contents: {
      parts: [
        { inlineData: { mimeType: 'audio/webm', data: base64Audio } },
        { text: "Safety Agent: Audit this audio. Return JSON." }
      ]
    },
    config: { systemInstruction: SYSTEM_INSTRUCTION, responseMimeType: "application/json" }
  });
  if (!response.text) throw new Error("Audio audit failure.");
  const res = JSON.parse(response.text.trim());
  return { ...res, timestamp: new Date().toISOString() };
};
