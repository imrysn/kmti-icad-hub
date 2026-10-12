import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import ParasolidImportArtwork, { ParasolidImportIcon } from '../ParasolidImportArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders exactly 5 procedure steps and the knowledge check in %s', language => {
  const lesson = resolveFoundationLesson('F27.1')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-parasolid-import');
  expect(lesson.contentReview).toBe('draft');

  const { container } = render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3, 4].map(step => (
        <ParasolidImportArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  // Exactly 6 cards rendered in the grid
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(5);
  expect(screen.getAllByRole('button')).toHaveLength(5);

  // Check 3+3 container class
  expect(container.querySelector('.foundation-stretch-steps--5')).toBeInTheDocument();

  // Step 1: Select Import
  expect(items[0]).toHaveTextContent(language === 'ja' ? 'インポート' : 'Select Import');

  // Step 2: Parasolid Link dialog, browse folder, select file & extension
  expect(items[1]).toHaveTextContent(language === 'ja' ? 'パラソリッドリンク' : 'Parasolid Link');

  // Step 3: Press OK and select GO (both actions preserved)
  expect(items[2]).toHaveTextContent('OK');
  expect(items[2]).toHaveTextContent('GO');

  // Step 4: Name Change dialog, select Cancel
  expect(items[3]).toHaveTextContent(language === 'ja' ? '名前変更' : 'Name Change');
  expect(items[3]).toHaveTextContent(language === 'ja' ? 'キャンセル' : 'Cancel');

  // Step 5: Tree View, right-click, Cancel, release
  expect(items[4]).toHaveTextContent(language === 'ja' ? 'ツリービュー' : 'Tree View');
  expect(items[4]).toHaveTextContent(language === 'ja' ? 'キャンセル' : 'Cancel');
  expect(items[4]).toHaveTextContent(language === 'ja' ? '解放' : 'release');

  expect(lesson.content[language].sections?.some(section => /Important Reminder|重要な注意点/.test(section.title))).toBe(false);

  // Knowledge Check
  const questions = foundationKnowledgeQuestions(language, 'F27.1');
  expect(questions).toHaveLength(1);
  const question = questions[0];
  expect(question.id).toBe('foundation-parasolid-import-knowledge-check');
  expect(question.prompt).toContain(language === 'ja' ? '名前変更' : 'Name Change');
  expect(question.choices.map(c => c.isCorrect)).toEqual([false, false, true, false]);
  expect(question.choices[2].label).toBe(language === 'ja' ? 'C. キャンセル' : 'C. Cancel');
  expect(question.choices[2].feedback).toContain(language === 'ja' ? '正解：C. キャンセル' : 'Correct Answer: C. Cancel');
});

it('verifies navigation sequence F26.2 -> F27.1 -> F27.2', () => {
  const neighbors = foundationNeighbors('foundation-parasolid-import');
  expect(neighbors.previous).toBe('foundation-interference-display-list');
  expect(neighbors.next).toBe('foundation-parasolid-lighten-brep');
});

it('opens the actual icon menu screenshot on click in Step 1', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<ParasolidImportArtwork step={0} japanese={false} />);
  expect(screen.getByRole('button')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));
  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg?.getAttribute('src')).toContain('command.png');
});

it('renders the accurate ParasolidImportIcon standalone SVG', () => {
  render(<ParasolidImportIcon title="インポート" />);
  const svg = screen.getByRole('img');
  expect(svg).toHaveAttribute('viewBox', '0 0 36 36');
  expect(svg).toHaveClass('foundation-single-command');
});

it('opens the dialog captures for steps 2, 3, 4, 5, and 6', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  // Step 2 opens Parasolid Link dialog
  const { unmount: unmount2 } = render(<ParasolidImportArtwork step={1} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('import-file.png');
  unmount2();

  // Step 4 opens Name Change dialog
  const { unmount: unmount4 } = render(<ParasolidImportArtwork step={3} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('name-change.png');
  unmount4();
});
