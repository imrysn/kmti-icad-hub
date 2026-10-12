# iCAD Foundations layout audit

Date: 12 October 2026

## Coverage

All 97 registered lessons: English and Japanese at 1440 px and 390 px widths in dark mode (388 views), plus English desktop in light mode (97 views). Used the real lesson reader, shared CSS and preserved tutorials in a local browser harness. Reviewed screenshots of exceptional layouts and tested preview opening and Escape dismissal in Move, Separate Entity, F28.2, F28.3 and Save the Purchase Part.

This is a presentation audit, not independent vendor verification of every CAD instruction. Measurements cover rendered DOM and images, not video playback or text baked into screenshots.

## Findings and fixes

| Area | Finding | Action |
| --- | --- | --- |
| Step typography | Paragraphs consistently 16 px and centered; headings 16.8 px | Preserved |
| F28.2 Step 1 and F28.3 Step 4 | Command icons 48 x 48 px instead of the shared 76 x 76 px | Removed the local override |
| Separate Entity command | Default preview button border remained | Shared step-preview buttons now have transparent backgrounds, no border/shadow and full available width |
| Shared command sizing | Hardcoded 76 px | Introduced a shared command-size token |
| Extrude/Revolve images | Taller 248 px rows | Preserved for readable tall reference diagrams |
| Separate Entity images | Taller 260 px rows | Preserved for diagrams and confirmation dialog |
| Typing/input illustrations | Single and multiple fields have different aspect ratios | Preserved; these are not square command icons |
| Layout families | Tables, comparisons, procedures and video sections differ | Preserved their purpose-specific structures |

## Validation

- After changes: 485 rendered-view checks with no detected horizontal overflow, clipped instruction cards, broken HTML images or render errors.
- All measured command icons: 76 x 76 px. All measured step-card paragraphs: 16 px, centered. All measured card headings: 16.8 px.
- Five representative preview open/Escape-close checks passed.
- TypeScript and 28 focused F28/shared-preview tests passed.
- The full Foundations unit suite was attempted but did not complete cleanly. `interferenceCheck.test.tsx` still expects F27.1/F28.1 to resolve to an old review lesson. The broad run also reported three `FoundationRouting.test.tsx` timeouts. These are outside the three CSS files changed here; no routing or curriculum behavior was changed.

See [the 97-lesson inventory](foundations-layout-inventory.csv) for per-lesson measurements. Missing command metrics mean other artwork or no command icon, not that an image was added.

## Follow-up: reading-text alignment

A separate alignment check found centered regular reading paragraphs or list items in 44 lessons. The earlier card-focused typography checks did not flag these because they measured step-card bodies. The shared rule now centers only compact step-card instructions, while explanatory text, bullet lists and supplemental notes align left. F4.2 uses this shared rule instead of a lesson-specific exception.

Rechecked all 97 lessons in English desktop and Japanese narrow-screen layouts: no centered reading paragraphs/lists remain in the checked selectors, step-card text remains centered, and no horizontal overflow was detected.

Affected lesson titles:

- Basic Workflow: 3D → 2D
- Pan
- Rotate the 3D View
- 3D VIEWS
- SHADING
- Understanding Coordinates and the Origin
- Basic Element Selection
- Selecting Parts and Solid Components
- Search / Selection Type
- Understanding Parts
- Introduction to Assemblies
- Understanding 3D and 2D Drawings
- Creating a New Item
- Saving Your Work
- Closing a Drawing
- Box
- Cylinder
- Polygon
- Cone
- Torus
- Move
- Copy
- Rotate
- Rotate Copy
- Mirror
- Mirror Copy
- Delete
- Resize
- Sketch
- Extrude
- Revolve
- Understanding Show/Hide
- Show / Hide Specified Elements
- Stretch
- Subtract
- Mirror Component
- Rotate Component
- Material Description
- Change 3D Part Name
- Change Color
- Change Layer
- Check for Interferences
- Foundation Review
- Foundation Knowledge Check
