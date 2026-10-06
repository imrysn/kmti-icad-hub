import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import ChangePositionArtwork, { ChangePositionIcon } from '../ChangePositionArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Change Drafting Entity Position in %s', language => {
  const lesson = resolveFoundationLesson('F25.8')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-change-position');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[<ChangePositionArtwork key={0} step={0} japanese={language === 'ja'} />]}
    />
  );

  // Exactly ONE verified procedure card exists
  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(1);

  // Step 1: Select the Change Drafting Entity Position Icon
  expect(cards[0]).toHaveTextContent(
    language === 'ja' ? '製図要素位置変更アイコンを選択' : 'Select the Change Drafting Entity Position Icon'
  );
  expect(cards[0]).toHaveTextContent('製図要素編集');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  expect(lesson.content[language].sections![1].title).toBe(
    language === 'ja' ? '寸法文字の位置変更例' : 'Repositioned Dimension Text Example'
  );
  expect(lesson.content[language].sections![1].text).toContain('60');

  expect(lesson.content[language].sections).toHaveLength(2);

  // Knowledge check verification: Correct answer is C (index 2)
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([false, false, true, false]);
  expect(questions[0].choices[2].label).toContain(
    language === 'ja' ? '製図要素の位置を変更するため' : 'To change the position of drafting entities'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-annotation-change-attributes',
    next: 'foundation-interference-check',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<ChangePositionIcon title="Change Drafting Entity Position" />);
  const svg = screen.getByRole('img', { name: 'Change Drafting Entity Position' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'change-drafting-entity-position');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it('opens supplied command screenshot in fullscreen dialog when clicked', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<ChangePositionArtwork step={0} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain('annotation-command-interface.png');
});
