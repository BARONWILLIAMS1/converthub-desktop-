# ConvertHub Desktop

ConvertHub is a premium, local-first Windows desktop file utility with a clean charcoal / ivory / champagne interface.

## Current prototype functionality
- Convert common raster image formats to PNG
- Convert TXT files to PDF
- Package selected files into ZIP
- Drag-and-drop / multi-file selection and file list
- Desktop shell (Electron) and Windows NSIS installer configuration
- Files stay local; no upload service is implemented

## Not yet implemented
PDF-to-text extraction, Office document conversions, audio/video conversions, image resizing and compression, and advanced batch options are planned. The app currently reports unsupported file types instead of pretending to convert them.

## Development
Install Node.js 20+, then:
```bash
npm install
npm run dev
```

## Build Windows installer
```bash
npm run build
```
The installer should be written to `dist-installers/`.

GitHub Actions workflow `.github/workflows/windows-build.yml` builds on a Windows runner and uploads the installer as a workflow artifact after a successful build.

## Privacy
File operations are performed in the app locally. There is no backend or cloud upload.
