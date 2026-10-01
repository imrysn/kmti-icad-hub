# F23.3 — Layer Designation of 3D Parts

Implemented as five category cards and four responsive tables in English/Japanese. Uses shared comparison card styling, MaterialUnlistedContent's existing table renderer, and InterfaceIconPreview artwork-only enlargement.

References: existing layer1.png, layer2.png, acrylic_pointer.png, isonite_manganese.png, and layer3.png match the supplied common, painted, acrylic/pointer, treatment, and purchased-part examples. layer3.png also supplies the verified encoder example. No new command or screenshot was generated.

The approved pasted specification takes precedence over worksheet additions: no Layer 2/3 assignments. The subsequent reference audit was approved to restore treatment White (No. 1) and Black (No. 16), add the properties_material.png color-code reference, and name chains with sprockets in both languages. Urethane remains No. 18 without a color name. Treatment names remain exactly as supplied. Color numbers are not layer numbers. No inferred engineering color swatches are used.

Only F23.3 curriculum data changed against the pre-implementation snapshot. Navigation remains F23.2 → F23.3 → F24.1 (Foundation Review, canonical F17.1). Completion IDs remain stable; all 80 lessons are now authored/completable. Quiz ID: foundation-properties-part-layer-designation-knowledge-check; correct C, Yellow (No. 4).

Validation: 279 focused frontend tests and 15 backend tests passed; TypeScript check passed. Desktop 1440px and mobile 390px checks in both languages found five cards, four tables, and no horizontal overflow. All five image previews open and close with Escape. Enlarged artwork uses object-fit contain to preserve all reference-image edges.

Latest user correction supersedes the earlier exclusion of layer assignments: Layer 1 common and painted fabricated/machined parts; Layer 2 unpainted/material-code/heat-treated parts; Layer 3 purchased parts. Both languages now display these assignments in category headings, detailed-table headings, and quick reference.
