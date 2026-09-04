import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const INTRO_TO_3D_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '2Dプロファイルから最初の3D直方体ソリッドモデル (100 × 60 × 20 mm) を作成します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>2Dプロファイル作成</b> → <b>輪郭選択</b> → <b>3D / 押し出しコマンド</b> → <b>高さ入力</b> → <b>3Dソリッド確定</b>',
  completionText: 'お疲れ様でした！「初めての3Dモデル作成」レッスンを完了しました。',
};

export const INTRO_TO_3D_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'block-step-1',
    title: '2Dプロファイルの準備',
    text: '長さ 100 mm、幅 60 mm の長方形スケッチ断面を作図します。',
    preserveText: true,
  },
  {
    id: 'block-step-2',
    title: 'プロファイルの選択',
    text: '作図画面内の閉じた長方形ワイヤフレームを強調表示させて選択します。',
    preserveText: true,
  },
  {
    id: 'block-step-3',
    title: '3D作成 / 押し出しの起動',
    text: 'モデリングツールバーから「押し出し」または「3D部品作成」コマンドを起動します。',
    preserveText: true,
  },
  {
    id: 'block-step-4',
    title: '押し出し高さの入力',
    text: '寸法入力フィールドに高さ：20 mm を入力します。',
    preserveText: true,
  },
  {
    id: 'block-step-5',
    title: '3Dソリッドの確定',
    text: '生成されるソリッドブロックのプレビューを確認し、コマンドを確定して3D部品を生成します。',
    preserveText: true,
  },
];
