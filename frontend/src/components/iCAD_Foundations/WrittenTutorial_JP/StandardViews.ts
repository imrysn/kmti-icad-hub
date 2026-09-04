import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 4.1: 3D View ─────────────────────────────────────────────────── */

export const STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '3D視図',
  description: 'ツールを使用すると、実際のモデル形状を変えることなく、さまざまな方向から3Dモデルを観察できます。',
  moduleLabel: 'レッスンについて',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、3Dモデルの視図方向を自由に変更して確認できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>3D視図ツールバー</b> → <b>視図方向の選択（正面 / 上面 / 右側面）</b> → <b>面の確認</b>',
  completionText: 'お疲れ様でした！「3D視図」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'view-step-1',
    title: '3D視図の選択肢',
    text: '\n* 上面 - モデルを真上から見ます。\n* 正面 - モデルを正面から見ます。\n* 右側面 - モデルを右真横から見ます。\n* 左側面 - モデルを左真横から見ます。\n* 背面 - モデルを真後ろから見ます。\n* 下面 - モデルを真下から見ます。',
    preserveText: true,
  },
  {
    id: 'view-step-2',
    title: '3D視図を使用する場面',
    text: '\n* 特定の基準面や側面の直角投影を確認するとき。\n* 現在の角度からは見えづらいフィーチャーを観察するとき。\n* フィーチャーの作図・編集前に適切な作業平面へ視点を合わせるとき。',
    preserveText: true,
  },
];

/* ── Lesson 4.2: User View ───────────────────────────────────────────────── */

export const USER_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'ユーザ視図',
  description: 'を使用すると、あらかじめ定義されたプリセットの等角投影視点へ瞬時に切り替えることができます。',
  moduleLabel: 'レッスンについて',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、ユーザ視図を活用して異なる等角投影角度から3Dモデルを立体的に観察できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>ユーザ視図ツールバー</b> → <b>ユーザ視図の選択（1 / 2 / 3 / 4）</b> → <b>立体形状の確認</b>',
  completionText: 'お疲れ様でした！「ユーザ視図」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const USER_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'user-view-step-1',
    title: 'ユーザ視図の種類',
    text: 'iCAD SX には「ユーザ視図 1」「ユーザ視図 2」「ユーザ視図 3」「ユーザ視図 4」が用意されており、それぞれ異なる斜め等角方向からモデルを表示します。',
    preserveText: true,
  },
  {
    id: 'user-view-step-2',
    title: 'ユーザ視図を使用する場面',
    text: '\n* モデルの上面・正面・側面を一度に立体視したいとき。\n* 全体の3D形状や部品間の取り合いを直感的に把握したいとき。\n* 別の角度から手早くモデルの立体的な外観を検査したいとき。',
    preserveText: true,
  },
];
