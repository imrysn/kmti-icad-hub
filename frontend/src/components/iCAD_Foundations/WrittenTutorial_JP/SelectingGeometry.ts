import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'モデリング操作の実行前に、3Dオブジェクト、個別面、エッジを正確に選択します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>形状にホバー</b> → <b>対象の確認（ボディ / 面 / エッジ）</b> → <b>左クリックで選択</b>',
  completionText: 'お疲れ様でした！「図形要素の選択」レッスンを完了しました。',
};

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'select-step-1',
    title: 'オブジェクト全体の選択',
    text: 'マウスカーソルを対象の3D部品に合わせ、左クリックしてオブジェクト全体を選択します。',
    preserveText: true,
  },
  {
    id: 'select-step-2',
    title: 'ハイライト表示の確認',
    text: 'オブジェクトの輪郭線が強調表示され、編集対象としてアクティブになっていることを確認します。',
    preserveText: true,
  },
  {
    id: 'select-step-3',
    title: '個別の面の選択',
    text: 'ポインタを特定の平面または曲面に合わせ、左クリックしてその面のみを選択します。',
    preserveText: true,
  },
  {
    id: 'select-step-4',
    title: 'モデルのエッジの選択',
    text: '2つの面が交わる境界線上へ正確にカーソルを重ね、左クリックしてエッジを選択します。',
    preserveText: true,
  },
];
