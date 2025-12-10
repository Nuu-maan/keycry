export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  characters: number;
  time: number;
}

export function calculateStats(
  typedText: string,
  originalText: string,
  timeInSeconds: number
): TypingStats {
  const typedChars = typedText.length;
  const minLen = Math.min(typedText.length, originalText.length);
  
  let correct = 0;
  let incorrect = 0;
  
  for (let i = 0; i < minLen; i++) {
    if (typedText[i] === originalText[i]) {
      correct++;
    } else {
      incorrect++;
    }
  }
  
  incorrect += Math.abs(typedText.length - originalText.length);
  
  const rawWpm = timeInSeconds > 0 ? (typedChars / 5 / timeInSeconds) * 60 : 0;
  const wpm = timeInSeconds > 0 ? (correct / 5 / timeInSeconds) * 60 : 0;
  const accuracy = typedChars > 0 ? (correct / typedChars) * 100 : 0;
  
  return {
    wpm: Math.round(wpm * 100) / 100,
    rawWpm: Math.round(rawWpm * 100) / 100,
    accuracy: Math.round(accuracy * 100) / 100,
    correct,
    incorrect,
    characters: typedChars,
    time: Math.round(timeInSeconds * 100) / 100
  };
}

export type CharacterStatus = "correct" | "incorrect" | "pending" | "extra";

export function getCharacterStatuses(
  typedText: string,
  originalText: string
): CharacterStatus[] {
  const statuses: CharacterStatus[] = [];
  
  for (let i = 0; i < originalText.length; i++) {
    if (i >= typedText.length) {
      statuses.push("pending");
    } else if (typedText[i] === originalText[i]) {
      statuses.push("correct");
    } else {
      statuses.push("incorrect");
    }
  }
  
  for (let i = originalText.length; i < typedText.length; i++) {
    statuses.push("extra");
  }
  
  return statuses;
}
