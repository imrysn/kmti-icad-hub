import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import SetPurchasePartInfoArtwork from '../SetPurchasePartInfoArtwork';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it.each(['en', 'ja'] as const)('renders exactly 7 procedure steps across sections 0 and 1, and the knowledge check in %s', language => {
  const lesson = resolveFoundationLesson('F27.4')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-parasolid-set-purchase-part-info');
  expect(lesson.contentReview).toBe('draft');
  expect(lesson.title[language]).toBe(language === 'ja' ? '購入部品情報の設定' : 'Set Purchase Part Information');

  // Verify Lesson Description
  expect(lesson.content[language].explanation).toContain(
    language === 'ja' ? '購入部品の属性情報' : 'Configure purchase part metadata'
  );
  expect(lesson.content[language].explanation).toContain(
    language === 'ja' ? '材質、レイヤ、色、付加情報、部品コメント' : 'Material, Layer, Color, Additional Info, and Part Comment'
  );

  // Verify Learning Objective
  expect(lesson.content[language].practice).toContain(
    language === 'ja' ? '購入部品の必要な属性を設定し' : 'set all required purchase part attributes'
  );

  // Render Section 0: Steps 1 to 4
  const { container: container0 } = render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![0].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[0, 1, 2, 3].map(step => (
        <SetPurchasePartInfoArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const section0Items = container0.querySelectorAll('li.foundations-use-card');
  expect(section0Items).toHaveLength(4);
  expect(container0.querySelector('.foundation-stretch-steps--4')).toBeInTheDocument();

  // Step 1: Set the Material
  // Step 1: Set the Material
  expect(section0Items[0]).toHaveTextContent('1');
  expect(section0Items[0]).toHaveTextContent(language === 'ja' ? '材質を設定' : 'Set the Material');
  expect(section0Items[0]).toHaveTextContent(language === 'ja' ? '材質リストから適切な材質を設定します' : 'Set the Material from the material list');

  // Step 2: Set the Layer
  expect(section0Items[1]).toHaveTextContent('2');
  expect(section0Items[1]).toHaveTextContent(language === 'ja' ? 'レイヤを設定' : 'Set the Layer');
  expect(section0Items[1]).toHaveTextContent(language === 'ja' ? '指定されたレイヤを設定します' : 'Set the designated Layer');

  // Step 3: Set the Color
  expect(section0Items[2]).toHaveTextContent('3');
  expect(section0Items[2]).toHaveTextContent(language === 'ja' ? '色を設定' : 'Set the Color');
  expect(section0Items[2]).toHaveTextContent(language === 'ja' ? '実際の実物色に合わせて設定' : 'actual physical appearance');

  // Step 4: Set the Additional Information (MAKER -> REMARK)
  expect(section0Items[3]).toHaveTextContent('4');
  expect(section0Items[3]).toHaveTextContent(language === 'ja' ? '付加情報を設定' : 'Set the Additional Information');
  expect(section0Items[3]).toHaveTextContent(language === 'ja' ? '備考欄（REMARK）にメーカー（MAKER）を入力します' : 'enter the MAKER into the REMARK column');
  expect(section0Items[3]).toHaveTextContent('MAKER');
  expect(section0Items[3]).toHaveTextContent('REMARK');

  // Render Section 1: Subsection + Steps 5 to 7
  const { container: container1 } = render(
    <FoundationStretchSteps
      text={lesson.content[language].sections![1].text}
      method={1}
      japanese={language === 'ja'}
      customIcons={[4, 5, 6].map(step => (
        <SetPurchasePartInfoArtwork key={step} step={step} japanese={language === 'ja'} />
      ))}
    />
  );

  const section1Items = container1.querySelectorAll('li.foundations-use-card');
  expect(section1Items).toHaveLength(3);
  expect(container1.querySelector('.foundation-stretch-steps--3')).toBeInTheDocument();

  // Intro text of subsection
  const intro = container1.querySelector('.foundations-uses__intro');
  expect(intro).toBeInTheDocument();
  expect(intro).toHaveTextContent(
    language === 'ja' ? '部品にコメントを追加するもう一つの方法はプロパティからです' : 'Comments can also be added directly through part Properties'
  );

  // Step 5: Open Properties
  expect(section1Items[0]).toHaveTextContent('5');
  expect(section1Items[0]).toHaveTextContent(language === 'ja' ? 'プロパティを開く' : 'Open Properties');
  expect(section1Items[0]).toHaveTextContent(language === 'ja' ? 'トップ3Dパーツを右クリック' : 'right-click the Top 3D Part');
  expect(section1Items[0]).toHaveTextContent(language === 'ja' ? 'プロパティ' : 'Properties');

  // Step 6: Enter the Part Comment
  expect(section1Items[1]).toHaveTextContent('6');
  expect(section1Items[1]).toHaveTextContent(language === 'ja' ? '部品コメントを入力' : 'Enter the Part Comment');
  expect(section1Items[1]).toHaveTextContent(language === 'ja' ? 'コメント欄に特定のパーツのコメントを入力' : 'Enter the Part Comment in the Comment field');
  expect(section1Items[1]).toHaveTextContent('OK');

  // Step 7: Check the Final Result
  expect(section1Items[2]).toHaveTextContent('7');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? '完了結果の確認' : 'Check the Final Result');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? '材質' : 'Material');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? 'レイヤ' : 'Layer');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? '色' : 'Color');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? '付加情報' : 'Additional Info');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? '部品コメント' : 'Part Comment');
  expect(section1Items[2]).toHaveTextContent(language === 'ja' ? '備考欄のメーカー' : 'Maker in the Remark');

  // Section 2: Important Reminder
  const reminder = lesson.content[language].sections![2];
  expect(reminder.title).toBe(language === 'ja' ? '重要な注意点' : 'Important Reminder');
  expect(reminder.text).toContain(
    language === 'ja' ? '購入部品の色は必ず実際の実物色に合わせてください' : 'The purchase part color depends on its actual physical color'
  );
  expect(reminder.text).toContain(
    language === 'ja' ? 'MAKER' : 'MAKER'
  );
  expect(reminder.text).toContain(
    language === 'ja' ? 'REMARK' : 'REMARK'
  );

  // Knowledge Check Question
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  const q = questions[0];
  expect(q.prompt).toContain(language === 'ja' ? '購入部品のメーカーはどこに入力すべきですか' : 'Where should the maker of the purchase part be entered?');
  expect(q.choices).toHaveLength(4);

  // Correct answer is Option C: Remark (index 2)
  expect(q.choices[2].isCorrect).toBe(true);
  expect(q.choices[2].label).toContain(language === 'ja' ? '備考欄' : 'Remark');

  // Other choices are incorrect
  expect(q.choices[0].isCorrect).toBe(false);
  expect(q.choices[1].isCorrect).toBe(false);
  expect(q.choices[3].isCorrect).toBe(false);
});

it('verifies navigation sequence F27.3 -> F27.4 -> F28.1', () => {
  const neighbors = foundationNeighbors('foundation-parasolid-set-purchase-part-info');
  expect(neighbors.previous).toBe('foundation-parasolid-save-purchase-part');
  expect(neighbors.next).toBe('foundation-mirrored-parts-normal-and-mirror');
});

it('opens screenshot modals on click for Step 1 through Step 6', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn() });

  // Steps 1 to 4 open other_info_parasolid.png
  for (let s = 0; s < 4; s++) {
    const { unmount } = render(<SetPurchasePartInfoArtwork step={s} japanese={false} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('other_info_parasolid.png');
    unmount();
  }

  // Steps 5 and 6 open save-the-part-parasolid.png
  for (let s = 4; s < 6; s++) {
    const { unmount } = render(<SetPurchasePartInfoArtwork step={s} japanese={false} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('save-the-part-parasolid.png');
    unmount();
  }
});
