"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { calculateStats, getCharacterStatuses, type TypingStats } from "@/lib/typing";
import { generateWords, getRandomQuote } from "@/lib/words";
import { RotateCcw, Globe, MousePointer2, Trophy, Target, Zap, Clock, Check } from "lucide-react";

type TestMode = "time" | "words" | "quote" | "zen";
type TimeLimit = 15 | 30 | 60 | 120;
type WordCount = 10 | 25 | 50 | 100;

interface TestConfig {
  mode: TestMode;
  timeLimit: TimeLimit;
  wordCount: WordCount;
  punctuation: boolean;
  numbers: boolean;
}

export function TypingTest() {
  const [config, setConfig] = useState<TestConfig>({
    mode: "time",
    timeLimit: 30,
    wordCount: 25,
    punctuation: false,
    numbers: false,
  });
  
  const [text, setText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(config.timeLimit);
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [liveStats, setLiveStats] = useState({ wpm: 0, acc: 100 });
  const [resultSaved, setResultSaved] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const generateText = useCallback(() => {
    if (config.mode === "quote") {
      return getRandomQuote();
    }
    return generateWords(config.mode === "time" ? 100 : config.wordCount);
  }, [config.mode, config.wordCount]);

  const saveResult = useCallback(async (calculatedStats: TypingStats) => {
    try {
      const response = await fetch("/api/results/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wpm: calculatedStats.wpm,
          rawWpm: calculatedStats.rawWpm,
          accuracy: calculatedStats.accuracy,
          testMode: config.mode,
          testDuration: config.mode === "time" ? config.timeLimit : Math.round(calculatedStats.time),
          wordCount: config.mode === "words" ? config.wordCount : null,
          correctChars: calculatedStats.correct,
          incorrectChars: calculatedStats.incorrect,
        }),
      });
      if (response.ok) {
        setResultSaved(true);
      }
    } catch (error) {
      console.error("Failed to save result:", error);
    }
  }, [config.mode, config.timeLimit, config.wordCount]);

  const resetTest = useCallback(() => {
    setTypedText("");
    setIsActive(false);
    setIsFinished(false);
    setStartTime(null);
    setTimeLeft(config.timeLimit);
    setStats(null);
    setLiveStats({ wpm: 0, acc: 100 });
    setResultSaved(false);
    setText(generateText());
    setTimeout(() => {
      inputRef.current?.focus();
      setIsFocused(true);
    }, 50);
  }, [generateText, config.timeLimit]);

  useEffect(() => {
    resetTest();
  }, [config.mode, config.wordCount, config.timeLimit]);

  useEffect(() => {
    if (!isActive || isFinished) return;
    
    const interval = setInterval(() => {
      if (startTime) {
        const elapsed = (Date.now() - startTime) / 1000;
        
        if (config.mode === "time") {
          const remaining = Math.max(0, config.timeLimit - elapsed);
          setTimeLeft(remaining);
          
          if (remaining <= 0) {
            finishTest(typedText, text, config.timeLimit);
            return;
          }
        }

        const correctChars = typedText.split("").filter((c, i) => c === text[i]).length;
        const wpm = elapsed > 0 ? Math.round((correctChars / 5 / elapsed) * 60) : 0;
        const acc = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100;
        setLiveStats({ wpm, acc });
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isActive, isFinished, startTime, config.mode, config.timeLimit, typedText, text]);

  const finishTest = (typed: string, original: string, time: number) => {
    setIsFinished(true);
    setIsActive(false);
    const calculatedStats = calculateStats(typed, original, time);
    setStats(calculatedStats);
    saveResult(calculatedStats);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }
    
    setTypedText(value);
    
    if (config.mode !== "time" && value.length >= text.length) {
      const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
      finishTest(value, text, timeElapsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      resetTest();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const characterStatuses = getCharacterStatuses(typedText, text);
  const currentIndex = typedText.length;

  const words = text.split(" ");
  let charCount = 0;
  const wordsWithMeta = words.map((word, idx) => {
    const start = charCount;
    charCount += word.length + 1;
    return { word, start, end: charCount - 1 };
  });

  const currentWordIndex = wordsWithMeta.findIndex(w => currentIndex >= w.start && currentIndex <= w.end);

  if (isFinished && stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[55vh] gap-6 px-4 animate-fadeIn">
        <div className="bg-[#252525] rounded-2xl p-8 w-full max-w-2xl border border-[#333]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-[#888]">Test Complete</h2>
            {resultSaved && (
              <div className="flex items-center gap-2 text-[#4ade80] text-sm bg-[#4ade80]/10 px-3 py-1.5 rounded-full">
                <Check size={14} />
                <span>Result saved</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1e1e1e] rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-[#646669] mb-2">
                <Zap size={16} />
                <span className="text-xs uppercase tracking-wider">WPM</span>
              </div>
              <div className="text-5xl font-bold text-[#ffc800]">{Math.round(stats.wpm)}</div>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-[#646669] mb-2">
                <Target size={16} />
                <span className="text-xs uppercase tracking-wider">Accuracy</span>
              </div>
              <div className="text-5xl font-bold text-[#ffc800]">{Math.round(stats.accuracy)}%</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#d0d0d0]">{Math.round(stats.rawWpm)}</div>
              <div className="text-xs text-[#646669] uppercase tracking-wider mt-1">Raw WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#d0d0d0]">{stats.time.toFixed(1)}s</div>
              <div className="text-xs text-[#646669] uppercase tracking-wider mt-1">Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#4ade80]">{stats.correct}</div>
              <div className="text-xs text-[#646669] uppercase tracking-wider mt-1">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#f87171]">{stats.incorrect}</div>
              <div className="text-xs text-[#646669] uppercase tracking-wider mt-1">Errors</div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={resetTest} 
              className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-[#d0d0d0] rounded-lg hover:bg-[#3d3d3d] transition-all duration-150 hover:scale-105 active:scale-95"
            >
              <RotateCcw size={16} />
              <span>Next Test</span>
            </button>
          </div>
        </div>
        
        <p className="text-[#646669] text-sm">
          Press <kbd className="bg-[#2d2d2d] px-2 py-0.5 rounded text-[#d0d0d0] font-mono text-xs mx-1">Tab</kbd> to restart
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4">
      <TestConfigBar config={config} setConfig={setConfig} />

      <div className="flex items-center gap-2 text-[#646669] hover:text-[#888888] transition-colors duration-150 cursor-pointer text-sm">
        <Globe size={14} />
        <span>english</span>
      </div>

      {isActive && (
        <div className="flex gap-6 text-2xl font-mono text-[#ffc800] animate-fadeIn">
          {config.mode === "time" && <span>{Math.ceil(timeLeft)}</span>}
          <span>{liveStats.wpm}</span>
          <span className="text-[#888888]">{liveStats.acc}%</span>
        </div>
      )}

      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="relative w-full max-w-[900px] cursor-text"
      >
        {!isFocused && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1e1e1e]/90 rounded-lg backdrop-blur-sm animate-fadeIn">
            <MousePointer2 className="mb-2 text-[#646669]" size={24} />
            <span className="text-sm text-[#888888]">Click here or press any key to focus</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-text z-10"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          disabled={isFinished}
        />
        
        <div 
          ref={wordsRef}
          className="text-[28px] md:text-[32px] leading-[1.6] font-mono select-none overflow-hidden will-change-contents"
          style={{ maxHeight: "160px" }}
        >
          {wordsWithMeta.map((wordMeta, wIdx) => {
            const isCurrentWord = wIdx === currentWordIndex;
            const isPastWord = wIdx < currentWordIndex;
            
            return (
              <span key={wIdx} className="inline-block mr-3 mb-1 will-change-transform">
                {wordMeta.word.split("").map((char, cIdx) => {
                  const globalIdx = wordMeta.start + cIdx;
                  const status = characterStatuses[globalIdx] || "pending";
                  const isCursor = globalIdx === currentIndex && isFocused;
                  
                  let colorClass = "text-[#646669]";
                  if (status === "correct") colorClass = "text-[#d0d0d0]";
                  if (status === "incorrect") colorClass = "text-[#ca4754] bg-[#ca4754]/20";
                  if (status === "extra") colorClass = "text-[#7e2a33] bg-[#7e2a33]/20";
                  
                  return (
                    <span 
                      key={cIdx} 
                      className={`relative transition-[color,background-color] duration-[50ms] ease-out ${colorClass}`}
                      style={{ willChange: 'color, background-color' }}
                    >
                      {isCursor && (
                        <span 
                          className="absolute left-0 top-[2px] w-[2px] h-[1.2em] bg-[#ffc800] rounded-sm animate-caret-smooth" 
                          style={{ willChange: 'opacity' }}
                        />
                      )}
                      {char}
                    </span>
                  );
                })}
                {isCurrentWord && currentIndex === wordMeta.end && isFocused && (
                  <span className="relative">
                    <span 
                      className="absolute left-0 top-[2px] w-[2px] h-[1.2em] bg-[#ffc800] rounded-sm animate-caret-smooth" 
                      style={{ willChange: 'opacity' }}
                    />
                  </span>
                )}
              </span>
            );
          })}
          {typedText.length > text.length && (
            <span className="text-[#7e2a33] bg-[#7e2a33]/20">
              {typedText.slice(text.length)}
            </span>
          )}
        </div>
      </div>

      <button 
        onClick={resetTest} 
        className="flex items-center gap-2 mt-4 text-[#646669] hover:text-[#888888] transition-all duration-150 hover:scale-105 active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <style jsx global>{`
        @keyframes caret-smooth {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-caret-smooth {
          animation: caret-smooth 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

function TestConfigBar({ config, setConfig }: { config: TestConfig; setConfig: React.Dispatch<React.SetStateAction<TestConfig>> }) {
  const buttonBase = "px-2.5 py-1.5 text-[13px] font-medium transition-all duration-150 hover:scale-105 active:scale-95";
  const active = "text-[#ffc800]";
  const inactive = "text-[#646669] hover:text-[#888888]";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-[#2d2d2d] rounded-lg px-3 py-2">
      <div className="flex items-center gap-1 border-r border-[#404040] pr-3 mr-1">
        <button
          onClick={() => setConfig(c => ({ ...c, punctuation: !c.punctuation }))}
          className={`${buttonBase} ${config.punctuation ? active : inactive}`}
        >
          @ punctuation
        </button>
        <button
          onClick={() => setConfig(c => ({ ...c, numbers: !c.numbers }))}
          className={`${buttonBase} ${config.numbers ? active : inactive}`}
        >
          # numbers
        </button>
      </div>

      <div className="flex items-center gap-1 border-r border-[#404040] pr-3 mr-1">
        {(["time", "words", "quote", "zen"] as TestMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setConfig(c => ({ ...c, mode }))}
            className={`${buttonBase} ${config.mode === mode ? active : inactive}`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        {config.mode === "time" && (
          [15, 30, 60, 120].map(time => (
            <button
              key={time}
              onClick={() => setConfig(c => ({ ...c, timeLimit: time as TimeLimit }))}
              className={`${buttonBase} min-w-[28px] ${config.timeLimit === time ? active : inactive}`}
            >
              {time}
            </button>
          ))
        )}
        {config.mode === "words" && (
          [10, 25, 50, 100].map(count => (
            <button
              key={count}
              onClick={() => setConfig(c => ({ ...c, wordCount: count as WordCount }))}
              className={`${buttonBase} min-w-[28px] ${config.wordCount === count ? active : inactive}`}
            >
              {count}
            </button>
          ))
        )}
      </div>
    </div>
  );
}