/**
 * Utilities for splitting text into sentences and normalizing for TTS.
 */

/**
 * Splits text into an array of sentences.
 * Handles common abbreviations and edge cases.
 */
export const splitIntoSentences = (text: string): string[] => {
  if (!text) return [];

  // Remove HTML tags for splitting purposes, but we keep the original for display
  const cleanText = text.replace(/<[^>]*>?/gm, '');

  // Regex to split by sentence-ending punctuation followed by space or end of string
  // Handles . ! ? while trying to ignore common abbreviations (e.g., Mr., Dr., etc.)
  // This is a basic version, can be refined.
  const sentences = cleanText
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])|(?<=[.!?])\s*$/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // If splitting failed to find anything, return the whole text as one sentence
  return sentences.length > 0 ? sentences : [cleanText.trim()];
};

/**
 * Normalizes text for speech synthesis by removing symbols or 
 * expanding abbreviations that might confuse the engine.
 * This is used only for the utterance text, not for display.
 */
export const normalizeSpeechText = (text: string): string => {
  if (!text) return '';

  return text
    .replace(/<[^>]*>?/gm, '') // Remove HTML
    .replace(/^Step\s+\d+[:.]?\s*/i, '') // Remove "Step 1:", "Step 2.", etc. prefixes
    .replace(/i\s*CAD/ig, 'eyekad') // Fix pronunciation (supports "iCAD", "i CAD", etc.)
    .replace(/>/g, ' then ') // Replace > with "then" (common in our lessons)
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Calculates the start index of a sentence within the original text.
 * Used to map sentence-level charIndex back to paragraph-level charIndex.
 */
export const getSentenceMapping = (paragraph: string, sentences: string[]) => {
    const cleanParagraph = paragraph.replace(/<[^>]*>?/gm, '');
    let currentOffset = 0;
    
    return sentences.map(sentence => {
        const start = cleanParagraph.indexOf(sentence, currentOffset);
        if (start !== -1) {
            currentOffset = start + sentence.length;
            return {
                text: sentence,
                start: start,
                end: start + sentence.length
            };
        }
        return { text: sentence, start: 0, end: 0 };
    });
};
