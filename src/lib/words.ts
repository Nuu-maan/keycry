export const wordLists = {
  common: [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
    "world", "life", "hand", "part", "child", "eye", "woman", "place", "case", "week",
    "company", "system", "program", "question", "government", "number", "night", "point", "home", "water",
    "room", "mother", "area", "money", "story", "fact", "month", "lot", "right", "study",
    "book", "word", "business", "issue", "side", "kind", "head", "house", "service", "friend",
    "father", "power", "hour", "game", "line", "end", "member", "law", "car", "city",
    "community", "name", "president", "team", "minute", "idea", "body", "information", "back", "parent",
    "face", "others", "level", "office", "door", "health", "person", "art", "war", "history",
    "party", "result", "change", "morning", "reason", "research", "girl", "guy", "moment", "air",
    "teacher", "force", "education", "computer", "software", "developer", "keyboard", "screen", "mouse", "type"
  ],
  quotes: [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Fortune favors the bold.",
    "Actions speak louder than words.",
    "Practice makes perfect.",
    "Better late than never.",
    "Every cloud has a silver lining.",
    "Honesty is the best policy.",
    "The only thing we have to fear is fear itself.",
    "In the middle of difficulty lies opportunity.",
    "Life is what happens when you're busy making other plans.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It does not matter how slowly you go as long as you do not stop."
  ]
};

export function generateWords(count: number): string {
  const words: string[] = [];
  const source = wordLists.common;
  for (let i = 0; i < count; i++) {
    words.push(source[Math.floor(Math.random() * source.length)]);
  }
  return words.join(" ");
}

export function getRandomQuote(): string {
  return wordLists.quotes[Math.floor(Math.random() * wordLists.quotes.length)];
}
