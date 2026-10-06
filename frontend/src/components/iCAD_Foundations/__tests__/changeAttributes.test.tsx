import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import ChangeAttributesArtwork, { ChangeAttributesIcon } from '../ChangeAttributesArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Change Drafting Entity Attributes in %s', language => {
  const lesson = resolveFoundationLesson('F25.7')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-change-attributes');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3].map(step => (
        <ChangeAttributesArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(4);

  // Step 1: Select the Change Drafting Entity Attributes Icon
  expect(cards[0]).toHaveTextContent(
    language === 'ja' ? '製図要素属性変更アイコンを選択' : 'Select the Change Drafting Entity Attributes Icon'
  );
  expect(cards[0]).toHaveTextContent('製図要素編集');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  // Step 2: Select the Drafting Entity
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '製図要素を選択' : 'Select the Drafting Entity');
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '製図要素' : 'drafting entity');
  expect(cards[1]).toHaveTextContent('GO');

  // Step 3: Change the Properties with compact grouped property specs
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '属性を変更' : 'Change the Properties');
  expect(cards[2]).toHaveTextContent(
    language === 'ja' ? '属性変更' : 'Change Properties'
  );
  // Step 4: Confirm the Changes
  expect(cards[3]).toHaveTextContent(language === 'ja' ? '変更を確定' : 'Confirm the Changes');
  expect(cards[3]).toHaveTextContent('OK');

  expect(lesson.content[language].sections).toHaveLength(1);

  // Knowledge check verification: Correct answer is C (index 2)
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([false, false, true, false]);
  expect(questions[0].choices[2].label).toContain(
    language === 'ja' ? '属性変更ウィンドウ' : 'Change Properties'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-annotation-edit-characters',
    next: 'foundation-annotation-change-position',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<ChangeAttributesIcon title="Change Drafting Entity Attributes" />);
  const svg = screen.getByRole('img', { name: 'Change Drafting Entity Attributes' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'change-drafting-entity-attributes');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it.each([
  ['command', 'annotation-command-interface.png'],
  ['selected-go', 'change-attributes-selected-go.png'],
  ['properties-window', 'change-attributes-properties-window.png'],
  ['result', 'change-attributes-result.png'],
])('opens supplied %s screenshot in fullscreen dialog when clicked', (name, filename) => {
  const step = ['command', 'selected-go', 'properties-window', 'result'].indexOf(name);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<ChangeAttributesArtwork step={step} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain(filename);
});
