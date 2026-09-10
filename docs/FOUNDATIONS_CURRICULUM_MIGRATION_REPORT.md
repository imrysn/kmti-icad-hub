# iCAD Foundations curriculum migration report

## 1. Implementation summary

The active course contains **10 modules and 94 unique items**, in the exact order transcribed in the supplied request. The actual Excel tracker was not attached; the transcription is the available curriculum source.

One shared registry, `data/foundations-curriculum.json`, drives frontend modules, titles, written summaries, aliases, next/previous order, the course card count, the public preview, and backend curriculum/progress projections. All canonical IDs are F1.1–F10.6. The old source catalog is named `PRESERVED_FOUNDATIONS_LESSONS` and is excluded from active Foundations routing.

Existing tutorial engines and verified video configuration data are retained. A small optional completion context connects the preserved video recap to canonical saving and advancement, with retry on failure. It does not change timestamps, overlays, source media or narration engines. Manual reading completion opens a narrated recap. F10.6 uses the existing question panel for five beginner topics, requiring correct answers before the final recap. It does not grant a certificate.

Implementation and automated verification are complete; instructional sign-off remains pending for newly authored EN/JP content. No commits, deployment, live progress migration or source-content deletion were performed.

## 2. Old → new curriculum migration

| Old lesson/content | New target | Action and completion treatment |
|---|---|---|
| Getting Started / lesson-1-1 | F1.1–F1.3 | Split beginner concepts into focused readings; legacy completion credits F1.1 only |
| Interface / lesson-2-1 | F2.1 and focused F2 readings | Reuse verified bilingual image tour at F2.1; credit F2.1 only |
| Tool Bars / toolbars | F2.9 | Reuse verified bilingual image tour; direct credit |
| Zoom / lesson-3-1 | F3.3, F3.4 | Shared unchanged zoom-in/out recording; existing legacy completion credits both, bookmark resolves to F3.3 |
| Pan / lesson-3-2 | F3.5 | Reuse and direct credit |
| Rotate the view / lesson-3-3 | F3.6 | Reuse navigation and direct credit |
| Standard Views / lesson-4-1 | F4.1; focused readings F3.9/F4.2–F4.5 | Full verified tour at F4.1; credit F4.1 only |
| User View / lesson-4-2 | F4.6; focused F4.7–F4.11 readings | Reuse overview; never auto-credit new registration/edit/delete procedures |
| Origin / origin-projections, lesson-5-1 | F5.4 | Reuse bilingual written tutorial and origin image; direct credit |
| Change 3D Part Layout / origin-layout, lesson-5-2 | Preserved Professional source | Removed from Foundations; no new course credit |
| Box / basic-op-box | F9.5 | Reuse written/video tutorial and direct credit |
| Cylinder / basic-op-cylinder | F9.6 | Reuse written/video tutorial and direct credit |
| Polygon / basic-op-polygon | F9.7 | Reuse written/video tutorial and direct credit |
| Move / lesson-6-1, move | F9.9 | Reuse beginner tutorial and direct credit |
| Copy / lesson-6-4, copy | F9.10 | Reuse beginner tutorial and direct credit |
| Delete / lesson-6-7, delete | F9.11 | Reuse beginner tutorial and direct credit |
| Cone, Torus, object Rotate, Mirror, Rotate Copy, Mirror Copy | Preserved Professional source | Removed from Foundations; implementations and media retained |
| Basic 2D Geometry / lesson-7-1, lesson-7-2 | Preserved Professional source | Procedures retained; new F7.7/F7.8 introduce concepts only, no blanket credit |
| Introduction to 3D / lesson-8-1 | Concepts in F7/F9 | New beginner explanations; old profile/extrusion procedure retained outside Foundations |
| Inspect Your First Model / lesson-9-1 | Concepts in F4/F9.13/F10 | No separate legacy module or automatic credit |
| Saving / lesson-10-1 | F8.3; focused F8.1–F8.6 readings | Legacy completion credits Save only |
| Troubleshooting / lesson-11-1 | Preserved optional reference source | Removed from the sequence; not added to an unrelated support interface |
| Guided Exercise / lesson-12-1 | Preserved Professional assignment source | No Foundations navigation or progress credit |
| Practical Assessment / lesson-13-1 | Preserved Complete assessment source | No Foundations navigation or certification; no completion credit |
| New tracker topics | Remaining F1–F10 items | Focused bilingual reading/review content; no fabricated MP4 paths |

## 3. Files created

- `backend/services/foundations_curriculum.py`
- `backend/tests/test_foundations_curriculum.py`
- `data/foundations-curriculum.json`
- `docs/FOUNDATIONS_CURRICULUM_IMPLEMENTATION_PLAN.md`
- `docs/FOUNDATIONS_CURRICULUM_MIGRATION_REPORT.md`
- `frontend/src/components/iCAD_Foundations/FoundationCompletionContext.ts`
- `frontend/src/components/iCAD_Foundations/FoundationReadingLesson.tsx`
- `frontend/src/components/iCAD_Foundations/__tests__/FoundationReadingLesson.test.tsx`
- `frontend/src/components/iCAD_Foundations/__tests__/FoundationRouting.test.tsx`
- `frontend/src/components/iCAD_Foundations/__tests__/FoundationVideoCompletion.test.tsx`
- `frontend/src/components/iCAD_Foundations/__tests__/curriculum.test.ts`
- `frontend/src/components/iCAD_Foundations/curriculum.ts`
- `frontend/src/components/iCAD_Foundations/knowledgeCheck.ts`

## 4. Files modified

- `frontend/src/components/3D_Modeling/3D_BasicOperation.tsx`
- `frontend/src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx`
- `KMTI_iCAD_Server.spec`
- `backend/build_exe.bat`
- `backend/routers/auth.py`
- `backend/services/course_service.py`
- `backend/services/progress_service.py`
- `frontend/src/components/3D_Modeling/VideoTutorialViewer.tsx`
- `frontend/src/components/PublicCourses/Foundations/__tests__/foundationsRecapCoverage.test.ts`
- `frontend/src/components/PublicCourses/Foundations/foundationsRecaps.ts`
- `frontend/src/config/translations/index.ts`
- `frontend/src/services/__tests__/phase7FoundationsNarration.test.ts`
- `frontend/src/views/Landing/LandingView.tsx`
- `frontend/src/views/mentor/MentorMode.tsx`
- `frontend/src/views/mentor/components/CourseSelector.tsx`
- `frontend/src/views/mentor/components/LessonViewer.tsx`
- `frontend/src/views/mentor/mentorConstants.ts`

## 5. Removed from Foundations navigation

No implementation files were deleted. These entries are excluded from the active registry and cannot fall through to the old prefix router:

- Cone and Torus.
- Change 3D Part Layout.
- Object Rotate, Mirror, Rotate Copy and Mirror Copy.
- Procedural Basic 2D Geometry and the old profile/extrusion Introduction to 3D lesson.
- Standalone Inspect Your First Model, Troubleshooting, Guided Exercise and Practical Assessment modules.
- All old top-level module IDs/names, replaced by F1–F10.

The original written EN/JP files, video EN/JP files, reusable components and assets remain in place. A retired saved lesson displays an explanatory notice and the new sidebar, rather than exposing advanced material or erasing history.

## 6. Professional / Complete preservation

Advanced shape/transformation/2D content and the guided exercise remain available as source material for Professional. PracticalAssessment EN/JP content and the existing assessment functionality remain as source material for Complete. This change does not build a new Professional or Complete curriculum. Troubleshooting is retained as reference source; there was no equivalent Foundations support entry to move it into safely.

## 7. New lessons created

All 94 items have canonical bilingual metadata, a short explanation and practice instruction. **79 items** use the new written/review adapter; **15 items** reuse existing tutorial renderers (including two zoom entries sharing one recording). Full per-item detail appears below.

New reading/review adapter IDs:

F1.1, F1.2, F1.3, F1.4, F1.5, F1.6, F2.2, F2.3, F2.4, F2.5, F2.6, F2.7, F2.8, F2.10, F2.11, F2.12, F2.13, F2.14, F2.15, F3.1, F3.2, F3.7, F3.8, F3.9, F3.10, F4.2, F4.3, F4.4, F4.5, F4.7, F4.8, F4.9, F4.10, F4.11, F4.12, F4.13, F5.1, F5.2, F5.3, F5.5, F5.6, F5.7, F5.8, F6.1, F6.2, F6.3, F6.4, F6.5, F6.6, F6.7, F6.8, F6.9, F7.1, F7.2, F7.3, F7.4, F7.5, F7.6, F7.7, F7.8, F8.1, F8.2, F8.3, F8.4, F8.5, F8.6, F9.1, F9.2, F9.3, F9.4, F9.8, F9.12, F9.13, F10.1, F10.2, F10.3, F10.4, F10.5, F10.6.

## 8. Video lessons reused

**12 lesson mappings reuse 11 existing MP4 assets.** Paths below are relative to `frontend/src/assets/`. Each file was checked for existence; no media, frame timing, hold flags or normalized overlay coordinates were edited.

| New item | Preserved renderer ID | Existing asset |
|---|---|---|
| F3.3 Zoom In | lesson-3-1 | 3D_INTERACTIVE/zoomin_out.mp4 |
| F3.4 Zoom Out | lesson-3-1 | 3D_INTERACTIVE/zoomin_out.mp4 |
| F3.5 Pan | lesson-3-2 | 3D_INTERACTIVE/pan.mp4 |
| F3.6 Rotate the 3D View | lesson-3-3 | 3D_INTERACTIVE/scroll.mp4 |
| F4.1 What is a 3D View? | lesson-4-1 | 3D_INTERACTIVE/lesson4.1.mp4 |
| F4.6 What is User View? | lesson-4-2 | 3D_INTERACTIVE/lesson4.2.mp4 |
| F9.5 Creating a Box | basic-op-box | 3D_Video_Tutorial/basicOp_box.mp4 |
| F9.6 Creating a Cylinder | basic-op-cylinder | 3D_Video_Tutorial/basicOp_cylinder.mp4 |
| F9.7 Creating a Polygon | basic-op-polygon | 3D_Video_Tutorial/basicOp_polygon.mp4 |
| F9.9 Basic Move | lesson-6-1 | 3D_Video_Tutorial/basicMove.mp4 |
| F9.10 Basic Copy | lesson-6-4 | 3D_Video_Tutorial/basicCopy.mp4 |
| F9.11 Basic Delete | lesson-6-7 | 3D_Video_Tutorial/basicDelete.mp4 |

F2.1 and F2.9 reuse the existing synchronized **image-based** interface/toolbar tours. They do not have an MP4 and are explicitly typed as interactive, with video null. F5.4 reuses the written origin tutorial and illustration.

## 9. Lessons without MP4 assets

**82 items have no MP4 mapping.** The two image-based tours and origin illustration are intentional reused presentations. Other items are written/guided lessons or the knowledge check; missing videos do not block reading completion.

F1.1, F1.2, F1.3, F1.4, F1.5, F1.6, F2.1, F2.2, F2.3, F2.4, F2.5, F2.6, F2.7, F2.8, F2.9, F2.10, F2.11, F2.12, F2.13, F2.14, F2.15, F3.1, F3.2, F3.7, F3.8, F3.9, F3.10, F4.2, F4.3, F4.4, F4.5, F4.7, F4.8, F4.9, F4.10, F4.11, F4.12, F4.13, F5.1, F5.2, F5.3, F5.4, F5.5, F5.6, F5.7, F5.8, F6.1, F6.2, F6.3, F6.4, F6.5, F6.6, F6.7, F6.8, F6.9, F7.1, F7.2, F7.3, F7.4, F7.5, F7.6, F7.7, F7.8, F8.1, F8.2, F8.3, F8.4, F8.5, F8.6, F9.1, F9.2, F9.3, F9.4, F9.8, F9.12, F9.13, F10.1, F10.2, F10.3, F10.4, F10.5, F10.6.

## 10. English / Japanese parity

All 94 IDs have English and Japanese titles, explanation and practice text. UI titles, new reading content, narrated recaps and all five knowledge-check questions are localized. No English-only empty Japanese lessons or placeholder keys are used. Existing verified bilingual tutorial bodies remain unchanged.

**Review status:** newly authored summaries/instructions are drafts, not certified translations. The 79 new written/review items carry `instructor-review-required`. All newly authored metadata/summaries should be checked by an iCAD instructor; in particular F4.7–F4.11 (view-list registration/modification/deletion), F6 selection terminology and F7 structure terminology need verification against the installed iCAD version and the actual Japanese tracker/manual. Existing English command names are retained where a localized command label is not established. No new shortcut combinations were guessed.

## 11. Progress migration status

Migration is a read-only projection, not a database rewrite. Existing QuizScore rows remain intact. Only completed records (score at least 80) contribute. Both numeric and stable course references are read; canonical IDs and valid legacy equivalents are deduplicated. The denominator is the registry's 94 leaves. Removed lessons, parent modules, unknown IDs and failed scores do not contribute.

New saves use canonical IDs, including saves reached through a legacy bookmark. New split lessons remain incomplete except for explicitly audited equivalents; the old combined zoom course legitimately covers both zoom directions. Backend lesson authorization validates the registry while preserving course-entitlement checks. Aggregate progress is projected in both course progress and trainer history. The Windows packaging inputs now include the shared JSON.

Manual/reading and embedded video recaps save before advancing. A save failure leaves a retryable recap or error state. F10.6 closes back to course selection after saving. No certificate is created.

## 12. Test results

Baseline: 26/26 Vitest suites, 213/213 tests passing. Final full Vitest run: **30/30 suites and 228/228 tests passed**, with no unhandled test errors. Relevant backend regression run: **46/46 tests passed**. `git diff --check` passed. Logs: `docs/foundations-tests.log`, `docs/foundations-backend-tests.log`, and `docs/foundations-build.log`. Added tests cover exact module/count/order/IDs, scope exclusions and preservation, bilingual metadata/content, neighbors, deduplicated migration, video ID/data reuse, reading/quiz narration and completion, canonical renderer routing, retired-route blocking, and embedded recap retry. Existing TTS/subtitle/quiz/recap regression tests remain in the full suite.

Backend tests use isolated test databases and cover canonical/legacy submission, retired/unknown rejection, course access, 94-item localized API output, read-only progress, course-reference compatibility, course delivery/lifecycle and existing services.

## 13. TypeScript / build

**TypeScript: 0 errors. Production Vite build: passed.** `npm run build` includes `tsc --noEmit --incremental false` before the production bundle. Existing Vite native-config and large-chunk warnings are non-fatal. No Electron executable or deployment was produced. Packaging configuration includes the registry but a new packaged executable has not been smoke-tested.

## 14. Remaining risks / content gaps

- The actual Excel tracker was not supplied. Counts, titles and order match the user's exact transcription; workbook-specific metadata could not be compared.
- The newly authored instructional EN/JP drafts need instructor review, especially the view-list and model-structure topics listed above.
- 82 items intentionally have no MP4; the exhaustive inventory is in section 9. No placeholder media paths were added.
- Existing broad interface/view tours remain broad overviews; new focused lessons provide the tracker breakdown. The unchanged combined zoom video is reused at both F3.3 and F3.4.
- Browser smoke verification confirmed the public preview displays the new first lessons and 94-item count. Authenticated course routing/completion was verified through component and isolated API tests, not by changing a live trainee's records. Real-time synthesized audio and every MP4 were not replayed end-to-end in a signed-in session.
- Existing content is preserved for Professional/Complete reuse; those plans were not redesigned or republished.

## Per-item content / migration inventory

| ID | English title | Japanese title | Action / renderer | Legacy completion equivalents | Media |
|---|---|---|---|---|---|
| F1.1 | What is iCAD SX? | iCAD SX とは？ | CREATE focused reading/review | lesson-1-1 | No MP4 |
| F1.2 | What iCAD SX is Used For | iCAD SX の用途 | CREATE focused reading/review | None | No MP4 |
| F1.3 | Basic Workflow: 3D → 2D | 基本的な流れ：3D → 2D | CREATE focused reading/review | None | No MP4 |
| F1.4 | Starting iCAD SX | iCAD SX の起動 | CREATE focused reading/review | None | No MP4 |
| F1.5 | Closing iCAD SX | iCAD SX の終了 | CREATE focused reading/review | None | No MP4 |
| F1.6 | Introduction to iCAD SX Help | iCAD SX ヘルプの紹介 | CREATE focused reading/review | None | No MP4 |
| F2.1 | iCAD SX Screen Layout | iCAD SX の画面構成 | REUSE lesson-2-1 | lesson-2-1 | Existing image tour |
| F2.2 | Menu Bar | メニューバー | CREATE focused reading/review | None | No MP4 |
| F2.3 | File Menu | ファイルメニュー | CREATE focused reading/review | None | No MP4 |
| F2.4 | View Menu | 表示メニュー | CREATE focused reading/review | None | No MP4 |
| F2.5 | Settings Menu | 設定メニュー | CREATE focused reading/review | None | No MP4 |
| F2.6 | Tools Menu | ツールメニュー | CREATE focused reading/review | None | No MP4 |
| F2.7 | Window Menu | ウィンドウメニュー | CREATE focused reading/review | None | No MP4 |
| F2.8 | Help Menu | ヘルプメニュー | CREATE focused reading/review | None | No MP4 |
| F2.9 | Understanding the Toolbar | ツールバーの理解 | REUSE toolbars | toolbars | Existing image tour |
| F2.10 | Input Control Area | 入力制御領域 | CREATE focused reading/review | None | No MP4 |
| F2.11 | Item Input Area | 項目入力領域 | CREATE focused reading/review | None | No MP4 |
| F2.12 | Key Input Area | キー入力領域 | CREATE focused reading/review | None | No MP4 |
| F2.13 | Information and Message Display | 情報とメッセージ表示 | CREATE focused reading/review | None | No MP4 |
| F2.14 | Working / Modeling Area | 作業・モデリング領域 | CREATE focused reading/review | None | No MP4 |
| F2.15 | Tree / Model Structure View | ツリー・モデル構造表示 | CREATE focused reading/review | None | No MP4 |
| F3.1 | Basic Mouse Operations | マウスの基本操作 | CREATE focused reading/review | None | No MP4 |
| F3.2 | Wheel Mouse Operations | ホイールマウスの操作 | CREATE focused reading/review | None | No MP4 |
| F3.3 | Zoom In | ズームイン | REUSE lesson-3-1 | lesson-3-1 | 3D_INTERACTIVE/zoomin_out.mp4 |
| F3.4 | Zoom Out | ズームアウト | REUSE lesson-3-1 | lesson-3-1 | 3D_INTERACTIVE/zoomin_out.mp4 |
| F3.5 | Pan | パン | REUSE lesson-3-2 | lesson-3-2 | 3D_INTERACTIVE/pan.mp4 |
| F3.6 | Rotate the 3D View | 3D ビューの回転 | REUSE lesson-3-3 | lesson-3-3 | 3D_INTERACTIVE/scroll.mp4 |
| F3.7 | Fit Model to Screen / Full View | モデル全体の表示 | CREATE focused reading/review | None | No MP4 |
| F3.8 | Previous View | 前の表示 | CREATE focused reading/review | None | No MP4 |
| F3.9 | Standard View | 標準ビュー | CREATE focused reading/review | None | No MP4 |
| F3.10 | Refresh / Redraw the Screen | 画面の再描画 | CREATE focused reading/review | None | No MP4 |
| F4.1 | What is a 3D View? | 3D ビューとは？ | REUSE lesson-4-1 | lesson-4-1 | 3D_INTERACTIVE/lesson4.1.mp4 |
| F4.2 | Front View | 正面図 | CREATE focused reading/review | None | No MP4 |
| F4.3 | Top View | 上面図 | CREATE focused reading/review | None | No MP4 |
| F4.4 | Side View | 側面図 | CREATE focused reading/review | None | No MP4 |
| F4.5 | Isometric / Standard 3D View | 等角・標準 3D ビュー | CREATE focused reading/review | None | No MP4 |
| F4.6 | What is User View? | ユーザービューとは？ | REUSE lesson-4-2 | lesson-4-2 | 3D_INTERACTIVE/lesson4.2.mp4 |
| F4.7 | Understanding the View List | ビュー一覧の理解 | CREATE focused reading/review | None | No MP4 |
| F4.8 | Registering a User View | ユーザービューの登録 | CREATE focused reading/review | None | No MP4 |
| F4.9 | Modifying a User View | ユーザービューの変更 | CREATE focused reading/review | None | No MP4 |
| F4.10 | Deleting a User View | ユーザービューの削除 | CREATE focused reading/review | None | No MP4 |
| F4.11 | Restoring a Registered 3D View | 登録済み 3D ビューの復元 | CREATE focused reading/review | None | No MP4 |
| F4.12 | Shading Basics | シェーディングの基礎 | CREATE focused reading/review | None | No MP4 |
| F4.13 | Show and Hide Basics | 表示・非表示の基礎 | CREATE focused reading/review | None | No MP4 |
| F5.1 | Basic Keyboard Operations | キーボードの基本操作 | CREATE focused reading/review | None | No MP4 |
| F5.2 | Useful iCAD Keyboard Operations | 便利な iCAD のキー操作 | CREATE focused reading/review | None | No MP4 |
| F5.3 | Understanding X, Y and Z | X・Y・Z の理解 | CREATE focused reading/review | None | No MP4 |
| F5.4 | Understanding the Origin | 原点の理解 | REUSE origin-projections | origin-projections, lesson-5-1 | No MP4 |
| F5.5 | Positive and Negative Directions | 正方向と負方向 | CREATE focused reading/review | None | No MP4 |
| F5.6 | Specifying Coordinates with the Mouse | マウスによる座標指定 | CREATE focused reading/review | None | No MP4 |
| F5.7 | Specifying Coordinates with the Keyboard | キーボードによる座標指定 | CREATE focused reading/review | None | No MP4 |
| F5.8 | Coordinate Input Practice | 座標入力の練習 | CREATE focused reading/review | None | No MP4 |
| F6.1 | What is an Element? | 要素とは？ | CREATE focused reading/review | None | No MP4 |
| F6.2 | Basic Element Selection | 要素の基本選択 | CREATE focused reading/review | None | No MP4 |
| F6.3 | Selecting Multiple Elements | 複数要素の選択 | CREATE focused reading/review | None | No MP4 |
| F6.4 | Selecting a Part | 部品の選択 | CREATE focused reading/review | None | No MP4 |
| F6.5 | Selecting a Solid Component | 立体要素の選択 | CREATE focused reading/review | None | No MP4 |
| F6.6 | Part vs. Solid Component | 部品と立体要素の違い | CREATE focused reading/review | None | No MP4 |
| F6.7 | Search / Selection Type | 検索・選択の種類 | CREATE focused reading/review | None | No MP4 |
| F6.8 | Clearing a Selection | 選択の解除 | CREATE focused reading/review | None | No MP4 |
| F6.9 | Selection Practice | 選択の練習 | CREATE focused reading/review | None | No MP4 |
| F7.1 | Drawing File Structure | 図面ファイルの構造 | CREATE focused reading/review | None | No MP4 |
| F7.2 | Understanding a 3D Drawing | 3D 図面の理解 | CREATE focused reading/review | None | No MP4 |
| F7.3 | What is a Part? | 部品とは？ | CREATE focused reading/review | None | No MP4 |
| F7.4 | How Parts are Specified | 部品の指定方法 | CREATE focused reading/review | None | No MP4 |
| F7.5 | Parts vs. Actual / Solid Components | 部品と実体・立体要素 | CREATE focused reading/review | None | No MP4 |
| F7.6 | Introduction to Groups | グループの紹介 | CREATE focused reading/review | None | No MP4 |
| F7.7 | Introduction to 2D Detailings | 2D 図面の紹介 | CREATE focused reading/review | None | No MP4 |
| F7.8 | Relationship Between 3D and 2D | 3D と 2D の関係 | CREATE focused reading/review | None | No MP4 |
| F8.1 | Create a New File | 新規ファイルの作成 | CREATE focused reading/review | None | No MP4 |
| F8.2 | Open an Existing File | 既存ファイルを開く | CREATE focused reading/review | None | No MP4 |
| F8.3 | Save | 保存 | CREATE focused reading/review | lesson-10-1 | No MP4 |
| F8.4 | Save As | 名前を付けて保存 | CREATE focused reading/review | None | No MP4 |
| F8.5 | Close a Drawing | 図面を閉じる | CREATE focused reading/review | None | No MP4 |
| F8.6 | Basic File Management Practices | 基本的なファイル管理 | CREATE focused reading/review | None | No MP4 |
| F9.1 | Understanding Basic 3D Shapes | 基本的な 3D 形状 | CREATE focused reading/review | None | No MP4 |
| F9.2 | Understanding Tool Selection | ツール選択の理解 | CREATE focused reading/review | None | No MP4 |
| F9.3 | Understanding Dimension Input | 寸法入力の理解 | CREATE focused reading/review | None | No MP4 |
| F9.4 | Understanding Origin Input | 原点入力の理解 | CREATE focused reading/review | None | No MP4 |
| F9.5 | Creating a Box | 直方体の作成 | REUSE basic-op-box | basic-op-box | 3D_Video_Tutorial/basicOp_box.mp4 |
| F9.6 | Creating a Cylinder | 円柱の作成 | REUSE basic-op-cylinder | basic-op-cylinder | 3D_Video_Tutorial/basicOp_cylinder.mp4 |
| F9.7 | Creating a Polygon | 多角柱の作成 | REUSE basic-op-polygon | basic-op-polygon | 3D_Video_Tutorial/basicOp_polygon.mp4 |
| F9.8 | Selecting a Created Shape | 作成した形状の選択 | CREATE focused reading/review | None | No MP4 |
| F9.9 | Basic Move | 基本的な移動 | REUSE lesson-6-1 | lesson-6-1, move | 3D_Video_Tutorial/basicMove.mp4 |
| F9.10 | Basic Copy | 基本的なコピー | REUSE lesson-6-4 | lesson-6-4, copy | 3D_Video_Tutorial/basicCopy.mp4 |
| F9.11 | Basic Delete | 基本的な削除 | REUSE lesson-6-7 | lesson-6-7, delete | 3D_Video_Tutorial/basicDelete.mp4 |
| F9.12 | Undoing an Operation | 操作の取り消し | CREATE focused reading/review | None | No MP4 |
| F9.13 | Basic Measurement | 基本的な測定 | CREATE focused reading/review | None | No MP4 |
| F10.1 | Interface Review | 画面構成の復習 | CREATE focused reading/review | None | No MP4 |
| F10.2 | Navigation Review | 画面操作の復習 | CREATE focused reading/review | None | No MP4 |
| F10.3 | Coordinate Review | 座標の復習 | CREATE focused reading/review | None | No MP4 |
| F10.4 | Selection Review | 選択の復習 | CREATE focused reading/review | None | No MP4 |
| F10.5 | Basic Modeling Review | 基本モデリングの復習 | CREATE focused reading/review | None | No MP4 |
| F10.6 | Foundation Knowledge Check | 基礎の理解度チェック | CREATE focused reading/review | None | No MP4 |

## Layout follow-up — F3.3 reference

All 94 Foundations items now use the F3.3 single-card structure: `lesson-grid single-card` containing `lesson-card tab-content fade-in`, with the standard Foundations spacing and footer navigation. Written/review lessons use the same integrated written panel and no longer show a standalone Read Aloud button. Reused view/origin/shape lessons use the same container styling and progress-bar placement. Video playback, quizzes, narration, recaps and completion logic remain unchanged. Validation logs for this follow-up: `docs/foundations-layout-tests.log` and `docs/foundations-layout-build.log`.
