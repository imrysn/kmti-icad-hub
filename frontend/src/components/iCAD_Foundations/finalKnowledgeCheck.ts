import type { InteractiveVideoQuestion } from '../InteractiveVideoLesson/types';
import type { FoundationLanguage } from './curriculum';

const questions: Record<FoundationLanguage, Array<[string, string[], number, string]>> = {
  "en": [
    [
      "Which area is used for 3D modeling and assembly operations?",
      [
        "Menu Bar",
        "Message Pane",
        "Workspace",
        "Help Menu"
      ],
      2,
      "The Workspace is where 3D modeling and assembly operations are done. Menus and toolbars provide commands."
    ],
    [
      "How do you zoom in and out in iCAD SX?",
      [
        "Rotate the mouse scroll wheel",
        "Hold the left mouse button",
        "Press the Esc key",
        "Double-click the model"
      ],
      0,
      "Rolling the wheel zooms. Holding it while moving the mouse pans the view."
    ],
    [
      "Which statement correctly describes a basic editing command?",
      [
        "Move changes the size of an object",
        "Delete only changes the view",
        "Undo creates another copy",
        "Copy creates a duplicate and keeps the original"
      ],
      3,
      "Move changes position; Copy duplicates; Delete removes; Undo reverses an operation."
    ],
    [
      "Which control can be used to rotate the 3D view?",
      [
        "Hold the wheel button and right mouse button, then move the mouse",
        "Hold Alt and the left mouse button, then move the mouse",
        "Either A or B",
        "Left-click only"
      ],
      2,
      "Both button combinations rotate the view when held while moving the mouse. Rotation changes the view, not the model geometry."
    ],
    [
      "Which view shows the model directly from above?",
      [
        "Top View",
        "Front View",
        "Right Side View",
        "Bottom View"
      ],
      0,
      "Top View looks directly down on the model. Front and side views look from other directions."
    ],
    [
      "Which color represents the Z axis in iCAD SX?",
      [
        "Red",
        "Blue",
        "Yellow",
        "Green"
      ],
      2,
      "In iCAD SX, the X axis is red, the Y axis is blue, and the Z axis is yellow."
    ],
    [
      "What is the coordinate of the origin?",
      [
        "X = 1, Y = 1, Z = 1",
        "X = 0, Y = 0, Z = 0",
        "X = 100, Y = 100, Z = 100",
        "X = -1, Y = -1, Z = -1"
      ],
      1,
      "At the current origin, all three coordinate values are zero."
    ],
    [
      "What is the purpose of Search / Selection Type?",
      [
        "To change the shading mode",
        "To move the model",
        "To save the drawing",
        "To control what type of object can be selected"
      ],
      3,
      "Selection Type limits the kinds of objects a command can select. It does not move or save the model."
    ],
    [
      "What is a Part in iCAD SX?",
      [
        "A viewing direction",
        "A coordinate value",
        "A component used to organize model geometry",
        "A shading option"
      ],
      2,
      "A Part organizes the geometry belonging to a model component."
    ],
    [
      "Which command should you use when you want to create a separate copy of the current file?",
      [
        "Save",
        "Save As",
        "Close",
        "Delete"
      ],
      1,
      "Save updates the current file. Save As lets you create a separate file with a different name or location."
    ],
    [
      "Which sequence represents the basic process for creating a simple 3D shape?",
      [
        "Select View → Save → Delete → Close",
        "Zoom → Pan → Rotate → Exit",
        "Copy → Shade → Measure → Open",
        "Select Tool → Enter Size → Specify Position → Confirm"
      ],
      3,
      "Choose the shape tool, enter its size, set the position, and confirm creation. Size and position are different inputs."
    ],
    [
      "Which keyboard shortcut undoes the last operation?",
      [
        "Ctrl+Z",
        "Ctrl+Y",
        "Enter",
        "Esc"
      ],
      0,
      "Ctrl+Z undoes the last operation and Ctrl+Y redoes it. Enter confirms an input; Esc cancels the current operation."
    ]
  ],
  "ja": [
    [
      "3D モデリングやアセンブリの操作を行う領域はどこですか？",
      [
        "メニューバー",
        "メッセージ領域",
        "作業領域",
        "ヘルプメニュー"
      ],
      2,
      "作業領域で 3D モデリングやアセンブリの操作を行います。メニューやツールバーではコマンドを選びます。"
    ],
    [
      "iCAD SX で拡大・縮小するには、どうしますか？",
      [
        "マウスのホイールを回す",
        "左ボタンを押し続ける",
        "Esc キーを押す",
        "モデルをダブルクリックする"
      ],
      0,
      "ホイールを回すとズームします。押したままマウスを動かすとパンします。"
    ],
    [
      "基本編集コマンドの説明として正しいものはどれですか？",
      [
        "移動は対象の大きさを変える",
        "削除は表示だけを変える",
        "元に戻すは新たな複製を作る",
        "コピーは元の対象を残して複製する"
      ],
      3,
      "移動は位置変更、コピーは複製、削除は対象の除去、元に戻すは操作の取り消しです。"
    ],
    [
      "3D ビューの回転に使える操作はどれですか？",
      [
        "ホイールと右ボタンを押したままマウスを動かす",
        "Alt と左ボタンを押したままマウスを動かす",
        "A と B のどちらでもよい",
        "左クリックのみ"
      ],
      2,
      "どちらの組み合わせも、押したままマウスを動かすとビューを回転します。モデル形状は変わりません。"
    ],
    [
      "モデルを真上から見るビューはどれですか？",
      [
        "上面ビュー",
        "正面ビュー",
        "右側面ビュー",
        "下面ビュー"
      ],
      0,
      "上面ビューはモデルを真上から見ます。正面や側面は別の方向から見ます。"
    ],
    [
      "iCAD SX の Z 軸は何色ですか？",
      [
        "赤",
        "青",
        "黄",
        "緑"
      ],
      2,
      "iCAD SX では、X 軸が赤、Y 軸が青、Z 軸が黄です。"
    ],
    [
      "原点の座標はどれですか？",
      [
        "X = 1, Y = 1, Z = 1",
        "X = 0, Y = 0, Z = 0",
        "X = 100, Y = 100, Z = 100",
        "X = -1, Y = -1, Z = -1"
      ],
      1,
      "現在の原点では、三つの座標値がすべてゼロです。"
    ],
    [
      "検索／選択タイプの目的は何ですか？",
      [
        "シェーディングを変更する",
        "モデルを移動する",
        "図面を保存する",
        "選択できる対象の種類を指定する"
      ],
      3,
      "選択タイプは選択できる対象の種類を指定します。移動や保存の操作ではありません。"
    ],
    [
      "iCAD SX の部品とは何ですか？",
      [
        "表示方向",
        "座標値",
        "モデル形状を整理するための構成要素",
        "シェーディングの設定"
      ],
      2,
      "部品は、モデルの構成要素に属する形状を整理します。"
    ],
    [
      "現在のファイルとは別のコピーを作るとき、どのコマンドを使いますか？",
      [
        "保存",
        "名前を付けて保存",
        "閉じる",
        "削除"
      ],
      1,
      "保存は現在のファイルを更新します。名前を付けて保存は、別名や別の場所にファイルを作成できます。"
    ],
    [
      "基本的な 3D 形状を作る手順はどれですか？",
      [
        "ビュー選択 → 保存 → 削除 → 閉じる",
        "ズーム → パン → 回転 → 終了",
        "コピー → シェーディング → 測定 → 開く",
        "ツール選択 → 寸法入力 → 位置指定 → 確定"
      ],
      3,
      "形状ツールを選び、大きさと位置を指定して作成を確定します。大きさと位置は異なる入力です。"
    ],
    [
      "直前の操作を元に戻すショートカットはどれですか？",
      [
        "Ctrl+Z",
        "Ctrl+Y",
        "Enter",
        "Esc"
      ],
      0,
      "Ctrl+Z で直前の操作を元に戻し、Ctrl+Y でやり直します。Enter は入力の確定、Esc は操作の取り消しです。"
    ]
  ]
};

export function finalKnowledgeCheck(language: FoundationLanguage): InteractiveVideoQuestion[] {
  return questions[language].map(([prompt, labels, correctIndex, explanation], index) => ({
    id: `F16.2-q${index + 1}`,
    prompt,
    choices: labels.map((label, choiceIndex) => ({
      id: `F16.2-${index}-${choiceIndex}`,
      label: `${'ABCD'[choiceIndex]}. ${label}`,
      isCorrect: choiceIndex === correctIndex,
      feedback: choiceIndex === correctIndex
        ? `${language === 'ja' ? '正解：' : 'Correct Answer: '}${'ABCD'[correctIndex]}. ${labels[correctIndex]} — ${explanation}`
        : explanation,
    })),
  }));
}
