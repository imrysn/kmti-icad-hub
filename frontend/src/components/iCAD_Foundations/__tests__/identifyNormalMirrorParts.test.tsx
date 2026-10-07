import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import IdentifyNormalMirrorPartsContent from '../IdentifyNormalMirrorPartsContent';
import { foundationNeighbors, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

afterEach(cleanup);

it.each(['en', 'ja'] as const)('renders Identify Normal or Mirror Parts procedure, comparison cards, and reminder in %s', language => {
  const lesson = resolveFoundationLesson('F28.2')!;
  expect(lesson).toBeDefined();
  expect(lesson.id).toBe('foundation-mirrored-parts-identify');
  expect(lesson.moduleId).toBe('F28');
  expect(lesson.displayId).toBe('F28.2');
  expect(lesson.contentReview).toBe('instructor-review-required');
  expect(lesson.title[language]).toBe(language === 'ja' ? '通常部品とミラー部品の判別' : 'Identify Normal or Mirror Parts');

  const sections = lesson.content[language].sections!;
  expect(sections).toHaveLength(2);

  // Render both sections
  const { container } = render(
    <>
      {sections.map((s, index) => (
        <IdentifyNormalMirrorPartsContent
          key={index}
          text={s.text}
          title={s.title}
          index={index}
          japanese={language === 'ja'}
        />
      ))}
    </>
  );

  // 1. Procedure Grid in Section 0: Exactly 4 procedure cards using foundations-uses__grid
  const grid = container.querySelector('.foundations-uses__grid');
  expect(grid).not.toBeNull();
  const stepCards = grid!.querySelectorAll('.foundations-use-card');
  expect(stepCards).toHaveLength(4);

  // Step 1: Select Mirror Copy Tool from Icon Menu
  expect(stepCards[0].textContent).toContain('1');
  expect(stepCards[0].textContent).toContain(language === 'ja' ? '反転複写を選択する' : 'Select Mirror Copy Tool');
  expect(stepCards[0].textContent).toContain(language === 'ja' ? 'アイコンメニュー' : 'Icon Menu');
  // Reused verified mirrorCopy SVG icon command
  expect(stepCards[0].querySelector('svg')).not.toBeNull();

  // Step 2: Place Mirror Copy Over Original Part
  expect(stepCards[1].textContent).toContain('2');
  expect(stepCards[1].textContent).toContain(language === 'ja' ? '元の部品の上に重ねる' : 'Place Over Original Part');
  expect(stepCards[1].textContent).toContain(
    language === 'ja' ? '直接元の部品の上に重ねて配置' : 'place it directly over the original part'
  );

  // Step 3: Compare Part Details (Hole location, Cutouts, Fairings)
  expect(stepCards[2].textContent).toContain('3');
  expect(stepCards[2].textContent).toContain(language === 'ja' ? '詳細形状を比較する' : 'Compare Part Details');
  expect(stepCards[2].textContent).toContain(language === 'ja' ? '穴の位置' : 'Hole location');
  expect(stepCards[2].textContent).toContain(language === 'ja' ? '切り欠き' : 'Cutouts');
  expect(stepCards[2].textContent).toContain(language === 'ja' ? 'フェアリング' : 'Fairings');

  // Step 4: Identify Part Type
  expect(stepCards[3].textContent).toContain('4');
  expect(stepCards[3].textContent).toContain(language === 'ja' ? '部品の分類を判定する' : 'Identify Part Type');
  expect(stepCards[3].textContent).toContain(language === 'ja' ? '通常部品' : 'Normal Part');
  expect(stepCards[3].textContent).toContain(language === 'ja' ? 'ミラー部品' : 'Mirror Part');
  // Preserves condition concerning function of Mirror Part A
  expect(stepCards[3].textContent).toContain(
    language === 'ja' ? 'ミラー部品Aの機能と同一になり得ない' : 'function of Mirror Part A'
  );

  // 2. Ensure Section 1 does not reteach F28.1 with redundant comparison cards
  expect(container.querySelectorAll('.foundation-view-comparison__card')).toHaveLength(0);

  // 3. Important Reminder Callout in Section 1
  const reminderCallout = container.querySelector('.normal-mirror-rule-callout');
  expect(reminderCallout).not.toBeNull();
  expect(reminderCallout!.textContent).toContain(
    language === 'ja' ? '図面番号の割り当て' : 'drawing numbers'
  );

  // Kattechigai Note
  const katteCard = container.querySelector('.normal-mirror-katte-chigai-card');
  expect(katteCard).not.toBeNull();
  expect(katteCard!.textContent).toContain('勝手違');
  expect(katteCard!.textContent).toContain(
    language === 'ja' ? 'ミラーイメージ' : 'Mirror Image'
  );

  // 4. Knowledge Check
  const questions = foundationKnowledgeQuestions(language, lesson.id);
  expect(questions).toHaveLength(1);
  const q = questions[0];
  expect(q.id).toBe('foundation-mirrored-parts-identify-knowledge-check');
  expect(q.prompt).toContain(
    language === 'ja'
      ? '違いが認識されず、部品の詳細がすべて完全に同一である場合'
      : 'no differences can be recognized and all part details are exactly the same'
  );
  expect(q.choices).toHaveLength(4);
  // Correct answer is strictly C (index 2: Normal Part)
  expect(q.choices.map(c => c.isCorrect)).toEqual([false, false, true, false]);
  expect(q.choices[2].label).toContain(
    language === 'ja' ? 'C. 通常部品' : 'C. Normal Part'
  );

  // 5. Navigation sequence: F28.1 -> F28.2 -> F28.3
  expect(foundationNeighbors(lesson.id)).toEqual({
    previous: 'foundation-mirrored-parts-normal-and-mirror',
    next: 'foundation-mirrored-parts-3d-modeling',
  });
});
