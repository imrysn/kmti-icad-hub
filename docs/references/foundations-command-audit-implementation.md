# Foundations command audit implementation

Scope: F19.1–F19.8, F18.3–F18.4, F17.1, F16.3–F16.5, English and Japanese.

## Content and rendering

- Shortened descriptions, objectives, procedures and reminders using the reviewed wording.
- Removed the duplicate Intersect introduction/comparison and result sections. The procedure is now section zero; the reading renderer leaves its reminder as ordinary text.
- Kept Knowledge Check schemas, answers, lesson identifiers, completion identifiers, aliases and navigation unchanged.
- Kept existing procedure components, card dimensions, screenshots, command highlight regions and point overlays.
- Separate Selected / Separate All now use the existing preview component with their original cropped menu references. These references are menu crops, not full interface captures.
- English command names are used where a Japanese tooltip remains unverified. This also applies to the affected preview titles.

## SVG provenance and limitations

`foundationCommandPaths.json` records the source path and pixel crop for each of the 15 command variants. The existing operation and creation icon components render its colored SVG paths; they do not embed raster images or use generic replacements. Existing variants used by other lessons are unchanged.

The initial pixel-contour traces have been replaced with smooth, manually reconstructed SVG paths after fullscreen review showed visible pixel blocks. The reconstruction follows the reference silhouettes, curves, arrows, copy badges and meaningful colors. It is a vector interpretation of the available B-quality references, not recovered original vendor artwork. The original reference images remain available in the fullscreen location previews.

The existing renderers use geometric precision, rounded stroke joins and scalable path geometry. Command thumbnails remain 76 × 76; comparison icons remain 36 × 36. The shared fullscreen preview centers and enlarges both wrapped and direct SVG artwork.

To regenerate the reviewed geometry from repository root:

```powershell
backend/venv/Scripts/python.exe scripts/build-smooth-command-icons.py
```

## Reference issues still requiring verification

1. **F19.4 Rotate Component:** supplied operation/result screenshots show Rotate Copy. Retained the bilingual result caveat. Correct Rotate-only selection, axis, angle and result screenshots are still needed.
2. **F19.6 Rotate Copy:** screenshot settings show 90 degrees and three copies, while the supplied procedure only explicitly instructs the angle. No copy-count instruction was invented.
3. **Japanese UI label requires verification** for Intersect, Separate Entity, Separate All Components, Arrange Machine Part, Extrude, Revolve and Spiral Form. The previous authored labels are not independent tooltip evidence. A readable command tooltip or official command reference is required for each.
4. **F17:** green is described as this lesson's convention for tapped holes, not a universal software requirement.

## Validation

- TypeScript typecheck passed.
- Foundations regression run: **315 tests passed across 17 files**, including 18 added checks covering all 15 reference variants, the revised Intersect section mapping in both languages, and the Separate Entity screenshot preview. Updated five old assertions for the approved shorter wording.
- Browser component preview checked all 14 lessons in both languages: expected procedure card counts and 76 × 76 command dimensions were present.
- Compared the source/vector gallery; corrected background removal that initially removed faint Intersect lines. Retained the native-detail limitation above.
- Browser opened the Spiral command preview with its original interface screenshot. Existing modal/highlight/point/progress regressions remain covered by the Foundations suite.

No new CSS, progress migration, route change or Professional lesson content change was required.

## Sharpness follow-up

- Replaced pixel-cell geometry with smooth SVG curves and outlines for all 15 commands.
- Compared the enlarged artwork side by side with the stored sources; corrected Move versus Copy arrow direction and component hole counts.
- Typecheck and 49 focused icon/preview tests passed.
