# PFT Desk – Tauri test build

## One-time setup (Windows 10/11)
1. Install **Microsoft C++ Build Tools** (Visual Studio Build Tools) with the "Desktop development with C++" workload.
2. Install **Rust** from https://rustup.rs (default MSVC toolchain).
3. Install **Node.js LTS** from https://nodejs.org.
4. WebView2 is preinstalled on Windows 11 and most Windows 10 machines.

## Build
```
cd pft-desk
npm install
npm run tauri icon app-icon.png     (generates src-tauri/icons, needed once)
npm run tauri dev                   (run it live)
npm run tauri build                 (make the installer)
```
Installer: `src-tauri\target\release\bundle\nsis\PFT Desk_0.1.0_x64-setup.exe` (per-user, no admin rights).
Portable exe: `src-tauri\target\release\pft-desk.exe`.

## Saved data
`%APPDATA%\dev.pftdesk.desktop\pft-desk-data.json` (autosaved, with `.bak` and `.corrupt.json` safety copies).
Delete that file to reset to the sample data.

## Build without installing anything (GitHub Actions)
1. Create a **private** GitHub repository and upload the contents of this folder (including the hidden `.github` folder).
2. Open the repo's **Actions** tab, pick "Build Windows installer", and press **Run workflow**.
3. When it finishes (about 10 minutes), open the run and download the **pft-desk-windows** artifact. It contains the installer and the portable exe.
