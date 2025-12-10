import React from "react";
import { Lock, Globe, MousePointer2 } from "lucide-react";

export default function TypingArea() {
  const [typedHistory, setTypedHistory] = React.useState<string>("");
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [letterIndex, setLetterIndex] = React.useState(0);
  const [isFocused, setIsFocused] = React.useState(true);
  const [cursorPos, setCursorPos] = React.useState({ top: 0, left: 0 });
  const [capsLock, setCapsLock] = React.useState(false);
  const [stats, setStats] = React.useState({ time: 0, wpm: 0, acc: 100, burst: 0 });
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const wordsContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const activeLetterRef = React.useRef<HTMLSpanElement | null>(null);

  // Sample text based on the provided HTML content
  const wordsList = [
    "set", "own", "man", "want", "more", "through", "follow", "face", "must", "might", 
    "word", "general", "also", "out", "run", "the", "if", "work", "real", "state", 
    "own", "large", "play", "in", "person", "help", "use", "face", "they", "well", 
    "make", "too", "however", "if", "place", "many", "eye", "early", "where", "which",
    "face", "more", "on", "end", "they", "all", "no", "lead", "turn", "line",
    "need", "want", "turn", "general", "same", "other", "take", "good", "people", "one"
  ];

  // Helper to flatten logic for cursor positioning
  const updateCursorPosition = React.useCallback(() => {
    if (activeLetterRef.current && wordsContainerRef.current) {
      const letterRect = activeLetterRef.current.getBoundingClientRect();
      const containerRect = wordsContainerRef.current.getBoundingClientRect();
      
      setCursorPos({
        top: letterRect.top - containerRect.top + 4, // adjustment for visual centering
        left: letterRect.left - containerRect.left
      });
    } else if (wordsContainerRef.current) {
      // Fallback for end of word or start
      // This part is simplified; a real engine handles this robustly
      const wordEls = wordsContainerRef.current.querySelectorAll('.word');
      const currentWordEl = wordEls[wordIndex];
      if (currentWordEl) {
          const letters = currentWordEl.querySelectorAll('letter');
          if (letterIndex < letters.length) {
              const letterRect = letters[letterIndex].getBoundingClientRect();
              const containerRect = wordsContainerRef.current.getBoundingClientRect();
              setCursorPos({
                  top: letterRect.top - containerRect.top + 5,
                  left: letterRect.left - containerRect.left
              });
          } else {
             // Cursor at end of word
             const lastLetter = letters[letters.length - 1];
             if (lastLetter) {
                const letterRect = lastLetter.getBoundingClientRect();
                const containerRect = wordsContainerRef.current.getBoundingClientRect();
                setCursorPos({
                    top: letterRect.top - containerRect.top + 5,
                    left: letterRect.right - containerRect.left
                });
             }
          }
      }
    }
  }, [wordIndex, letterIndex]);

  // Handle Resize
  React.useEffect(() => {
    window.addEventListener('resize', updateCursorPosition);
    return () => window.removeEventListener('resize', updateCursorPosition);
  }, [updateCursorPosition]);

  // Update cursor on index change
  React.useEffect(() => {
    // Small timeout to allow layout to settle if DOM just changed
    const timeout = setTimeout(updateCursorPosition, 0);
    return () => clearTimeout(timeout);
  }, [wordIndex, letterIndex, updateCursorPosition]);

  // Update Stats Effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && isFocused) {
      interval = setInterval(() => {
        const now = Date.now();
        const diffInMinutes = (now - startTime) / 60000;
        const correctChars = typedHistory.length; // Simplified
        const currentWpm = Math.round((correctChars / 5) / diffInMinutes) || 0;
        
        setStats(prev => ({
          ...prev,
          time: Math.floor((now - startTime) / 1000),
          wpm: currentWpm,
          acc: 100, // Simplified accuracy
          burst: currentWpm // Simplified burst
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, typedHistory, isFocused]);

  // Focus Handler
  const handleFocus = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Start timer on first keypress
    if (!startTime && /^[a-zA-Z0-9]$/.test(e.key)) {
      setStartTime(Date.now());
    }

    setCapsLock(e.getModifierState("CapsLock"));

    // Prevent default scrolling for Space
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const char = val.slice(-1);
    
    // Logic for typing
    // Reset input value to keep it empty/clean
    e.target.value = '';

    const currentWord = wordsList[wordIndex];

    if (val === ' ' || char === ' ') {
      // Space key pressed
      if (wordIndex < wordsList.length - 1) {
        setWordIndex(prev => prev + 1);
        setLetterIndex(0);
        setTypedHistory(prev => prev + ' ');
      }
      return;
    }

    // Typical character input
    // In a real app we'd check correctness here
    if (char) {
      if (letterIndex < currentWord.length) {
        setLetterIndex(prev => prev + 1);
        setTypedHistory(prev => prev + char);
      } else {
         // Overtyping logic could go here
         // For now, just allow typing up to word length + 5 (monkeytype behavior)
         // But to keep simple, we limit to word length roughly in this visual clone
         setLetterIndex(prev => prev + 1); 
         setTypedHistory(prev => prev + char);
      }
    }
  };

  // Click to focus
  React.useEffect(() => {
    const handleClick = () => {
        inputRef.current?.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <section 
        className="relative flex flex-col items-center justify-center w-full min-h-[calc(100vh-200px)] p-8 bg-[#1e1e1e] text-[#d0d0d0] font-mono overflow-hidden"
        onClick={handleFocus}
    >
      {/* Caps Lock Warning */}
      <div 
        className={`bg-[#ffc800] text-[#1e1e1e] px-4 py-2 rounded-md font-semibold text-sm mb-8 flex items-center gap-2 transition-opacity duration-200 ${capsLock ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Lock size={16} />
        Caps Lock
      </div>

      {/* Language Mode Indicator */}
      <div className="mb-4 text-[#646669] hover:text-[#d0d0d0] transition-colors duration-200 cursor-pointer text-sm font-medium flex items-center gap-2">
        <Globe size={14} />
        english
      </div>

       {/* Live Stats (Fixed position visually in context or top right of container) */}
       {/* Usually Monkeytype shows these as plain text numbers during typing */}
       <div 
        className={`fixed top-[150px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-[160px] md:right-32 flex gap-4 text-xl font-mono text-[#ffc800] transition-opacity duration-300 ${startTime ? 'opacity-100' : 'opacity-0'}`}
       >
         <div className="flex flex-col items-end leading-none">
            <span className="text-xs text-[#646669] mb-1">time</span>
            <span>{stats.time}</span>
         </div>
         <div className="flex flex-col items-end leading-none">
            <span className="text-xs text-[#646669] mb-1">wpm</span>
            <span>{stats.wpm}</span>
         </div>
         <div className="flex flex-col items-end leading-none">
            <span className="text-xs text-[#646669] mb-1">acc</span>
            <span>{stats.acc}%</span>
         </div>
       </div>

      {/* Main Words Container */}
      <div className="relative w-full max-w-[1000px] mt-8" ref={containerRef}>
        
        {/* Helper message when out of focus */}
        {!isFocused && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1e1e1e]/80 text-[#d0d0d0] rounded-lg backdrop-blur-[2px]">
            <MousePointer2 className="mb-2 text-[#646669]" size={24} />
            <span className="text-sm font-medium">Click here or press any key to focus</span>
          </div>
        )}

        {/* Hidden Input for Capturing Typing */}
        <textarea 
            ref={inputRef}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-default resize-none z-10"
            onKeyDown={handleKeyDown}
            onChange={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
        />

        {/* Caret */}
        <div 
            className={`absolute w-[2px] h-[1.5em] bg-[#ffc800] rounded-sm transition-all duration-100 ease-out z-10 ${!isFocused ? 'hidden' : 'animate-pulse'}`}
            style={{
                top: cursorPos.top,
                left: cursorPos.left,
                animationDuration: '1s'
            }}
        />

        {/* Words Display */}
        <div 
            ref={wordsContainerRef}
            className="flex flex-wrap text-[32px] leading-[1.5] text-[#646669] select-none"
            style={{ 
              maxWidth: '100%', 
              wordSpacing: '0.2em' // slightly adjusted for visual match
            }}
        >
          {wordsList.map((word, wIdx) => {
            const isActiveWord = wIdx === wordIndex;
             // Determine if word has been visited
            const isPastWord = wIdx < wordIndex;

            return (
              <div 
                key={wIdx} 
                className={`word mr-4 mb-2 flex relative ${isPastWord ? 'text-[#d0d0d0]' : ''}`}
              >
                {word.split('').map((char, cIdx) => {
                    const isActiveLetter = isActiveWord && cIdx === letterIndex;
                    const isTypedLetter = isActiveWord && cIdx < letterIndex;
                    
                    // Logic to check correctness would go here (omitted for visual clone simplicity)
                    // We assume valid typing for the clone demo color
                    const colorClass = isPastWord 
                        ? 'text-[#d0d0d0]' // finished words
                        : isTypedLetter 
                            ? 'text-[#d0d0d0]' // current word typed chars
                            : 'text-[#646669]'; // untyped chars

                    return (
                        <span 
                            key={cIdx} 
                            ref={isActiveLetter ? activeLetterRef : null}
                            className={`letter relative ${colorClass}`}
                        >
                            {char}
                        </span>
                    );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Instructions (Subtle) */}
      <div className="fixed bottom-12 flex gap-4 text-[10px] text-[#646669] font-mono opacity-60">
        <span className="flex items-center gap-1 bg-[#2d2d2d] px-2 py-1 rounded">
            <span className="bg-[#d0d0d0] text-[#1e1e1e] px-1 rounded text-[9px] font-bold">tab</span>
            +
            <span className="bg-[#d0d0d0] text-[#1e1e1e] px-1 rounded text-[9px] font-bold">enter</span>
            <span>restart test</span>
        </span>
        <span className="flex items-center gap-1 bg-[#2d2d2d] px-2 py-1 rounded">
            <span className="bg-[#d0d0d0] text-[#1e1e1e] px-1 rounded text-[9px] font-bold">esc</span>
            <span>-</span>
            <span>command line</span>
        </span>
      </div>
    </section>
  );
}