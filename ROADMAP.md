# ConvertHub — Product Roadmap

Product quality goal: dependable, premium-grade file utility; privacy-first local processing, polished UX, tested conversions, and transparent support.

## Milestone 0 — Foundation
- [x] Electron + React + Vite shell
- [x] Premium dark/light palette and responsive workspace
- [x] Local file queue, drag/drop, ZIP packaging
- [x] Image-to-PNG and TXT-to-PDF prototype conversions
- [x] Windows NSIS packaging configuration
- [x] GitHub Actions installer workflow
- [ ] Validate a clean Windows build; resolve runner failure
- [ ] Add app icon, product metadata, signed builds plan

## Milestone 1 — Core reliability
- [ ] Conversion destination and output naming controls
- [ ] Per-file progress and cancel/retry
- [ ] Error details and unsupported-format detection
- [ ] Queue reorder, clear queue, duplicate handling
- [ ] Safe temp-file cleanup and crash recovery
- [ ] Unit tests for conversion utilities

## Milestone 2 — Image suite
- [ ] PNG / JPG / WebP / BMP conversions
- [ ] Quality and size controls
- [ ] Resize by dimensions, percentage, fit, and aspect-lock
- [ ] Batch image operations and preview

## Milestone 3 — PDF suite
- [ ] TXT / HTML to PDF
- [ ] PDF text extraction to TXT
- [ ] Merge and split PDFs
- [ ] Rotate pages, reorder, extract page ranges
- [ ] Compress PDF (honest quality tradeoffs)
- [ ] OCR for scanned PDFs (offline engine, optional download)

## Milestone 4 — Office formats
- [ ] PDF to DOCX and DOCX to PDF
- [ ] XLSX / CSV conversions
- [ ] PPTX exports
- [ ] Document preview and format fidelity test corpus
- Note: robust Office conversions may require bundling LibreOffice or another audited engine; do not promise lossless conversion.

## Milestone 5 — Media tools
- [ ] Audio conversion via bundled FFmpeg
- [ ] Video conversion via bundled FFmpeg
- [ ] Presets, codecs, resolution, bitrate, audio extraction
- [ ] Show estimates, warnings, and conversion details
- [ ] Respect licensing and distribution requirements for bundled codecs

## Milestone 6 — Professional UX
- [ ] Settings, keyboard shortcuts, recent jobs
- [ ] Themes, accessibility, screen-reader labels
- [ ] Onboarding, help, diagnostics/export logs
- [ ] Offline capability and dependency integrity checks
- [ ] Update mechanism with signed artifacts

## Milestone 7 — Release readiness
- [ ] Automated CI builds and tests on Windows
- [ ] Installer smoke tests and clean-machine test
- [ ] Code signing, checksums, release notes
- [ ] Privacy policy, EULA, license notices
- [ ] Security review: Electron hardening, CSP, dependency audit
- [ ] Performance, memory, large-file and edge-case tests

## Business readiness (after product reliability)
- [ ] Free tier and fair usage limits, if justified
- [ ] Paid features only after users validate value
- [ ] Website, support, analytics opt-in (privacy-respecting)
- [ ] Customer feedback loop and crash reporting opt-in
