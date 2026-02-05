
import React, { useState } from 'react';

const CodeViewer: React.FC = () => {
  const [showTechnical, setShowTechnical] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const codeString = `
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import nlp

# 1. Dataset Loading
dataset = nlp.load_dataset('emotion')
train, test, val = dataset['train'], dataset['test'], dataset['validation']

# 2. Tokenization & Padding
tokenizer = Tokenizer(num_words=10000, oov_token='<UNK>')
tokenizer.fit_on_texts(train['text'])

def get_sequences(tokenizer, tweets):
    sequences = tokenizer.texts_to_sequences(tweets)
    padded = pad_sequences(sequences, truncating='post', padding='post', maxlen=50)
    return padded

# 3. Model Architecture (Bi-LSTM)
model = tf.keras.models.Sequential([
    tf.keras.layers.Embedding(10000, 16, input_length=50),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20, return_sequences=True)),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20)),
    tf.keras.layers.Dense(6, activation='softmax')
])

# 4. Compilation
model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

# 5. Training with Early Stopping
h = model.fit(
    train_padded, train_labels,
    validation_data=(val_padded, val_labels),
    epochs=15,
    callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=2)]
)`;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. Human-readable Introduction */}
      <section className="bg-[#16181c] p-8 rounded-[2rem] border border-[#2f3336] shadow-xl">
        <h2 className="text-2xl font-black text-white mb-4">System Architecture & Logic</h2>
        <p className="text-[#e7e9ea] text-base leading-relaxed">
          The SOURCE view provides a transparent look into how Affecta processes human language. This page outlines the logical journey from a raw text input to a complex emotional insight, ensuring our moderation and inference processes remain open for review.
        </p>
        <div className="mt-6 flex items-center gap-2 text-[#71767b]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest italic">Read-only transparency view</span>
        </div>
      </section>

      {/* 2 & 5. Structured Workflow Steps */}
      <div className="grid grid-cols-1 gap-4">
        {[
          {
            title: "Input Processing",
            desc: "Raw text is cleaned and broken down into tokens. This removes digital noise and prepares the text for mathematical representation.",
            pseudo: "CLEAN(text) -> TOKENIZE -> PAD_TO_FIXED_LENGTH(50)"
          },
          {
            title: "Emotion Inference",
            desc: "Our neural network analyzes the relationship between tokens to predict primary emotional patterns based on global psychological datasets.",
            pseudo: "EMBED(tokens) -> Bi-LSTM_ANALYSIS -> PREDICT_EMOTION_PROBABILITY"
          },
          {
            title: "Safety Classification",
            desc: "The output is cross-referenced against ethical safety guardrails. We calculate a risk score based on intent, toxicity, and context.",
            pseudo: "CALCULATE_RISK(intent) -> IF risk > threshold THEN FLAG_FOR_INTERCEPTION"
          },
          {
            title: "Result Interpretation",
            desc: "Complex data is translated into Key Insights and Situational Scenarios to help users understand the 'why' behind the AI's decision.",
            pseudo: "MAP_VALENCE_AROUSAL -> GENERATE_EXPLAINABLE_INSIGHT"
          }
        ].map((step, i) => (
          <div key={i} className="bg-[#16181c] p-6 rounded-2xl border border-[#2f3336] flex flex-col md:flex-row gap-6 hover:border-[#1d9bf0]/20 transition-colors group">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-[#2f3336] text-[#1d9bf0] font-black text-lg">
              {i + 1}
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="text-sm font-black text-[#eff3f4] uppercase tracking-widest">{step.title}</h3>
              <p className="text-sm text-[#71767b] leading-relaxed">{step.desc}</p>
              <div className="mt-3 p-3 bg-black rounded-lg border border-[#2f3336]/50">
                <code className="text-[11px] font-mono text-[#1d9bf0] opacity-80">{step.pseudo}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Safety Disclaimer */}
      <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl flex gap-3 items-start">
        <span className="text-lg">⚠️</span>
        <p className="text-[11px] text-orange-200/60 leading-relaxed italic">
          <strong>Logic Disclaimer:</strong> The safety classification logic and processing examples provided across this platform are illustrative and synthetic models designed for research transparency. They are not derived from real-time private user data.
        </p>
      </div>

      {/* 3. Toggle for Technical Source */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black text-[#71767b] uppercase tracking-[0.3em]">Technical Implementation</h3>
          <button 
            onClick={() => setShowTechnical(!showTechnical)}
            className="text-[10px] font-black text-[#1d9bf0] uppercase hover:underline flex items-center gap-2"
          >
            {showTechnical ? 'Hide Technical Source' : 'View Technical Source (Advanced)'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${showTechnical ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {showTechnical && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="bg-[#0a0b0c] rounded-2xl overflow-hidden border border-[#2f3336] shadow-2xl">
              <div className="bg-[#16181c] px-6 py-3 flex items-center justify-between border-b border-[#2f3336]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f4212e]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffd400]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ba7c]/50" />
                </div>
                <span className="text-[10px] font-mono text-[#71767b]">affecta_inference_v2.py</span>
              </div>
              <pre className="p-6 text-[12px] font-mono text-indigo-200/80 overflow-x-auto leading-relaxed bg-black/40">
                {codeString}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 6. Researcher's Note Collapsible */}
      <div className="border-t border-[#2f3336] pt-8">
        <button 
          onClick={() => setShowNote(!showNote)}
          className="flex items-center gap-2 text-[#71767b] hover:text-white transition-colors group"
        >
          <div className="w-6 h-6 rounded-full bg-[#16181c] border border-[#2f3336] flex items-center justify-center group-hover:border-[#1d9bf0]/50">
             <span className="text-[10px] font-black">i</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Researcher's Note on Dataset Selection</span>
        </button>
        
        {showNote && (
          <div className="mt-4 p-6 bg-[#16181c] rounded-2xl border border-[#2f3336] animate-in fade-in slide-in-from-left-2 duration-500">
            <p className="text-sm text-[#71767b] leading-relaxed">
              This implementation utilizes standardized emotional datasets for training. The choice of a 50-token sequence length was determined by histogram analysis of digital social data, where 95% of micro-blogging posts fell within this range. The Bidirectional wrapper allows the hidden state to capture semantic dependencies from both directions, which is essential for short, informal text often found on social platforms.
            </p>
          </div>
        )}
      </div>

      {/* 7. Notice */}
      <div className="text-center pt-8 opacity-40">
        <p className="text-[9px] font-bold text-[#71767b] uppercase tracking-[0.4em]">
          Source Integrity • Educational Transparency Only
        </p>
      </div>
    </div>
  );
};

export default CodeViewer;
