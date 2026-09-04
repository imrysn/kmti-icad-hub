import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const TROUBLESHOOTING_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '画面操作、図形選択、コマンド実行時によくある初心者のトラブルを認識し、迅速に解決します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: 'トラブルシューティングガイド',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>モデル見失い</b>（全体表示） → <b>視点固定</b>（作業画面確認） → <b>誤選択</b>（Esc / Undo） → <b>入力待ち</b>（メッセージ確認）',
  completionText: 'お疲れ様でした！「初心者向けトラブルシューティング」レッスンを完了しました。',
};

export const TROUBLESHOOTING_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'trouble-step-1',
    title: 'モデルが画面から消えた・見失った',
    text: 'パンやズームでモデルが画面外に外れた場合は、ツールバーの「全体表示」をクリックして中央へ復帰させます。',
    preserveText: true,
  },
  {
    id: 'trouble-step-2',
    title: '視点回転ができない',
    text: 'マウスカーソルが作業領域の内側にあることを確認し、競合するモーダルダイアログやコマンドが実行中でないか確認します。',
    preserveText: true,
  },
  {
    id: 'trouble-step-3',
    title: '間違った図形要素を選択した',
    text: 'Escape キーを押して選択を解除するか、意図しない変更が入った場合は元に戻す（Ctrl+Z）を実行します。',
    preserveText: true,
  },
  {
    id: 'trouble-step-4',
    title: 'システムがコマンド入力待ちで停止している',
    text: 'メッセージ領域と項目入力を確認し、iCAD が次に要求している入力（点指定、数値、要素選択等）を把握します。',
    preserveText: true,
  },
];
