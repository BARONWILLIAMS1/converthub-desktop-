# ConvertHub Desktop

A premium, local-first file converter desktop app. Initial scaffold and feature implementation are in progress.

## Development

Node.js 20+ is recommended.

```bash
npm install
npm run dev
```

## Windows build

```bash
npm run build
```

The Windows installer is produced by electron-builder. GitHub Actions can build the installer on Windows runners.

## Privacy
Files are processed locally in the app. No upload service is configured.

## Supported in this initial version
- Image conversions: PNG, JPEG, WebP
- Image resizing and quality compression
- Text files to PDF
- PDF text extraction to TXT (where text is present)
- ZIP archive creation from selected files

Additional document, audio, and video formats are planned and must be implemented/tested before being advertised as supported.
