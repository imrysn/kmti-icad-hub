# F23 Properties insertion

Approved structure-only insertion. Registry version 4; 24 modules, 80 listed lessons, 77 completable lessons.

| Before | After | Stable internal identity |
| --- | --- | --- |
| F22.1 Set Material | unchanged | foundation-material-set |
| F22.2 legacy redirect | continues to F22.1 | foundation-material-set |
| F22.3 Materials Not Included in the iCAD Material List | unchanged | foundation-material-unlisted |
| New | F23 Properties | F23 module |
| New | F23.1 Change Color | foundation-properties-change-color |
| New | F23.2 Change Layer | foundation-properties-change-layer |
| New | F23.3 Layer Designation of 3D Parts | foundation-properties-part-layer-designation |
| F23 Foundation Review | F24 Foundation Review | module grouping renumbered |
| F23.1 Foundation Review | F24.1 Foundation Review | F17.1 |
| F23.2 Foundation Knowledge Check | F24.2 Foundation Knowledge Check | F17.2 |

Navigation: F22.1 → F22.3 → F23.1 → F23.2 → F23.3 → F24.1 → F24.2. Previous navigation reverses this sequence. F22.2 remains merged, as approved.

Properties lessons contain only titles and empty schema fields, with `contentReview: not-authored`. The existing placeholder renderer provides Previous/Next. No body, objective, artwork, recap or assessment is authored. Japanese title fields temporarily use the supplied English titles pending verified terminology.

Both frontend and backend exclude unauthored lessons from completion credit and the progress denominator. Course listings count all 80 lessons. Existing completion IDs, aliases, assessments and Professional source relationships remain unchanged.

Saved-state version 3 (or older) F23.1/F23.2 references restore to the original review identities. Version 4 references resolve to Properties. Earlier F9/F10 migration behavior is retained for pre-version-3 state. Unversioned direct numeric links F23.1/F23.2 now identify Properties; stable F17.1/F17.2 links still identify Review. Old and new meanings cannot share one unversioned numeric alias.

Validation compares every pre-existing lesson with a pre-insertion snapshot: content and nonstructural metadata are unchanged. Tests cover the full boundary, placeholder rendering, migration, progress eligibility, bilingual structure and backend projection.

Validation results: 277 focused frontend tests passed across the initial run and corrected navigation-test rerun; 15 backend tests passed; TypeScript and diff checks passed. Browser checks confirmed all three title-only pages in English and Japanese.
