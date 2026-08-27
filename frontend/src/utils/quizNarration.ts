export const buildKnowledgeCheckNarration = (question: string, choices: string[]) => {
  const narratedChoices = choices
    .map((choice, index) => `Choice ${index + 1}: ${choice}.`)
    .join(' ');

  return `Now, let's do a knowledge check. ${question} Choose one answer. ${narratedChoices}`.trim();
};

export const buildAnswerFeedbackNarration = (isCorrect: boolean, feedback: string) =>
  isCorrect
    ? (feedback.trim() || 'Correct.')
    : `Not quite. ${feedback.trim()} Please try again.`;

export const buildTutorialStepNarration = (
  stepText: string,
  quiz?: { question: string; options: Array<{ text: string }> },
  recap?: { title: string; items: string[] },
) => {
  const narrationText = stepText.trim();
  if (quiz) {
    return buildKnowledgeCheckNarration(
      narrationText || quiz.question.trim(),
      quiz.options.map(option => option.text),
    );
  }

  if (recap) {
    return narrationText || `Let's review what you learned. ${recap.title}. ${recap.items.join(' ')}`.trim();
  }

  return narrationText;
};
