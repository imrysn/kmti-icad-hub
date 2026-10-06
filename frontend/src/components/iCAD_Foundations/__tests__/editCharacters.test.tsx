import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import EditCharactersArtwork, { EditCharactersIcon } from '../EditCharactersArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Edit Drafting Entity Characters in %s', language => {
  const lesson = resolveFoundationLesson('F25.6')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-edit-characters');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3].map(step => (
        <EditCharactersArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(4);

  // Step 1: Select the Edit Drafting Entity Characters Icon
  expect(cards[0]).toHaveTextContent(
    language === 'ja' ? '製図要素文字編集アイコンを選択' : 'Select the Edit Drafting Entity Characters Icon'
  );
  expect(cards[0]).toHaveTextContent('製図要素編集');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  // Step 2: Select the Drafting Entity
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '製図要素を選択' : 'Select the Drafting Entity');
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '製図要素' : 'drafting entity');
  expect(cards[1]).toHaveTextContent('GO');

  // Step 3: Edit the Dimension Characters
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '寸法文字を編集' : 'Edit the Dimension Characters');
  expect(cards[2]).toHaveTextContent(
    language === 'ja' ? '寸法文字編集ウィンドウ' : 'Edit Dimension Characters window'
  );

  // Step 4: Confirm the Changes
  expect(cards[3]).toHaveTextContent(language === 'ja' ? '変更を確定' : 'Confirm the Changes');
  expect(cards[3]).toHaveTextContent('OK');

  expect(lesson.content[language].sections).toHaveLength(1);

  // Knowledge check verification: Correct answer is B (index 1)
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
  expect(questions[0].choices[1].label).toContain(
    language === 'ja' ? '寸法文字編集ウィンドウ' : 'Edit Dimension Characters'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-annotation-character-strings',
    next: 'foundation-annotation-change-attributes',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<EditCharactersIcon title="Edit Drafting Entity Characters" />);
  const svg = screen.getByRole('img', { name: 'Edit Drafting Entity Characters' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'edit-drafting-entity-characters');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it.each([
  ['command', 'annotation-command-interface.png'],
  ['selected-go', 'edit-characters-selected-go.png'],
  ['edit-window', 'edit-characters-edit-window.png'],
  ['result', 'edit-characters-result.png'],
])('opens supplied %s screenshot in fullscreen dialog when clicked', (name, filename) => {
  const step = ['command', 'selected-go', 'edit-window', 'result'].indexOf(name);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<EditCharactersArtwork step={step} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain(filename);
});
