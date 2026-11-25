# ConvertHub

**ConvertHub — By Binary Studios** is a premium, privacy-first file conversion workspace.

## Platform builds
- **Windows:** NSIS installer (`ConvertHub-Setup-0.1.0.exe`) — Windows CI workflow.
- **Android test APK:** build workflow creates a debug APK for phone testing. Open the [Android APK workflow](https://github.com/BARONWILLIAMS1/converthub-desktop-/actions/workflows/android-apk.yml), select the latest successful run, and download the `ConvertHub-Android-APK` artifact. GitHub requires you to be signed in to download workflow artifacts. Tag releases (`v*`) also attach the APK to the GitHub Release.

## Prototype features
- Drag-and-drop and multi-file queue
- Raster image conversion to PNG, JPEG, WebP, or PDF
- Image-to-PDF export on a centered A4 page
- Optional image output width with aspect-ratio preservation
- Image quality setting for JPEG/WebP
- TXT → PDF
- PDF text extraction → TXT (selectable-text PDFs only)
- ZIP packaging of selected original files
- Dark/light theme

## Current limitations
This is an early prototype. Scanned PDFs need OCR; PDF text extraction does not preserve layout reliably; TXT→PDF uses simple layout and basic fonts. Office, audio, video, advanced PDF editing, OCR and most archive formats are not implemented yet. Do not assume a format is supported just because it appears on the roadmap.

## Development
Node.js 20+:
```bash
npm install
npm run dev
```

## Windows
```bash
npm run build
```
Installer is output to `dist-installers/`.

## Android local build
```bash
npm install
npm run build:web
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```
APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Privacy and security
No server or upload endpoint is configured. Electron uses context isolation, sandboxing, disabled Node integration and navigation restrictions. Android preview is a WebView-based app that runs the frontend locally. File processing support varies by format and parser.

---
