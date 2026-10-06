import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import NotesLeaderLinesArtwork, { NotesLeaderLinesIcon } from '../NotesLeaderLinesArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Notes with Leader Lines in %s', language => {
  const lesson = resolveFoundationLesson('F25.4')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-notes-leader-lines');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3, 4].map(step => (
        <NotesLeaderLinesArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(5);

  // Step 1: Notes with Leader Lines icon
  expect(cards[0]).toHaveTextContent(language === 'ja' ? '引出線付き注記アイコンを選択' : 'Select the Notes with Leader Lines Icon');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  // Step 2: Select an Edge of the Entity (Pick edge, GO)
  expect(cards[1]).toHaveTextContent(language === 'ja' ? 'エンティティのエッジを選択' : 'Select an Edge of the Entity');
  expect(cards[1]).toHaveTextContent('GO');

  // Step 3: Open Note String Entry Window (Left-click)
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '注記文字列入力ウィンドウを表示' : 'Open the Note String Entry Window');
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '左クリック' : 'Left-click');

  // Step 4: Enter the Note (OK)
  expect(cards[3]).toHaveTextContent(language === 'ja' ? '注記を入力' : 'Enter the Note');
  expect(cards[3]).toHaveTextContent('OK');

  // Step 5: Place the Note (Left-click, 3D Space)
  expect(cards[4]).toHaveTextContent(language === 'ja' ? '注記を配置' : 'Place the Note');
  expect(cards[4]).toHaveTextContent(language === 'ja' ? '3D空間' : '3D Space');
  expect(cards[4]).toHaveTextContent(language === 'ja' ? '左クリック' : 'Left-click');

  expect(lesson.content[language].sections).toHaveLength(1);

  // Knowledge check verification: Correct answer is A (index 0)
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([true, false, false, false]);
  expect(questions[0].choices[0].label).toContain(
    language === 'ja' ? 'エンティティの任意のエッジ' : 'Any edge of the entity'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-annotation-angular-dimension',
    next: 'foundation-annotation-character-strings',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<NotesLeaderLinesIcon title="Notes with Leader Lines" />);
  const svg = screen.getByRole('img', { name: 'Notes with Leader Lines' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'notes-leader-lines');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it.each([
  ['command', 'annotation-command-interface.png'],
  ['selected', 'notes-leader-lines-selected.png'],
  ['position', 'notes-leader-lines-entry-window.png'],
  ['entry', 'notes-leader-lines-entry.png'],
  ['place', 'notes-leader-lines-position.png'],
])('opens supplied %s screenshot in fullscreen dialog when clicked', (name, filename) => {
  const step = ['command', 'selected', 'position', 'entry', 'place'].indexOf(name);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<NotesLeaderLinesArtwork step={step} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain(filename);
});
