import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

// ==========================================
// 1. MOVE (移動) / SELECTING GEOMETRY
// ==========================================
export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '移動',
  moduleLabel: 'レッスンについて',
  description: 'コマンドは、iCAD SXで形状の変更や移動を行う前に対象要素を選択し、指定した位置へ正確に配置するために使用します。「移動」ツールを使って、プロンプトの確認、ハイライト表示、GOによる確定の流れを学びます。',
  procedureTitle: '操作手順',
  objective: 'このレッスンを完了すると、iCAD SXで図形要素を正しく選択し、GOで確定してコンポーネントを移動できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>移動ツール</b> → <b>プロンプト確認</b> → <b>ホバー（黄色のハイライト）</b> → <b>左クリックで選択</b> → <b>GOで確定</b> → <b>移動量を入力して完了</b>',
  completionText: 'お疲れ様でした！「移動」レッスンを完了しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'select-step-1',
    title: '移動ツールの選択',
    text: 'アイコンメニューから<b>移動</b>を選択します。',
    preserveText: true,
  },
  {
    id: 'select-step-2',
    title: 'オブジェクトの選択',
    text: '移動したいオブジェクトを左クリックし、ハイライトを確認したら右クリック（GO）で確定します。',
    preserveText: true,
  },
  {
    id: 'select-step-3',
    title: '移動量の入力',
    text: 'アイテム入力欄で各軸の移動量を入力します：\n* X軸\n* Y軸\n* Z軸\n\n次に<b>Enter</b>を押してオブジェクトを移動します。\n\n<b>例</b>：\n <b>X= 50mm</b>, <b>Y= 0mm</b>, <b>Z= 0mm</b>\n',
    preserveText: true,
  },
];

export const MOVE_WRITTEN_TUTORIAL_COPY = SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY;
export const MOVE_WRITTEN_TUTORIAL_STEPS = SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS;

// ==========================================
// 2. ROTATE (回転)
// ==========================================
export const ROTATE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '回転',
  moduleLabel: 'レッスンについて',
  description: '回転コマンドは、3Dオブジェクトのサイズや形状を変えずに、選択した軸を中心に回転させるために使用します。',
  procedureTitle: 'オブジェクトの回転手順',
  objectiveLabel: '学習目標',
  objective: 'このレッスンを完了すると、iCAD SXで3Dオブジェクトを目的の角度に回転できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>回転を選択</b> → <b>オブジェクトを選択</b> → <b>軸を設定</b> → <b>角度を入力</b> → <b>確定</b>',
  completionText: 'お疲れ様でした！iCAD SXでの3Dオブジェクト回転操作を習得しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const ROTATE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-step-1',
    title: '回転の選択',
    text: 'アイコンメニューから「回転」を選択します。',
    preserveText: true,
  },
  {
    id: 'rotate-step-2',
    title: 'オブジェクトの選択',
    text: '回転させたいオブジェクトを左クリックします。',
    preserveText: true,
  },
  {
    id: 'rotate-step-3',
    title: '回転軸の設定',
    text: 'オブジェクトが回転する軸を定義するために、2点を指定します。',
    preserveText: true,
  },
  {
    id: 'rotate-step-4',
    title: '回転角度の入力',
    text: 'アイテム入力欄で希望する回転角度を入力します。\n\n例: 90°\n\nEnterキーを押して回転を完了します。',
    preserveText: true,
  },
  {
    id: 'rotate-step-5',
    title: '回転を使用する場面',
    text: '次のような場合に「回転」を使用します:\n* パーツの向きを変更するとき\n* コンポーネントを正しい位置に配置するとき\n* オブジェクトを特定の角度に回転させるとき',
    hideStepNumber: true,
    preserveText: true,
  },
];

// ==========================================
// 3. MIRROR (ミラー)
// ==========================================
export const MIRROR_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'ミラー',
  moduleLabel: 'レッスンについて',
  description: 'コマンドは、選択した平面を基準にして3Dオブジェクトの対称コピーを作成するために使用します。',
  procedureTitle: 'オブジェクトのミラー手順',
  objectiveLabel: '学習目標',
  objective: 'このレッスンを完了すると、iCAD SXで3Dオブジェクトを反対側に対称コピー（ミラーリング）できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>ミラーを選択</b> → <b>オブジェクトを選択</b> → <b>ミラー面を選択</b> → <b>確定</b>',
  completionText: 'お疲れ様でした！iCAD SXでの3Dオブジェクトのミラー操作を習得しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const MIRROR_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'mirror-step-1',
    title: 'ミラーの選択',
    text: 'アイコンメニューから「ミラー」を選択します。',
    preserveText: true,
  },
  {
    id: 'mirror-step-2',
    title: 'オブジェクトの選択',
    text: 'ミラーしたいオブジェクトを左クリックします。',
    preserveText: true,
  },
  {
    id: 'mirror-step-3',
    title: 'ミラー面の設定',
    text: 'ミラー面を定義する方法を1つ選択します:\n* 平面を定義するために3点を指定、または\n* モデル上の平坦な面を左クリック',
    preserveText: true,
  },
  {
    id: 'mirror-step-4',
    title: '確定',
    text: '選択を確定して、ミラー結果を作成します。',
    preserveText: true,
  },
  {
    id: 'mirror-step-5',
    title: 'ミラーを使用する場面',
    text: '次のような場合に「ミラー」を使用します:\n* 対称パーツを作成するとき\n* 反対側に同一形状を配置するとき\n* 同じ形状を再作成する手間を省き時間を短縮するとき',
    hideStepNumber: true,
    preserveText: true,
  },
];

// ==========================================
// 4. COPY (コピー)
// ==========================================
export const COPY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'コピー',
  moduleLabel: 'レッスンについて',
  description: 'コマンドは、元のオブジェクトを残したまま、3Dオブジェクトの複製を1つまたは複数作成するために使用します。',
  procedureTitle: 'コピーの使用手順',
  objectiveLabel: '学習目標',
  objective: 'このレッスンを完了すると、iCAD SXで3Dオブジェクトをコピーし、指定した距離に複製を配置できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>コピーを選択</b> → <b>オブジェクトを選択</b> → <b>X, Y, Z移動量を入力</b> → <b>コピー数を入力</b> → <b>確定</b>',
  completionText: 'お疲れ様でした！iCAD SXでの3Dオブジェクトコピー操作を習得しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const COPY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'copy-step-1',
    title: 'コピーの選択',
    text: 'アイコンメニューから「コピー」を選択します。',
    preserveText: true,
  },
  {
    id: 'copy-step-2',
    title: 'オブジェクトの選択',
    text: 'コピーしたいオブジェクトを左クリックし、ハイライトを確認したら右クリック（GO）で確定します。',
    preserveText: true,
  },
  {
    id: 'copy-step-3',
    title: 'コピー距離の入力',
    text: 'アイテム入力欄で次の移動距離を入力します:\n* X軸\n* Y軸\n* Z軸\n\n次にコピー数を入力し、Enterキーを押して完了します。',
    preserveText: true,
  },
  {
    id: 'copy-step-4',
    title: 'コピーを使用する場面',
    text: '次のような場合に「コピー」を使用します:\n* 繰り返しパーツを作成するとき\n* 同一オブジェクトを複製するとき\n* 複数の同一オブジェクトを一定の距離で配置するとき',
    hideStepNumber: true,
    preserveText: true,
  },
];

// ==========================================
// 5. ROTATE COPY (回転複写)
// ==========================================
export const ROTATE_COPY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '回転複写',
  moduleLabel: 'レッスンについて',
  description: '回転複写コマンドは回転ツールと同様に機能しますが、元のオブジェクトを残したまま回転した複製を作成します。',
  procedureTitle: '回転複写の使用手順',
  objectiveLabel: '学習目標',
  objective: 'このレッスンを完了すると、iCAD SXで3Dオブジェクトの回転複製を作成できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>回転複写を選択</b> → <b>オブジェクトを選択</b> → <b>軸を設定</b> → <b>角度を入力</b> → <b>確定</b>',
  completionText: 'お疲れ様でした！iCAD SXでの3Dオブジェクトの回転複写操作を習得しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const ROTATE_COPY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-copy-step-1',
    title: '回転複写の選択',
    text: 'アイコンメニューから「回転複写」を選択します。',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-2',
    title: 'オブジェクトの選択',
    text: '複製して回転させたいオブジェクトを左クリックします。',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-3',
    title: '回転軸の設定',
    text: '回転軸を定義するために2点を指定します。',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-4',
    title: '回転角度の入力',
    text: 'アイテム入力欄で希望する角度を入力します。\n\n例: 90°\n\nEnterキーを押して回転複製を作成します。',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-5',
    title: '回転複写を使用する場面',
    text: '次のような場合に「回転複写」を使用します:\n* 軸を中心に繰り返しパーツを作成するとき\n* 異なる角度で複製を作成するとき\n* 元のオブジェクトを残したまま別の回転形状を作成するとき',
    hideStepNumber: true,
    preserveText: true,
  },
];

// ==========================================
// 6. MIRROR COPY (ミラー複写)
// ==========================================
export const MIRROR_COPY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'ミラー複写',
  moduleLabel: 'レッスンについて',
  description: 'ミラー複写コマンドはミラーツールと同様に機能しますが、元のオブジェクトを残したまま鏡像複製を作成するために使用します。',
  procedureTitle: 'ミラー複写の使用手順',
  objectiveLabel: '学習目標',
  objective: 'このレッスンを完了すると、iCAD SXで3Dオブジェクトのミラー複写を作成できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>ミラー複写を選択</b> → <b>オブジェクトを選択</b> → <b>ミラー面を設定</b> → <b>確定</b>',
  completionText: 'お疲れ様でした！iCAD SXでの3Dオブジェクトのミラー複写操作を習得しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const MIRROR_COPY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'mirror-copy-step-1',
    title: 'ミラー複写の選択',
    text: 'アイコンメニューから「ミラー複写」を選択します。',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-2',
    title: 'オブジェクトの選択',
    text: '複製してミラーしたいオブジェクトを左クリックします。',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-3',
    title: 'ミラー面の設定',
    text: 'ミラー面を定義する方法を1つ選択します:\n* ミラー面を定義するために3点を指定、または\n* モデル上の平坦な面を左クリック',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-4',
    title: '確定',
    text: '選択を確定してミラー複製を作成します。',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-5',
    title: 'ミラー複写を使用する場面',
    text: '次のような場合に「ミラー複写」を使用します:\n* 対称パーツを作成するとき\n* 反対側に同一フィーチャーを複製するとき\n* 元のオブジェクトを残したまま鏡像モデルを作成するとき',
    hideStepNumber: true,
    preserveText: true,
  },
];

// ==========================================
// 7. DELETE (削除)
// ==========================================
export const DELETE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '削除',
  moduleLabel: 'レッスンについて',
  description: 'コマンドは、3Dモデルから不要なオブジェクトを取り除くために使用します。',
  procedureTitle: '削除の使用手順',
  objectiveLabel: '学習目標',
  objective: 'このレッスンを完了すると、iCAD SXで選択したオブジェクトを削除できるようになります。',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>削除を選択</b> → <b>オブジェクトを左クリック</b> → <b>結果を確認</b>',
  completionText: 'お疲れ様でした！iCAD SXでのオブジェクト削除操作を習得しました。',
  inlineHeader: true,
  renderAsObjective: true,
};

export const DELETE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'delete-step-1',
    title: '削除の選択',
    text: 'アイコンメニューから「削除」を選択します。',
    preserveText: true,
  },
  {
    id: 'delete-step-2',
    title: 'オブジェクトの選択',
    text: '削除したいオブジェクトを左クリックします。GO は不要で、すぐに削除されます。',
    preserveText: true,
  },
  {
    id: 'delete-step-3',
    title: '結果の確認',
    text: '残ったモデルを確認します。間違えて削除した場合は <b>Ctrl+Z</b> で元に戻します。',
    preserveText: true,
  },
  {
    id: 'delete-step-4',
    title: '削除を使用する場面',
    text: '次のような場合に「削除」を使用します:\n* 誤ったオブジェクトを削除するとき\n* 不要なパーツやフィーチャーを取り除くとき\n* モデルを整理・クリーンアップするとき',
    hideStepNumber: true,
    preserveText: true,
  },
];

export default SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS;
