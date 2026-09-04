import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const INTERFACE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'iCAD SX インターフェース',
  description: 'は、2D図面や3Dモデルを作成・編集するためのメイン画面です。各領域の役割を理解することで、ツールを素早く見つけて効率的に作業できます。',
  moduleLabel: '',
  procedureTitle: 'ivl-objective',
  objective: 'このレッスンの終了時までに、iCAD インターフェースの主要な構成要素を識別し、それぞれの基本機能を理解できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>メニュー・ツールバー</b> → <b>コマンド選択</b> → <b>項目・キー入力</b> → <b>作業領域での実行</b>',
  completionText: 'お疲れ様でした！「iCAD SX インターフェース」レッスンを完了しました。',
  hideStepNumbers: false,
  inlineHeader: true,
  renderAsObjective: true,
};

export const INTERFACE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'interface-title-bar',
    title: 'タイトルバー',
    text: 'プログラム名および現在アクティブな図面ドキュメント名を表示します。',
    preserveText: true,
  },
  {
    id: 'interface-menu-bar',
    title: 'メニューバー',
    text: 'ファイル、表示、情報、設定、ツール、ウィンドウ、ヘルプなどのドロップダウンメニューが配置されています。',
    preserveText: true,
  },
  {
    id: 'interface-command-menu',
    title: 'コマンドメニュー',
    text: '機能ごとに整理されたコマンド群が表示されます。主に2D作図操作で使用されます。',
    preserveText: true,
  },
  {
    id: 'interface-tree-view',
    title: 'ツリービュー',
    text: '現在編集中の図面内の3D部品やグループの階層構造を表示します。',
    preserveText: true,
  },
  {
    id: 'interface-workspace',
    title: '作業領域',
    text: '3Dモデリングやアセンブリの組立操作を行うメイン画面領域です。',
    preserveText: true,
  },
  {
    id: 'interface-icon-menu',
    title: 'アイコンメニュー',
    text: '3Dモデリング操作を実行するための主要なコマンドアイコンが配置されています。',
    preserveText: true,
  },
  {
    id: 'interface-item-entry',
    title: '項目入力',
    text: 'コマンド実行に必要な数値、寸法値、設定項目を入力・選択します。',
    preserveText: true,
  },
  {
    id: 'interface-key-entry',
    title: 'キー入力',
    text: '座標値 (X, Y, Z) の直接入力や、キーボードからの数値入力に使用します。',
    preserveText: true,
  },
  {
    id: 'interface-tool-bar',
    title: 'ツールバー',
    text: '頻繁に使用する機能や操作コマンドへのクイックアクセスを提供します。',
    preserveText: true,
  },
  {
    id: 'interface-message-pane',
    title: 'メッセージ領域',
    text: 'コマンド実行中の操作ガイダンス、確認メッセージ、警告、エラープロンプトを表示します。',
    preserveText: true,
  },
];
