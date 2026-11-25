# ConvertHub

**ConvertHub — By Binary Studios** is a premium, privacy-first file conversion workspace.

## Latest workspace UI
- Emerald Luxe palette in light and dark modes.
- Centered liquid-glass quick-navigation dock with a separate search action; it is fixed to the viewport and remains visible while scrolling.
- Dock shortcuts jump to the workspace, conversion tools, and file queue.

## Platform builds
- **Free cloud build route:** Azure Pipelines is configured in `azure-pipelines.yml` to build the Android APK and Windows portable/installer EXEs. It is separate from GitHub Actions, which may be unavailable on accounts with billing restrictions.
- **Setup:** Sign in to Azure DevOps, create a project, choose Pipelines → New pipeline → GitHub → select this repository → Existing Azure Pipelines YAML file → `/azure-pipelines.yml`, authorize the GitHub connection, and run it.
- **Downloads:** Open a successful pipeline run and download `ConvertHub-APK` or `ConvertHub-Windows` under Artifacts. The Android artifact is a debug APK for testing; the Windows artifact contains the portable EXE and setup installer.
- Azure DevOps free build allocations depend on project visibility and account eligibility; no paid upgrade is required for the intended free setup.

## Prototype features
- Drag-and-drop and multi-file queue
- Raster image conversion to PNG, JPEG, WebP, or PDF
- Image-to-PDF export on a centered A4 page
- Optional image output width with aspect-ratio preservation
- Image quality setting for JPEG/WebP
- TXT → PDF
- PDF text extraction → TXT (selectable-text PDFs only)
- Merge multiple PDFs into one file
- Split PDFs into one-page files, packaged as ZIP
- Render PDF pages to PNG images, packaged as ZIP
- ZIP packaging of selected original files
- Dark/light theme

## Current limitations
This is an early prototype. Scanned PDFs need OCR; PDF text extraction does not preserve layout reliably; TXT→PDF uses simple layout and basic fonts. Office, audio, video, PDF OCR, page reordering/rotation, Office, audio, video and most archive formats are not implemented yet. Do not assume a format is supported just because it appears on the roadmap.

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
