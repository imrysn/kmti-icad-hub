# Foundations course audit

## Result

Reviewed all 77 lessons across 23 modules. All use FoundationReadingLesson and the shared WrittenTutorialPanel shell; none bypasses the shared outer layout. Refined 64 lessons and removed 31 redundant sections across both language versions.

Removed repeated usefulness statements, reminders already covered by steps, and duplicated practice wording. Shortened objectives and introductions. Preserved dimensions, selection order, GO/Enter actions, undo limitations, material mappings and result checks. Retained the Copy versus Repeat Copy visual comparison because it teaches a useful distinction.

## Shared layout and exceptions

- F1–F8: shared typography and spacing with interface cards, mouse diagrams, comparisons and file procedures.
- F9–F15: shared procedure cards, practice sections and preserved demonstrations; Foundations wording can now override inherited Professional content independently.
- F16–F20: shared step cards with work-plane, hole, Boolean, component and fairing illustrations. Comparison panels remain where the operations differ.
- F21: shared procedure cards; Material Description uses a specialized reference table.
- F22: shared material procedure cards; unlisted materials use large image previews and a centered reference table.
- F23: review and final assessment use the shared reader and assessment workflow.

These are intentional body-layout differences, not separate lesson shells. Lesson-specific dispatch remains in FoundationReadingLesson; declarative renderer metadata would be a future maintenance improvement.

## Fixes implemented

- Frontend and backend now honor Foundations editorial overrides without modifying Professional source content or changing progress identities.
- Shared preview controls fill their artwork frames rather than inheriting normal button height, fixing Save and Separate artwork overflow.
- Hole Details previews remain within their frames on narrow screens.
- Instruction paragraphs align left; headings and artwork remain centered.
- Removed repetitive command-menu descriptions.
- Unlisted-material assessment options and correct-answer feedback now follow the shared format.
- Development audit harness resolves Foundations IDs before Professional aliases.

## Validation

- 308 browser geometry cases: 77 lessons × English/Japanese × 1440/390 px.
- No broken images, JavaScript errors or document horizontal overflow detected in loaded cases. One initial Copy Component load timeout passed a focused recheck.
- 16 focused rechecks of Save, Separate, Hole Details and Copy Component: no preview spills after fixes.
- The 8–9 px list overflow flags come from intentionally clipped connector lines. Hidden sections with zero-position bounds are not actual overlaps.
- Representative Save, material-setting and unlisted-material screenshots inspected. Automated geometry checks are not a pixel-by-pixel review of every case.
- Frontend: 363/364 passed initially; the remaining cold-load routing test passed after explicitly waiting for dynamic imports. All four routing tests then passed.
- Backend curriculum: 14 tests passed. TypeScript check passed. Diff whitespace check passed.

## Limits

Native iCAD SX operations were not replayed. Supplied low-resolution reference images remain low resolution; enlargement cannot recover original detail. Important values remain available in accompanying text and tables.

## Lesson inventory

“Retained” means reviewed without unnecessary rewriting. All rows use the shared outer shell.

| Lesson | Shell | Content | Removed redundant sections |
| --- | --- | --- | --- |
| F1.1 What is iCAD SX? | Shared | Refined | — |
| F1.2 What iCAD SX is Used For | Shared | Refined | Why It Is Useful |
| F1.3 Basic Workflow: 3D → 2D | Shared | Refined | — |
| F1.4 Starting iCAD SX | Shared | Refined | — |
| F1.5 Closing iCAD SX | Shared | Refined | Important Reminder |
| F1.6 Introduction to iCAD SX Help | Shared | Refined | — |
| F2.1 iCAD SX Screen Layout | Shared | Refined | Why the Screen Layout is Important |
| F2.2 Understanding the Toolbar | Shared | Refined | Important Reminder |
| F3.1 Basic Mouse Operations | Shared | Refined | — |
| F3.2 Pan | Shared | Refined | Important Reminder |
| F3.3 Rotate the 3D View | Shared | Refined | — |
| F4.1 3D VIEWS | Shared | Refined | — |
| F4.2 USER VIEWS | Shared | Refined | — |
| F4.3 SHADING | Shared | Refined | — |
| F5.1 Keyboard Basics | Shared | Retained | — |
| F5.2 Understanding Coordinates and the Origin | Shared | Retained | — |
| F5.3 Specifying Coordinates | Shared | Retained | — |
| F6.1 Basic Element Selection | Shared | Refined | Important Reminder |
| F6.2 Selecting Parts and Solid Components | Shared | Refined | Important Reminder |
| F6.3 Search / Selection Type | Shared | Refined | Important Reminder |
| F7.1 Understanding iCAD Drawing Structure | Shared | Refined | — |
| F7.2 Understanding Parts | Shared | Refined | — |
| F7.3 Introduction to Assemblies | Shared | Refined | — |
| F7.4 Understanding 3D and 2D Drawings | Shared | Refined | — |
| F8.1 Creating a New Item | Shared | Refined | — |
| F8.2 Saving Your Work | Shared | Refined | — |
| F8.3 Closing a Drawing | Shared | Refined | — |
| F9.1 Box | Shared | Refined | — |
| F9.2 Cylinder | Shared | Refined | — |
| F9.3 Polygon | Shared | Refined | — |
| F9.4 Cone | Shared | Refined | — |
| F9.5 Torus | Shared | Refined | — |
| F10.1 Move | Shared | Refined | Important Reminder |
| F10.2 Copy | Shared | Refined | Important Reminder |
| F10.3 Rotate | Shared | Refined | — |
| F10.4 Rotate Copy | Shared | Refined | Important Reminder |
| F10.5 Mirror | Shared | Refined | — |
| F10.6 Mirror Copy | Shared | Refined | Important Reminder |
| F10.7 Delete | Shared | Refined | Important Reminder |
| F10.8 Resize | Shared | Refined | — |
| F11.1 Sketch | Shared | Refined | — |
| F12.1 Extrude | Shared | Refined | — |
| F12.2 Revolve | Shared | Refined | — |
| F13.1 Understanding Show/Hide | Shared | Refined | When Show/Hide is Useful |
| F13.2 Show / Hide Specified Elements | Shared | Refined | — |
| F13.3 Show / Hide Drafting Elements | Shared | Refined | Important Reminder |
| F13.4 Hide Unselected Elements | Shared | Refined | When to Use It; Important Reminder |
| F14.1 Stretch | Shared | Refined | — |
| F15.1 Creating Shape Steels | Shared | Refined | Important Reminder |
| F16.1 Understanding the Work Plane | Shared | Retained | — |
| F16.2 Sketching on a Work Plane | Shared | Refined | — |
| F16.3 Extrude | Shared | Retained | — |
| F16.4 Revolve | Shared | Retained | — |
| F16.5 Spiral Form | Shared | Retained | — |
| F17.1 Creating Hole Details on Parts | Shared | Retained | — |
| F18.1 Union | Shared | Refined | Important Reminder |
| F18.2 Subtract | Shared | Refined | — |
| F18.3 Intersect | Shared | Refined | Important Reminder |
| F18.4 Separate Entity | Shared | Retained | — |
| F19.1 Move Component | Shared | Refined | Important Reminder |
| F19.2 Copy Component | Shared | Refined | Important Reminder |
| F19.3 Mirror Component | Shared | Retained | — |
| F19.4 Rotate Component | Shared | Retained | — |
| F19.5 Repeat Copy Component | Shared | Refined | Important Reminder |
| F19.6 Rotate Copy Component | Shared | Refined | Important Reminder |
| F19.7 Mirror Copy Component | Shared | Refined | Important Reminder |
| F19.8 Delete Component | Shared | Refined | Important Reminder |
| F20.1 Chamfer | Shared | Refined | Important Reminder |
| F20.2 Fillet | Shared | Refined | Important Reminder |
| F20.3 Shell | Shared | Refined | Important Reminder |
| F21.1 Create 3D Part | Shared | Refined | Important Reminder |
| F21.2 Material Description | Shared | Refined | — |
| F21.3 Change 3D Part Name | Shared | Refined | Final Result |
| F22.1 Set Material | Shared | Retained | — |
| F22.3 Materials Not Included in the iCAD Material List | Shared | Retained | — |
| F23.1 Foundation Review | Shared | Refined | — |
| F23.2 Foundation Knowledge Check | Shared | Refined | — |
