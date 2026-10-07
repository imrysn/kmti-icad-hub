import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import LightenBrepArtwork, { LightenBrepSolidIcon } from '../LightenBrepArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders exactly 4 procedure steps and the knowledge check in %s', language => {
  const lesson = resolveFoundationLesson('F27.2')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-parasolid-lighten-brep');
  expect(lesson.contentReview).toBe('draft');
  expect(lesson.title[language]).toBe(language === 'ja' ? 'B-Repソリッドの軽量化' : 'Lighten B-Rep Solid');

  const { container } = render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3].map(step => (
        <LightenBrepArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  // Exactly 4 cards rendered in the grid
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(4);

  // Check 4-column container class
  expect(container.querySelector('.foundation-stretch-steps--4')).toBeInTheDocument();

  // Step 1: Select Lighten B-Rep Solid from Icon Menu
  expect(items[0]).toHaveTextContent(language === 'ja' ? 'B-Repソリッドの軽量化' : 'Select Lighten B-Rep Solid');
  expect(items[0]).toHaveTextContent(language === 'ja' ? 'アイコンメニュー' : 'Icon Menu');

  // Step 2: Select No Form Changes
  expect(items[1]).toHaveTextContent(language === 'ja' ? '形状変更なし' : 'No Form Changes');
  expect(items[1]).toHaveTextContent(language === 'ja' ? 'ダイアログ' : 'dialog');

  // Step 3: Select Purchase Part and GO
  expect(items[2]).toHaveTextContent(language === 'ja' ? '購入部品' : 'Purchase Part');
  expect(items[2]).toHaveTextContent('GO');

  // Step 4: Check Message Pane & Final Result
  expect(items[3]).toHaveTextContent(language === 'ja' ? 'メッセージペインを確認' : 'Check the Message Pane');
  expect(items[3]).toHaveTextContent(language === 'ja' ? 'メッセージペイン' : 'Message Pane');
  expect(items[3]).toHaveTextContent(language === 'ja' ? '正常に終了' : 'completed successfully');

  // Section 1: Important Reminder
  const reminder = lesson.content[language].sections![1];
  expect(reminder.title).toBe(language === 'ja' ? '重要な注意点' : 'Important Reminder');
  expect(reminder.text).toContain(language === 'ja' ? '形状変更なし' : 'No form changes');
  expect(reminder.text).toContain(language === 'ja' ? 'メッセージペイン' : 'Message Pane');
  expect(reminder.text).toContain('MSG06901');

  // Knowledge Check
  const questions = foundationKnowledgeQuestions(language, 'F27.2');
  expect(questions).toHaveLength(1);
  const question = questions[0];
  expect(question.id).toBe('foundation-parasolid-lighten-brep-knowledge-check');
  expect(question.prompt).toContain(language === 'ja' ? 'B-Repソリッドの軽量化' : 'Lighten B-Rep Solid');
  expect(question.choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
  expect(question.choices[1].label).toBe(language === 'ja' ? 'B. 形状変更なし' : 'B. No form changes');
  expect(question.choices[1].feedback).toContain(language === 'ja' ? '正解：B. 形状変更なし' : 'Correct Answer: B. No form changes');
});

it('verifies navigation sequence F27.1 -> F27.2 -> F27.3', () => {
  const neighbors = foundationNeighbors('foundation-parasolid-lighten-brep');
  expect(neighbors.previous).toBe('foundation-parasolid-import');
  expect(neighbors.next).toBe('foundation-parasolid-save-purchase-part');
});

it('opens the actual icon menu screenshot on click in Step 1', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  render(<LightenBrepArtwork step={0} japanese={false} />);
  expect(screen.getByRole('button')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));
  const dialogImg = document.querySelector('dialog img');
  expect(dialogImg?.getAttribute('src')).toContain('lighten_brep_solid.png');
});

it('renders the accurate LightenBrepSolidIcon standalone SVG with accessible label and minus badge', () => {
  render(<LightenBrepSolidIcon title="B-Repソリッドの軽量化" />);
  const svg = screen.getByRole('img');
  expect(svg).toHaveAttribute('viewBox', '0 0 36 36');
  expect(svg).toHaveAttribute('aria-label', 'B-Repソリッドの軽量化');
  expect(svg).toHaveClass('foundation-single-command');
  expect(svg.querySelector('linearGradient')).not.toBeNull();
});

it('opens the dialog and message pane captures for steps 2 and 4', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  // Step 2 opens Level Settings dialog box
  const { unmount: unmount2 } = render(<LightenBrepArtwork step={1} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('dialog_box_brep.png');
  unmount2();

  // Step 4 opens Message Pane screenshot
  const { unmount: unmount4 } = render(<LightenBrepArtwork step={3} japanese={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('message_pane_brep.png');
  unmount4();
});
