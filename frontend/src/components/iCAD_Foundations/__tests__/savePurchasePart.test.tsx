import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import SavePurchasePartArtwork from '../SavePurchasePartArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders exactly 2 procedure steps and the knowledge check in %s', language => {
  const lesson = resolveFoundationLesson('F27.3')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-parasolid-save-purchase-part');
  expect(lesson.contentReview).toBe('draft');
  expect(lesson.title[language]).toBe(language === 'ja' ? '購入部品の保存' : 'Save the Purchase Part');

  const { container } = render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1].map(step => (
        <SavePurchasePartArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  // Exactly 4 cards rendered in the grid
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(2);

  // Check 4-column container class
  expect(container.querySelector('.foundation-stretch-steps--2')).toBeInTheDocument();

  // Step 1: Open Save As (File -> Save As)
  expect(items[0]).toHaveTextContent(language === 'ja' ? '名前を付けて保存を開く' : 'Open Save As');
  expect(items[0]).toHaveTextContent(language === 'ja' ? 'ファイル → 名前を付けて保存' : 'File → Save As');

  // Step 2: Name and Save the Part (FILE NAME = PURCHASE PART CODE)
  expect(items[1]).toHaveTextContent(language === 'ja' ? 'ファイル名を指定して保存' : 'Name and Save the Part');
  expect(items[1]).toHaveTextContent(language === 'ja' ? '購入部品コード' : 'purchase part code');

  expect(lesson.content[language].sections?.some(section => /Important Reminder|重要な注意点/.test(section.title))).toBe(false);

  // Knowledge Check Question
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  const q = questions[0];
  expect(q.prompt).toContain(language === 'ja' ? 'ファイル名として何を使用すべきですか' : 'file name');
  expect(q.choices).toHaveLength(4);

  // Correct answer is Option B: Purchase part code
  expect(q.choices[1].isCorrect).toBe(true);
  expect(q.choices[1].label).toContain(language === 'ja' ? '購入部品コード' : 'Purchase part code');

  // Other choices are incorrect
  expect(q.choices[0].isCorrect).toBe(false);
  expect(q.choices[2].isCorrect).toBe(false);
  expect(q.choices[3].isCorrect).toBe(false);
});

it('verifies navigation sequence F27.2 -> F27.3 -> F28.1', () => {
  const neighbors = foundationNeighbors('foundation-parasolid-save-purchase-part');
  expect(neighbors.previous).toBe('foundation-parasolid-lighten-brep');
  expect(neighbors.next).toBe('foundation-mirrored-parts-normal-and-mirror');
});

it('opens the actual File -> Save As menu screenshot on click in Step 1', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<SavePurchasePartArtwork step={0} japanese={false} />);
  expect(screen.getByRole('button')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));
  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg?.getAttribute('src')).toContain('save.png');
});

it('opens the actual Save As dialog screenshot on click in Step 2', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  // Step 2 opens Save As dialog
  const { unmount: unmount2 } = render(<SavePurchasePartArtwork step={1} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('save-dialog.png');
  unmount2();


});
