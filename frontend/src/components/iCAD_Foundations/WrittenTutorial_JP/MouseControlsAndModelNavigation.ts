import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 3.1: Zoom In and Zoom Out ────────────────────────────────────── */

export const ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'ズームインとズームアウト',
  description: 'は、図面や3Dモデルの実際の寸法を変えずに、画面上の表示倍率を調整して詳細または全体を確認するために使用します。',
  moduleLabel: '',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、ズームインおよびズームアウトを使用して表示倍率を自在に調整できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>マウスホイール前回転</b> → <b>ズームイン</b> │ <b>マウスホイール後回転</b> → <b>ズームアウト</b>',
  completionText: 'お疲れ様でした！「ズームインとズームアウト」レッスンを完了しました。',
  inlineHeader: true,
  hideStepNumbers: false,
  renderAsObjective: true,
};

export const ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'zoom-step-1',
    title: 'ズームインを使用する場面 :',
    text: '\n* 細部の形状や微小エッジを確認するとき\n* モデルの特定箇所を作図・編集するとき\n* フィーチャーや寸法を明瞭に表示したいとき',
    preserveText: true,
  },
  {
    id: 'zoom-step-2',
    title: 'ズームアウトを使用する場面 :',
    text: '\n* モデル全体のバランスや全体図を確認するとき\n* 大規模な図面やアセンブリを俯瞰するとき\n* 画面外にある他の要素を見つけたいとき',
    preserveText: true,
  },
];

/* ── Lesson 3.2: Pan ─────────────────────────────────────────────────────── */

export const PAN_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'パン',
  description: 'は、モデルの倍率や配置位置を変えずに、画面内で視図を上下左右へ平行移動させるために使用します。',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、パン操作を使用して作業画面内を自在に移動できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>ホイールを長押し</b> → <b>マウスをドラッグ</b> → <b>ボタンを離す</b>',
  completionText: 'お疲れ様でした！「パン」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const PAN_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'pan-step-1',
    title: 'パン操作を使用する場面 :',
    text: '\n* モデルの別の領域を表示したいとき\n* 画面中央に見やすい位置へ配置し直したいとき\n* 大規模な図面やアセンブリの各所を巡回確認するとき',
    preserveText: true,
  },
];

/* ── Lesson 3.3: Rotate the 3D View ──────────────────────────────────────── */

export const ROTATE_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '3Dビューの回転',
  description: 'は、モデル本体の座標を変えずに、3Dモデルをさまざまな角度から立体的に観察・検査するために使用します。',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、3Dモデルの視点を回転させ、あらゆる方向から形状を確認できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>ホイール長押し＋右クリック</b> → <b>マウスをゆっくりドラッグ</b> → <b>ボタンを離す</b>',
  completionText: 'お疲れ様でした！「3Dビューの回転」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-step-1',
    title: '視点回転を使用する場面 :',
    text: '\n* モデルをさまざまな斜め角度から立体視したいとき\n* 陰になっている面や確認しづらい裏側を検査するとき\n* 部品の立体的な立体形状・厚み・位相を正確に把握したいとき',
    preserveText: true,
  },
];
