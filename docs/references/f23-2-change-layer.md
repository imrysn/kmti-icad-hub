# F23.2 — Change Layer

Implemented in English and Japanese using the four-card FoundationStretchSteps layout and shared InterfaceIconPreview auto-location behavior.

## References

- Command tooltip: codex-clipboard-474cb4b4-26c7-4b79-8a78-fc85073f6fa4.png; verified レイヤを変更する under 属性変更.
- Icon: codex-clipboard-c578b068-367d-4f4e-bc8a-c7143161af7a.png. Quality B: usable small reference; SVG follows the blue trapezoidal plates, outlines and highlights.
- Command/solid: codex-clipboard-124a97b3-a88b-4687-b522-c3a739f54e35.png.
- Item Entry: codex-clipboard-ca0b30c8-8ebc-4f17-8942-c10a703a52d3.png; field 変更後レイヤ.
- Result: codex-clipboard-05c08d90-d2aa-46fb-bca4-ab90eb5727d4.png; information panel shows レイヤ : 2.
- Approval-turn worksheet images are reference only. Layer-designation rules belong to F23.3 and are not included.

Source screenshots are unchanged. SVG clips remove the model background and frame relevant UI. Step 4 highlights the existing layer readout. The numbers in the captures are examples, not prescribed layer rules.

## Integration and validation

Canonical lesson and completion IDs remain unchanged. Quiz uses foundation-properties-change-layer-knowledge-check with B, Item Entry, correct. Navigation remains F23.1 → F23.2 → F23.3. Completable count is 79; only F23.3 remains unauthored.

282 focused frontend tests and 15 backend tests passed. Desktop (1440px) and mobile (390px) checks in both languages found four cards, no comparisons, no horizontal overflow or artwork spill. All four image previews automatically reach the source location and close with Escape. A curriculum snapshot comparison confirms only F23.2 was changed in this request.
