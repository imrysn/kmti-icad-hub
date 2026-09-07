import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '図形要素の選択',
  moduleLabel: 'レッスンについて',
  description: 'iCAD SXでは、形状の変更や移動を行う前に対象要素を選択する必要があります。「移動」ツールを使って、プロンプトの確認、ハイライト表示、GOによる確定の流れを学びます。',
  procedureTitle: '操作手順',
  objective: 'このレッスンを完了すると、iCAD SXで図形要素を正しく選択し、GOで確定できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>移動ツール</b> → <b>プロンプト確認</b> → <b>ホバー（黄色のハイライト）</b> → <b>左クリックで選択</b> → <b>GOで確定</b>',
  completionText: 'お疲れ様でした！「図形要素の選択」レッスンを完了しました。',
};

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'select-step-1',
    title: '移動ツールの選択',
    text: '画面右側の「移動・コピー・削除」メニューから「移動」アイコンをクリックします。',
    preserveText: true,
  },
  {
    id: 'select-step-2',
    title: 'プロンプトの確認',
    text: '画面下部のプロンプトに「対象要素　GO<選択終了/一時グループ>」と表示され、要素の選択待ち状態であることを確認します。',
    preserveText: true,
  },
  {
    id: 'select-step-3',
    title: 'ホバーでハイライト確認',
    text: 'マウスカーソルを3D直方体に重ねます。エッジが黄色くハイライト表示され、選択対象を確認できます。',
    preserveText: true,
  },
  {
    id: 'select-step-4',
    title: '左クリックで要素を選択',
    text: '対象のオブジェクトを左クリックします。輪郭線が選択状態に切り替わります。',
    preserveText: true,
  },
  {
    id: 'select-step-5',
    title: 'GOで選択終了',
    text: 'プロンプト領域の「GO」をクリックするか、Enterキーを押して要素の選択を終了します。',
    preserveText: true,
  },
  {
    id: 'select-step-6',
    title: '移動量の入力と実行',
    text: '画面下部の入力欄に移動量（X, Y, Z）を入力し、Enterキーを押して移動を実行します。',
    preserveText: true,
  },
];

export default SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS;
