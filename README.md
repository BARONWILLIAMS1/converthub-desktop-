# ConvertHub Desktop

ConvertHub is a privacy-first Windows desktop utility with a restrained charcoal, ivory, and champagne design system. Files are handled on-device; this prototype does not upload them.

## Working features (prototype)
- Drag-and-drop and multi-file queue
- Raster image → PNG, JPEG, or WebP
- Optional image output width (aspect ratio preserved)
- Image quality setting for JPEG/WebP
- TXT → PDF
- PDF text extraction → TXT (only PDFs with selectable text)
- ZIP packaging of original selected files
- Dark/light theme
- Windows installer packaging configuration

## Limitations
- Scanned PDFs need OCR; not included yet.
- PDF text extraction may not preserve document layout, tables, or columns.
- TXT → PDF uses a basic font and simple text layout; complex Unicode may not render correctly.
- Image resizing currently uses width; output dimensions are capped to protect against unreasonable allocations.
- Office, audio, and video conversions are not implemented yet.
- The application is an early prototype; it has not completed a clean Windows installer smoke test.

## Development
Requires Node.js 20+.
```bash
npm install
npm run dev
```

## Windows build
```bash
npm run build
```
Installer output is configured for `dist-installers/`. GitHub Actions runs the Windows build and uploads the installer artifact on successful builds. Tag a version (for example `v0.1.0`) to trigger the release workflow after build verification.

## Privacy and security
No server or upload endpoint is configured. Electron is configured with context isolation, sandboxing, disabled Node integration, and navigation restrictions. Keep untrusted files in mind: parser bugs are possible, and this prototype should not be considered security-audited.
