export const buildKnowledgeCheckNarration = (question: string, choices: string[]) => {
  const narratedChoices = choices
    .map((choice, index) => `Choice ${index + 1}: ${choice}.`)
    .join(' ');

  return `Now, let's do a knowledge check. ${question} Choose one answer. ${narratedChoices}`.trim();
};

export const buildAnswerFeedbackNarration = (isCorrect: boolean, feedback: string) =>
  isCorrect ? 'Correct.' : `Not quite. ${feedback} Please try again.`;
