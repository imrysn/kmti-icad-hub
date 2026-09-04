import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Cylinder ────────────────────────────────────────────────────────────── */

export const CYLINDER_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '円柱',
  description: 'は、平行な2つの円形面が曲面によって結ばれた3次元ソリッド形状です。',
  description2: 'CADにおいて円柱は、軸、ピン、ローラー、ボス、円形穴などの基準形状として広く使用されます。',
  moduleLabel: '',
  objective: 'このレッスンの終了時までに、iCAD SX で円柱を作成し、意図した座標へ配置できるようになります。',
  procedureTitle: '円柱の作成手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>円柱の選択</b> → <b>寸法入力</b> → <b>配置位置の指定</b> → <b>作成確定</b>',
  completionText: 'お疲れ様でした！iCAD SX での基本円柱の作成と配置ができるようになりました。',
  inlineHeader: true,
};

export const CYLINDER_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'cyl-step-1',
    title: '円柱の選択',
    text: 'アイコンメニューから「立体配置」を開き、「円柱配置」を選択します。',
    preserveText: true,
  },
  {
    id: 'cyl-step-2',
    title: '視図の設定',
    text: '3D視図ツールバーから「正面」を選択します。\n\nコマンドメニューから以下を選択します：\n<b>立体配置</b> > <b>Y方向</b>',
    preserveText: true,
  },
  {
    id: 'cyl-step-3',
    title: '寸法の入力',
    text: '項目入力で以下を入力します：\n\n<b>直径</b> – 円柱の幅\n<b>高さ</b> – 円柱の高さ\n\n<b>例:</b> 直径 = 10, 高さ = 10',
    preserveText: true,
  },
  {
    id: 'cyl-step-4',
    title: '配置位置の指定',
    text: 'キー入力エリアで、円柱を配置する基準点の座標値を入力します。\n<b>例: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'cyl-step-5',
    title: '円柱の作成',
    text: '項目入力エリアの入力値を確認し、<b>ENTER キー</b>を押します。\n作業領域に円柱が生成されます。',
    preserveText: true,
  },
];

/* ── Box ─────────────────────────────────────────────────────────────────── */

export const BOX_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '直方体',
  description: 'は、ブロック、プレート、ベース、ブラケットなどの直方体形状の部品を作成するための基本3D形状です。',
  description2: '部品が規定の幅・奥行き・高さを備えている場合に使用します。',
  moduleLabel: '',
  objective: 'このレッスンの終了時までに、iCAD SX で直方体を作成し、配置できるようになります。',
  procedureTitle: '直方体の作成手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>直方体の選択</b> → <b>寸法入力</b> → <b>配置位置の指定</b> → <b>作成確定</b>',
  completionText: 'お疲れ様でした！「直方体」レッスンを完了しました。',
  inlineHeader: true,
};

export const BOX_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'box-step-1',
    title: '直方体の選択',
    text: 'アイコンメニューから「立体配置」を開き、「直方体配置」を選択します。',
    preserveText: true,
  },
  {
    id: 'box-step-2',
    title: '視図の設定',
    text: '3D視図ツールバーから「正面」を選択します。\n\nコマンドメニューから以下を選択します：\n<b>立体配置</b> > <b>Y方向</b>',
    preserveText: true,
  },
  {
    id: 'box-step-3',
    title: '寸法の入力',
    text: '項目入力で以下を入力します：\n\n<b>奥行き</b> – 直方体の奥行き寸法\n<b>幅</b> – 直方体の幅寸法\n<b>高さ</b> – 直方体の高さ寸法\n\n<b>例:</b> 奥行き = 20, 幅 = 30, 高さ = 10',
    preserveText: true,
  },
  {
    id: 'box-step-4',
    title: '配置位置の指定',
    text: 'キー入力エリアで、直方体を配置する座標値を入力します。\n<b>例: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'box-step-5',
    title: '直方体の作成',
    text: '項目入力エリアの数値を確認し、<b>ENTER キー</b>を押します。\n作業領域に直方体が生成されます。',
    preserveText: true,
  },
];

/* ── Polygonal Prism ─────────────────────────────────────────────────────── */

export const POLYGON_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '正多角形柱',
  description: 'は、複数の平坦な側面を持つ3D形状です。六角ブロック、六角ナット、その他多角形形状のコンポーネントを作成する際に活用されます。',
  moduleLabel: '',
  objective: 'このレッスンの終了時までに、iCAD SX で正多角形柱を作成し、配置できるようになります。',
  procedureTitle: '正多角形柱の作成手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>正多角形柱の選択</b> → <b>角数・寸法入力</b> → <b>配置位置の指定</b> → <b>作成確定</b>',
  completionText: 'お疲れ様でした！「正多角形柱」レッスンを完了しました。',
  inlineHeader: true,
};

export const POLYGON_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'poly-step-1',
    title: '正多角形柱の選択',
    text: 'アイコンメニューから「立体配置」を開き、「正多角形柱配置」を選択します。',
    preserveText: true,
  },
  {
    id: 'poly-step-2',
    title: '視図の設定',
    text: '3D視図ツールバーから「正面」を選択します。\n\nコマンドメニューから以下を選択します：\n<b>立体配置</b> > <b>Y方向</b>',
    preserveText: true,
  },
  {
    id: 'poly-step-3',
    title: '寸法の入力',
    text: '項目入力で以下を入力します：\n\n<b>角数</b> - 多角形の面の数を指定します。\n<b>直径</b> - 多角形の外接・内接直径を指定します。\n<b>高さ</b> - 柱の高さを指定します。\n\n<b>例:</b> 角数 = 6, 直径 = 10, 高さ = 10',
    preserveText: true,
  },
  {
    id: 'poly-step-4',
    title: '配置位置の指定',
    text: 'キー入力エリアで、正多角形柱を配置する座標値を入力します。\n<b>例: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'poly-step-5',
    title: '正多角形柱の作成',
    text: '項目入力エリアの数値を確認し、<b>ENTER キー</b>を押します。\n作業領域に正多角形柱が生成されます。',
    preserveText: true,
  },
];

/* ── Cone ────────────────────────────────────────────────────────────────── */

export const CONE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '円錐',
  description: 'は、底面が円形で頂上に向かって細くなる3D形状です。テーパ部品、ノズル、漏斗などの作成に使用されます。',
  moduleLabel: '',
  objective: 'このレッスンの終了時までに、iCAD SX で円錐を作成し、配置できるようになります。',
  procedureTitle: '円錐の作成手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>円錐の選択</b> → <b>寸法入力</b> → <b>配置位置の指定</b> → <b>作成確定</b>',
  completionText: 'お疲れ様でした！「円錐」レッスンを完了しました。',
  inlineHeader: true,
};

export const CONE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'cone-step-1',
    title: '円錐の選択',
    text: 'アイコンメニューから「立体配置」を開き、「円錐配置」を選択します。',
    preserveText: true,
  },
  {
    id: 'cone-step-2',
    title: '視図の設定',
    text: '3D視図ツールバーから「正面」を選択します。\n\nコマンドメニューから以下を選択します：\n<b>立体配置</b> > <b>Y方向</b>',
    preserveText: true,
  },
  {
    id: 'cone-step-3',
    title: '寸法の入力',
    text: '項目入力で以下を入力します：\n\n<b>底面直径</b> – 底面円の直径\n<b>上面直径</b> – 上面円の直径\n<b>高さ</b> - 円錐の高さ\n\n<b>例:</b> 底面直径 = 80, 上面直径 = 40, 高さ = 100',
    preserveText: true,
  },
  {
    id: 'cone-step-4',
    title: '配置位置の指定',
    text: 'キー入力エリアで、円錐を配置する座標値を入力します。\n<b>例: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'cone-step-5',
    title: '円錐の作成',
    text: '項目入力エリアの数値を確認し、<b>ENTER キー</b>を押します。\n作業領域に円錐が生成されます。',
    preserveText: true,
  },
];

/* ── Torus ───────────────────────────────────────────────────────────────── */

export const TORUS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'トーラス',
  description: 'は、リング状の3次元立体です。Oリング、オイルシール、リング部材、曲がりパイプ形状などのモデリングに広く使用されます。',
  moduleLabel: '',
  objective: 'このレッスンの終了時までに、iCAD SX でトーラスを作成し、配置できるようになります。',
  procedureTitle: 'トーラスの作成手順',
  quickReviewTitle: 'クイックレビュー',
  quickReviewText: '<b>トーラスの選択</b> → <b>寸法入力</b> → <b>配置位置の指定</b> → <b>作成確定</b>',
  completionText: 'お疲れ様でした！「トーラス」レッスンを完了しました。',
  inlineHeader: true,
};

export const TORUS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'torus-step-1',
    title: 'トーラスの選択',
    text: 'アイコンメニューから「立体配置」を開き、「トーラス配置」を選択します。',
    preserveText: true,
  },
  {
    id: 'torus-step-2',
    title: '視図の設定',
    text: '3D視図ツールバーから「正面」を選択します。\n\nコマンドメニューから以下を選択します：\n<b>立体配置</b> > <b>Y方向</b>',
    preserveText: true,
  },
  {
    id: 'torus-step-3',
    title: '寸法の入力',
    text: '項目入力で以下を入力します：\n\n<b>断面直径</b> - トーラス断面パイプの太さ\n<b>中心軌道半径</b> - リング全体の中心半径\n<b>旋回角度</b> - 生成する円周角度\n\n<b>例:</b> 断面直径 = 10, 中心軌道半径 = 50, 旋回角度 = 180',
    preserveText: true,
  },
  {
    id: 'torus-step-4',
    title: '配置位置の指定',
    text: 'キー入力エリアで、トーラスを配置する座標値を入力します。\n<b>例: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'torus-step-5',
    title: 'トーラスの作成',
    text: '項目入力エリアの数値を確認し、<b>ENTER キー</b>を押します。\n作業領域にトーラスが生成されます。',
    preserveText: true,
  },
];
