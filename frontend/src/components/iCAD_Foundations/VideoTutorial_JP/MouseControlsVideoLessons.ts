import panVideo from '../../../assets/3D_INTERACTIVE/pan.mp4';
import rotateViewVideo from '../../../assets/3D_INTERACTIVE/scroll.mp4';
import zoomInOutVideo from '../../../assets/3D_INTERACTIVE/zoomin_out.mp4';
import {
  PAN_WRITTEN_TUTORIAL_COPY,
  PAN_WRITTEN_TUTORIAL_STEPS,
  ROTATE_VIEW_WRITTEN_TUTORIAL_COPY,
  ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS,
  ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY,
  ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS,
} from '../WrittenTutorial_JP/MouseControlsAndModelNavigation';
import type { InteractiveVideoLessonConfig } from './types';

/* ── Lesson 3.1: Zoom In and Zoom Out Video Tutorial ─────────────────────── */
export const zoomInOutVideoLessonConfig: InteractiveVideoLessonConfig = {
  id: 'lesson-3-1',
  title: 'ズームインとズームアウト',
  objective: 'ズームインおよびズームアウトの仕組みと、iCAD における適切な使い分けを理解します。',
  videoSrc: zoomInOutVideo,
  videoLabel: 'iCAD ズームインとズームアウトの実演',
  introSupportingText: 'iCAD でモデル作業を行う際の視図倍率の制御方法を学びます。',
  introNarration: 'iCAD ナビゲーションレッスンへようこそ。このレッスンでは、モデルを観察する際のズームインおよびズームアウトの方法を学びます。',
  segments: [
    {
      id: 'zoom-in',
      label: 'ズームイン',
      startAt: 3,
      endAt: 11,
      narration: [
        'まず、ズームインから見ていきましょう。詳しく検査したいモデルの領域にマウスカーソルを合わせます。',
        'マウスホイールを前方向へ回転させて拡大します。',
        '視点が近づくにつれて、モデルが大きく表示される様子を確認してください。',
        'ズームインは、微小なフィーチャーや細部の形状を詳しく検査する際に便利です。',
      ],
      overlayText: 'マウスホイール前回転 ↑ = ズームイン',
      narrationCues: [
        {
          at: 3,
          narration: 'まず、ズームインから見ていきましょう。',
        },
        {
          at: 6,
          narration: '詳しく検査したいモデルの領域にマウスカーソルを合わせます。',
        },
        {
          at: 7,
          narration: 'マウスホイールを前方向へ回転させて拡大します。',
          overlayText: 'マウスホイール前回転 ↑ = ズームイン',
        },
        {
          at: 8,
          narration: '視点が近づくにつれて、モデルが大きく表示される様子を確認してください。',
          showSubtitle: false,
        },
        {
          at: 11,
          narration: 'ズームインは、微小なフィーチャーや細部の形状を詳しく検査する際に便利です。',
        },
      ],
      checkpoint: {
        id: 'zoom-in-check',
        prompt: 'iCAD でモデルをズームインするにはどうしますか？',
        choices: [
          { id: 'forward', label: 'マウスホイールを前方向へ回転させる。', isCorrect: true, feedback: '正解です！ホイールを前に回転させると、カーソル周辺が拡大されます。' },
          { id: 'backward', label: 'マウスホイールを後ろ方向へ回転させる。', isCorrect: false, feedback: '惜しいです。ホイールを後ろに回転させるとズームアウトになります。' },
          { id: 'right-click', label: 'マウスの右ボタンをクリックする。', isCorrect: false, feedback: '惜しいです。本レッスンで紹介するズーム操作にはマウスホイールを使用します。' },
        ],
      },
    },
    {
      id: 'zoom-out',
      label: 'ズームアウト',
      startAt: 13,
      endAt: 18,
      narration: [
        '次に、ズームアウトを見ていきましょう。',
        'マウスホイールを後ろ方向へ回転させると、モデルから離れて作業領域のより広い範囲が表示されます。',
        'モデルが小さく表示され、周囲の作業空間が広く見えるようになります。',
        'ズームアウトは、図面やモデル全体のバランス・全体像を俯瞰する際に便利です。',
      ],
      overlayText: 'マウスホイール後回転 ↓ = ズームアウト',
      narrationCues: [
        {
          at: 13,
          narration: '次に、ズームアウトを見ていきましょう。',
        },
        {
          at: 15,
          narration: 'マウスホイールを後ろ方向へ回転させると、モデルから離れて作業領域のより広い範囲が表示されます。',
          overlayText: 'マウスホイール後回転 ↓ = ズームアウト',
        },
        {
          at: 16,
          narration: 'モデルが小さく表示され、周囲の作業空間が広く見えるようになります。',
          showSubtitle: false,
        },
        {
          at: 18,
          narration: 'ズームアウトは、図面やモデル全体のバランス・全体像を俯瞰する際に便利です。',
        },
      ],
      checkpoint: {
        id: 'zoom-out-check',
        prompt: 'iCAD でズームアウトするにはどうしますか？',
        choices: [
          { id: 'backward', label: 'マウスホイールを後ろ方向へ回転させる。', isCorrect: true, feedback: '正解です！ホイールを後ろへ回すと縮小され、作業空間が広く見渡せます。' },
          { id: 'forward', label: 'マウスホイールを前方向へ回転させる。', isCorrect: false, feedback: '惜しいです。前に回すとズームインになります。' },
          { id: 'double-click', label: 'モデルをダブルクリックする。', isCorrect: false, feedback: '惜しいです。ズーム操作にはマウスホイールを使用します。' },
        ],
      },
    },
  ],
  conceptCheck: {
    id: 'zoom-concept-check',
    prompt: 'モデルの小さなフィーチャーを詳しく検査する必要があります。どの操作を使用すべきですか？',
    choices: [
      { id: 'zoom-in', label: 'ズームイン', isCorrect: true, feedback: '正解です！ズームインにより、対象箇所の近接表示が得られます。' },
      { id: 'zoom-out', label: 'ズームアウト', isCorrect: false, feedback: 'ズームアウトは全体を俯瞰するため、微小部分の検査には適していません。' },
      { id: 'close-model', label: 'モデルを閉じる', isCorrect: false, feedback: 'モデルを閉じても検査はできません。' },
    ],
  },
  recapNarration: 'お疲れ様でした！ホイールの前回転でズームイン、後ろ回転でズームアウトです。ズームする前に注目したい箇所へカーソルを合わせておくことがポイントです。',
  recapItems: [
    { action: 'マウスホイール前回転 ↑', result: 'ズームイン' },
    { action: 'マウスホイール後回転 ↓', result: 'ズームアウト' },
  ],
  completionText: 'iCAD でのズームイン・ズームアウト操作が理解できました。',
  writtenTutorialSteps: ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY,
};

export const zoomInOutLessonConfig = zoomInOutVideoLessonConfig;

/* ── Lesson 3.2: Pan Video Tutorial ───────────────────────────────────────── */
export const panVideoLessonConfig: InteractiveVideoLessonConfig = {
  id: 'lesson-3-2',
  title: 'パン',
  objective: 'モデル自体の位置を変えずに、画面内の視図を別の領域へ移動させます。',
  videoSrc: panVideo,
  videoLabel: 'iCAD パンの実演',
  introSupportingText: 'CAD座標上のモデル位置を変えずに、作業領域内で視点を移動する方法を学びます。',
  introNarration: 'パンレッスンへようこそ。このレッスンでは、モデル本体を動かさずに作業領域内で視点を移動する方法を学びます。',
  segments: [
    {
      id: 'pan-view',
      label: '視図のパン',
      startAt: 1,
      endAt: 7.5,
      narration: [
        'マウスカーソルを作業領域内へ移動します。',
        'マウスの中ボタン、またはスクロールホイールを長押しします。',
        '中ボタンを押したまま、マウスを上下左右へドラッグして視図を移動させます。',
        '表示したい領域が見えたら、中ボタンを離します。',
        '画面上ではモデルが動いたように見えますが、CAD上の実際の配置座標は一切変わりません。',
      ],
      overlayText: '中ボタン長押し ＋ ドラッグ = パン',
      narrationCues: [
        {
          at: 1,
          narration: 'マウスカーソルを作業領域内へ移動します。',
        },
        {
          at: 2.5,
          narration: 'マウスの中ボタン、またはスクロールホイールを長押しします。',
          overlayText: '中ボタン長押し = パン開始',
        },
        {
          at: 4,
          narration: '中ボタンを押したまま、マウスを上下左右へドラッグして視図を移動させます。',
          overlayText: '上下左右へドラッグ = 視図のパン',
        },
        {
          at: 6,
          narration: '表示したい領域が見えたら、中ボタンを離します。',
        },
        {
          at: 7.5,
          narration: '画面上ではモデルが動いたように見えますが、CAD上の実際の配置座標は一切変わりません。',
        },
      ],
      checkpoint: {
        id: 'pan-action-check',
        prompt: 'iCAD で視図をパンするにはどうしますか？',
        choices: [
          { id: 'middle-drag', label: 'マウスの中ボタンを長押ししながらドラッグする。', isCorrect: true, feedback: '正解です！中ボタンを押しながらドラッグすると視図が移動します。' },
          { id: 'wheel-scroll', label: 'マウスホイールを前へ回転させる。', isCorrect: false, feedback: '惜しいです。ホイール回転はズーム操作です。' },
          { id: 'left-click', label: 'モデルをマウスの左ボタンでクリックする。', isCorrect: false, feedback: '惜しいです。左クリックは図形要素の選択に使用します。' },
        ],
      },
    },
  ],
  conceptCheck: {
    id: 'pan-concept-check',
    prompt: 'パン操作を行ったとき、何が変化しますか？',
    choices: [
      { id: 'viewpoint', label: '観察視点のみが移動し、モデルの配置位置は変わりません。', isCorrect: true, feedback: '正解です！CAD空間でのモデル位置を動かさずに表示領域のみを変更します。' },
      { id: 'model-position', label: 'モデルが新しいCAD座標位置へ物理的に移動します。', isCorrect: false, feedback: '惜しいです。それは部品移動コマンドの説明です。' },
      { id: 'model-size', label: 'モデルの寸法が大きくなります。', isCorrect: false, feedback: '惜しいです。パン操作で寸法が変わることはありません。' },
    ],
  },
  recapNarration: 'お疲れ様でした！中ボタンを押しながらドラッグして作業画面をパンします。パンは視図を動かすもので、モデル本体の位置は変わりません。',
  recapItems: [
    { action: '中ボタン長押し', result: 'パン開始' },
    { action: 'マウスをドラッグ', result: '視図の移動' },
  ],
  completionText: 'モデルの位置を変えずに作業画面をパンする方法が理解できました。',
  writtenTutorialSteps: PAN_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: PAN_WRITTEN_TUTORIAL_COPY,
};

export const panLessonConfig = panVideoLessonConfig;
  
  /* ── Lesson 3.3: Rotate the 3D View Video Tutorial ─────────────────────────── */
  export const rotateViewVideoLessonConfig: InteractiveVideoLessonConfig = {
  id: 'lesson-3-3',
  title: '3Dビューの回転',
  objective: 'モデル自体を変更することなく、3Dモデルの周囲で観察視点を回転させます。',
  videoSrc: rotateViewVideo,
  videoLabel: 'iCAD 3Dビューの回転の実演',
  introSupportingText: '形状を変更せずに、さまざまな角度から3Dモデルを検査する方法を学びます。',
  introNarration: '3Dビューの回転レッスンへようこそ。このレッスンでは、モデル自体を変えずに多角的な角度から立体を検査する方法を学びます。',
  segments: [
    {
      id: 'rotate-view',
      label: '3Dビューの回転',
      startAt: 1.5,
      endAt: 13.5,
      narration: [
        '視点回転を行うことで、モデルをさまざまな角度から観察できます。',
        'マウスカーソルを3Dモデルの上に合わせます。',
        '中ボタンと右マウスボタンを同時に長押しします。',
        'または、Alt キーを押しながら左マウスボタンでドラッグします。',
        'マウスをゆっくり動かして、モデルの周囲で視点を回転させます。',
        '目的の観察角度に達したら、マウスボタンを離します。',
        '3Dビューの回転は観察する視点を変える操作であり、モデル本体の配置や向きが変わるわけではありません。',
      ],
      overlayText: '中ボタン ＋ 右クリック長押し = 3Dビューの回転',
      narrationCues: [
        {
          at: 1.5,
          narration: '視点回転を行うことで、モデルをさまざまな角度から観察できます。',
        },
        {
          at: 3,
          narration: 'マウスカーソルを3Dモデルの上に合わせます。',
        },
        {
          at: 5,
          narration: '中ボタンと右マウスボタンを同時に長押しします。',
          overlayText: '中ボタン ＋ 右クリック長押し = 3Dビューの回転',
        },
        {
          at: 7,
          narration: 'または、Alt キーを押しながら左マウスボタンでドラッグします。',
          overlayText: '代替操作: Alt ＋ 左ドラッグ',
        },
        {
          at: 9,
          narration: 'マウスをゆっくり動かして、モデルの周囲で視点を回転させます。',
          overlayText: 'マウスを動かす = 観察視点の回転',
        },
        {
          at: 11,
          narration: '目的の観察角度に達したら、マウスボタンを離します。',
        },
        {
          at: 13.5,
          narration: '3Dビューの回転は観察する視点を変える操作であり、モデル本体の配置や向きが変わるわけではありません。',
        },
      ],
      checkpoint: {
        id: 'rotate-action-check',
        prompt: 'iCAD で3Dビューを回転させるマウス操作はどれですか？',
        choices: [
          { id: 'middle-right', label: '中ボタンと右ボタンを同時に押しながらマウスを動かす。', isCorrect: true, feedback: '正解です！中ボタンと右ボタンを同時に押しながら動かすと視点が回転します。' },
          { id: 'wheel-forward', label: 'マウスホイールを前に回転させる。', isCorrect: false, feedback: '惜しいです。ホイール前回転はズームインです。' },
          { id: 'middle-drag', label: '中ボタンのみを押しながらドラッグする。', isCorrect: false, feedback: '惜しいです。中ボタンのみのドラッグはパン操作です。' },
        ],
      },
    },
  ],
  conceptCheck: {
    id: 'rotate-concept-check',
    prompt: '3Dビューの回転を使用したとき、モデルはどうなりますか？',
    choices: [
      { id: 'viewpoint-only', label: '観察する視点のみが変わり、モデル自体は不変です。', isCorrect: true, feedback: '正解です！視点回転はカメラ位置を変更するだけで、モデルの幾何形状や配置は変更されません。' },
      { id: 'model-rotates', label: 'モデルがCAD空間内で恒久的に回転します。', isCorrect: false, feedback: '惜しいです。それは部品自体の回転コマンドです。' },
      { id: 'model-resizes', label: 'モデルの寸法が変更されます。', isCorrect: false, feedback: '惜しいです。視点回転で寸法が変わることはありません。' },
    ],
  },
  recapNarration: 'お疲れ様でした。中ボタンと右マウスボタンを一緒に押し、マウスを動かして視点を回転させます。または、Alt キーを押しながら左マウスボタンでドラッグします。3Dビューの回転は視点を変更するものであり、実際のモデルは変更されません。',
  recapItems: [
    { action: '中ボタン ＋ 右ボタン', result: '3Dビュー回転開始' },
    { action: 'Alt ＋ 左ドラッグ', result: '代替の回転方法' },
    { action: 'マウスを動かす', result: '観察角度の変更' },
  ],
  completionText: '3Dビューを回転させて、モデルを多角的に検査する方法が理解できました。',
  writtenTutorialSteps: ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: ROTATE_VIEW_WRITTEN_TUTORIAL_COPY,
};

export const rotateViewLessonConfig = rotateViewVideoLessonConfig;
