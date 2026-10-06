import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, it, expect, vi } from 'vitest';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import CharacterStringsArtwork, { CharacterStringsIcon } from '../CharacterStringsArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders Character Strings in %s', language => {
  const lesson = resolveFoundationLesson('F25.5')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-annotation-character-strings');

  render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3, 4].map(step => (
        <CharacterStringsArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const cards = screen.getAllByRole('listitem');
  expect(cards).toHaveLength(4);

  // Step 1: Character Strings icon
  expect(cards[0]).toHaveTextContent(language === 'ja' ? '文字列アイコンを選択' : 'Select the Character Strings Icon');
  expect(cards[0].querySelector('svg.foundation-single-command')).toBeInTheDocument();

  // Step 2: Open Text Entry Window
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '文字列入力ウィンドウを表示' : 'Open the Text Entry Window');
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '3D空間' : '3D Space');
  expect(cards[1]).toHaveTextContent(language === 'ja' ? '左クリック' : 'Left-click');

  // Step 3: Enter the Text
  expect(cards[2]).toHaveTextContent(language === 'ja' ? '文字列を入力' : 'Enter the Text');
  expect(cards[2]).toHaveTextContent(language === 'ja' ? 'OK' : 'OK');

  // Step 4: Place the Text
  expect(cards[3]).toHaveTextContent(language === 'ja' ? '文字列を配置' : 'Place the Text');
  expect(cards[3]).toHaveTextContent(language === 'ja' ? '3D空間' : '3D Space');
  expect(cards[3]).toHaveTextContent(language === 'ja' ? '左クリック' : 'Left-click');

  expect(lesson.content[language].sections).toHaveLength(1);

  // Knowledge check verification: Correct answer is B (index 1)
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  expect(questions[0].choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
  expect(questions[0].choices[1].label).toContain(
    language === 'ja' ? '文字列入力ウィンドウ' : 'Text Entry window'
  );

  // Navigation
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-annotation-notes-leader-lines',
    next: 'foundation-annotation-edit-characters',
  });
});

it('renders the clean Step 1 SVG icon with correct attributes and geometry', () => {
  render(<CharacterStringsIcon title="Character Strings" />);
  const svg = screen.getByRole('img', { name: 'Character Strings' });
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg).toHaveAttribute('data-command-reference', 'character-strings');
  expect(svg.querySelector('path')).toBeInTheDocument();
  expect(svg.querySelector('rect, image, text')).toBeNull();
});

it.each([
  ['command', 'annotation-command-interface.png'],
  ['window', 'character-strings-entry-window.png'],
  ['enter', 'character-strings-enter-text.png'],
  ['place', 'character-strings-placed-result.png'],
  ['result', 'character-strings-placed-result.png'],
])('opens supplied %s screenshot in fullscreen dialog when clicked', (name, filename) => {
  const step = ['command', 'window', 'enter', 'place', 'result'].indexOf(name);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<CharacterStringsArtwork step={step} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));

  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg).toBeInTheDocument();
  expect(dialogImg?.getAttribute('src')).toContain(filename);
});
