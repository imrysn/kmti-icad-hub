export const buildKnowledgeCheckNarration = (question: string, choices: string[]) => {
  const narratedChoices = choices
    .map((choice, index) => `Choice ${index + 1}: ${choice}.`)
    .join(' ');

  return `Now, let's do a knowledge check. ${question} Choose one answer. ${narratedChoices}`.trim();
};

export const buildAnswerFeedbackNarration = (isCorrect: boolean, feedback: string) => {
  const trimmedFeedback = feedback.trim();

  if (isCorrect) {
    // Feedback authored by individual lessons may already contain one or more
    // leading "Correct" announcements. Normalize them so TTS says it once.
    const explanation = trimmedFeedback
      .replace(/^(?:correct\s*[!.]?\s*)+/i, '')
      .trim();
    return explanation ? `Correct! ${explanation}` : 'Correct!';
  }

  return `Not quite. ${trimmedFeedback} Please try again.`;
};

export const buildTutorialStepNarration = (
  stepText: string,
  quiz?: { question: string; options: Array<{ text: string }> },
  recap?: { title: string; items: string[] },
  stepTitle = '',
) => {
  const narrationText = stepText.trim();
  if (quiz) {
    return buildKnowledgeCheckNarration(
      quiz.question.trim(),
      quiz.options.map(option => option.text),
    );
  }

  if (recap) {
    return narrationText || `Let's review what you learned. ${recap.title}. ${recap.items.join(' ')}`.trim();
  }

  const narrationTitle = stepTitle.trim();
  if (!narrationTitle) return narrationText;
  if (!narrationText) return narrationTitle;

  const normalizedTitle = narrationTitle.replace(/[.!?]+$/, '').trim().toLocaleLowerCase();
  const normalizedTextStart = narrationText
    .replace(/^[\s"']+/, '')
    .slice(0, normalizedTitle.length)
    .toLocaleLowerCase();

  if (normalizedTextStart === normalizedTitle) return narrationText;

  const titleWithPunctuation = /[.!?]$/.test(narrationTitle)
    ? narrationTitle
    : `${narrationTitle}.`;
  return `${titleWithPunctuation} ${narrationText}`.trim();
};
