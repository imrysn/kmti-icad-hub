import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const SAVING_WORK_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '適切なファイル命名規則とフォルダ階層に従って、演習データを確実に保存します。',
  moduleLabel: 'レッスンについて',
  procedureTitle: '操作手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText:
    '<b>ファイルメニュー</b> → <b>名前を付けて保存</b> → <b>ファイル名入力</b> → <b>確定＆タイトルバー確認</b>',
  completionText: 'お疲れ様でした！「作業データの保存」レッスンを完了しました。',
};

export const SAVING_WORK_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'save-step-1',
    title: 'ファイルメニューを開く',
    text: '上部メニューバーの「ファイル」をクリックするか、ツールバーの保存アイコンをクリックします。',
    preserveText: true,
  },
  {
    id: 'save-step-2',
    title: '「名前を付けて保存」を選択',
    text: '指定の研修用フォルダへ保存するため、「名前を付けて保存」を選択します。',
    preserveText: true,
  },
  {
    id: 'save-step-3',
    title: 'ファイル名の入力',
    text: '規定の命名ルールに従って練習用のファイル名を入力します（例: ICAD_FOUNDATION_PRACTICE_01）。',
    preserveText: true,
  },
  {
    id: 'save-step-4',
    title: '保存の確定と確認',
    text: '「保存」をクリックし、アプリケーション最上部のタイトルバーに更新されたファイル名が表示されることを確認します。',
    preserveText: true,
  },
];
