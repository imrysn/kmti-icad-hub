import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import ModelingMirrorPartsContent from '../ModelingMirrorPartsContent';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

afterEach(cleanup);

it.each(['en', 'ja'] as const)('renders 3D Modeling of Mirror Parts procedure, 6 steps, and reminder in %s', language => {
  const lesson = resolveFoundationLesson('F28.3')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-mirrored-parts-3d-modeling');
  expect(lesson.moduleId).toBe('F28');
  expect(lesson.displayId).toBe('F28.3');
  expect(lesson.contentReview).toBe('instructor-review-required');
  expect(lesson.title[language]).toBe(language === 'ja' ? 'ミラー部品の3Dモデリング' : '3D Modeling of Mirror Parts');

  const sections = lesson.content[language].sections!;
  expect(sections).toHaveLength(2);

  // Render both sections
  const { container } = render(
    <>
      {sections.map((s, index) => (
        <ModelingMirrorPartsContent
          key={index}
          text={s.text}
          title={s.title}
          index={index}
          japanese={language === 'ja'}
        />
      ))}
    </>
  );

  // 1. Procedure Grid in Section 0: Exactly 6 procedure cards using foundations-uses__grid
  const grid = container.querySelector('.foundations-uses__grid');
  expect(grid).not.toBeNull();
  const stepCards = grid!.querySelectorAll('.foundations-use-card');
  expect(stepCards).toHaveLength(6);

  // Step 1: Identify Proper Location of the Origin
  expect(stepCards[0].textContent).toContain('1');
  expect(stepCards[0].textContent).toContain(
    language === 'ja' ? '部品の原点の適切な位置を特定する' : 'Identify the Proper Location of the Origin'
  );
  expect(stepCards[0].textContent).toContain(language === 'ja' ? '原点' : 'origin');
  expect(stepCards[0].querySelector('img')?.getAttribute('src')).toContain('mirrored_part2_location_of_origin.png');

  // Step 2: Create and Save Part A
  expect(stepCards[1].textContent).toContain('2');
  expect(stepCards[1].textContent).toContain(language === 'ja' ? '部品Aを作成して保存する' : 'Create and Save Part A');
  expect(stepCards[1].textContent).toContain(language === 'ja' ? '部品A' : 'Part A');
  expect(stepCards[1].querySelector('svg')).not.toBeNull();

  // Step 3: Save Part A as Part B
  expect(stepCards[2].textContent).toContain('3');
  expect(stepCards[2].textContent).toContain(
    language === 'ja' ? '部品Aを部品Bとして別名保存する' : 'Save Part A as Part B'
  );
  expect(stepCards[2].textContent).toContain(language === 'ja' ? '部品B' : 'Part B');
  expect(stepCards[2].querySelector('svg')).not.toBeNull();

  // Step 4: Select Mirror (uses verified FoundationOperationCommandIcon command="mirror")
  expect(stepCards[3].textContent).toContain('4');
  expect(stepCards[3].textContent).toContain(language === 'ja' ? '反転（ミラー）を選択する' : 'Select Mirror');
  expect(stepCards[3].textContent).toContain(language === 'ja' ? 'アイコンメニュー' : 'Icon Menu');
  expect(stepCards[3].querySelector('svg')).not.toBeNull();

  // Step 5: Specify the Mirror Plane (Pick 3 points starting from origin: P1 -> P2 -> P3)
  expect(stepCards[4].textContent).toContain('5');
  expect(stepCards[4].textContent).toContain(
    language === 'ja' ? '反転面（対称面）を指定する' : 'Specify the Mirror Plane'
  );
  expect(stepCards[4].textContent).toContain('P1 → P2 → P3');
  expect(stepCards[4].textContent).toContain(language === 'ja' ? '原点から始めて' : 'starting from the origin');
  expect(stepCards[4].querySelector('img')?.getAttribute('src')).toContain('mirrored_part2_pick3_points.png');

  // Step 6: Check the Final Result (outcome Part B with preserved origin)
  expect(stepCards[5].textContent).toContain('6');
  expect(stepCards[5].textContent).toContain(language === 'ja' ? '最終結果を確認する' : 'Check the Final Result');
  expect(stepCards[5].textContent).toContain(language === 'ja' ? '部品B' : 'Part B');
  expect(stepCards[5].querySelector('img')?.getAttribute('src')).toContain('mirrored_part2_pick3_points_part_a.png');

  // 2. Section 1: Important Reminder Callout
  const reminderCallout = container.querySelector('.normal-mirror-rule-callout');
  expect(reminderCallout).not.toBeNull();
  expect(reminderCallout!.textContent).toContain(
    language === 'ja'
      ? '部品Bの原点は部品Aと同じ位置でなければなりません'
      : 'The origin of Part B must be in the same location as Part A'
  );
});

it.each(['en', 'ja'] as const)('provides knowledge check question for F28.3 with correct answer B in %s', language => {
  const questions = foundationKnowledgeQuestions(language, 'foundation-mirrored-parts-3d-modeling');
  expect(questions).toHaveLength(1);
  const q = questions[0];
  expect(q.id).toBe('foundation-mirrored-parts-3d-modeling-knowledge-check');
  expect(q.prompt).toContain(
    language === 'ja'
      ? 'ミラー部品を作成した後、部品Aと部品Bの間で同じでなければならないものは何ですか？'
      : 'What must be the same between Part A and Part B after creating the mirror part?'
  );

  // Strictly B. Origin location
  expect(q.choices).toHaveLength(4);
  expect(q.choices.map(c => c.isCorrect)).toEqual([false, true, false, false]);
  expect(q.choices[1].label).toBe(language === 'ja' ? 'B. 原点の位置' : 'B. Origin location');
});

it('maintains the strict navigation sequence: F28.2 -> F28.3 -> F29.1 Review', () => {
  expect(foundationNeighbors('foundation-mirrored-parts-3d-modeling')).toEqual({
    previous: 'foundation-mirrored-parts-identify',
    next: 'F17.1',
  });
});
