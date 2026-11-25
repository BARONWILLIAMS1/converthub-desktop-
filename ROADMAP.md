# ConvertHub — Product Roadmap

Quality bar: reliable, premium-grade file utility; privacy-first local processing; polished UX; transparent limits; tested conversion output.

## Milestone 0 — Foundation
- [x] Electron + React + Vite shell
- [x] Premium palette, responsive UI, dark/light mode
- [x] Local file queue, drag/drop, ZIP packaging
- [x] Raster image export (PNG/JPEG/WebP), basic resize and quality controls
- [x] TXT → PDF and PDF text extraction → TXT
- [x] Windows NSIS packaging configuration
- [x] CI and tag-based release workflows
- [ ] Successful Windows runner build and installer smoke test
- [ ] App icon, product metadata, signed build

## Milestone 1 — Core reliability
- [ ] Per-file progress and cancel/retry
- [ ] Error details, validation, unsupported-format handling
- [ ] Queue reorder, duplicate handling, output naming/destination
- [ ] Safe temp-file cleanup and crash recovery
- [ ] Unit tests and conversion fixture corpus

## Milestone 2 — Image suite
- [ ] BMP and TIFF conversion
- [ ] Resize by dimensions/percentage, crop, fit, aspect-lock
- [ ] Batch compression, previews, metadata controls
- [ ] Validate color profiles, transparency, EXIF orientation

## Milestone 3 — PDF suite
- [ ] Merge, split, rotate, page extraction/reordering
- [ ] PDF compression with transparent quality tradeoffs
- [ ] HTML to PDF
- [ ] OCR for scanned PDFs using offline engine

## Milestone 4 — Office formats
- [ ] PDF ↔ DOCX, XLSX / CSV, PPTX conversions
- [ ] Format fidelity testing and previews
- Note: these may require a bundled LibreOffice or other conversion engine; fidelity is not guaranteed.

## Milestone 5 — Media tools
- [ ] Audio formats via FFmpeg
- [ ] Video formats via FFmpeg
- [ ] Codec presets, resolution, bitrate, audio extraction
- [ ] Licensing review for bundled codecs

## Milestone 6 — Professional UX
- [ ] Settings, keyboard shortcuts, recent conversions
- [ ] Accessibility, screen reader support, onboarding
- [ ] Diagnostics and optional privacy-respecting crash reporting
- [ ] Update mechanism, signed builds, checksums

## Milestone 7 — Release readiness
- [ ] Clean Windows install/uninstall tests
- [ ] CI build and test matrix, large-file performance
- [ ] Security audit and dependency review
- [ ] Privacy policy, EULA, license notices, release notes

## Business validation
- [ ] Interview users and measure retention/use cases
- [ ] Validate pricing before adding paid features
- [ ] Website, support and feedback workflow
- [ ] Track conversion success and failure metrics only with consent
