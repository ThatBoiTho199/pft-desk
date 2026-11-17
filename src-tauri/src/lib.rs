use std::{fs, path::PathBuf};
use tauri::{AppHandle, Manager};

fn data_path(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    Ok(dir.join("pft-desk-data.json"))
}

#[tauri::command]
fn data_location(app: AppHandle) -> Result<String, String> {
    data_path(&app).map(|p| p.display().to_string())
}

#[tauri::command]
fn load_data(app: AppHandle) -> Result<Option<String>, String> {
    let p = data_path(&app)?;
    if !p.exists() {
        return Ok(None);
    }
    fs::read_to_string(&p).map(Some).map_err(|e| e.to_string())
}

/// Atomic save: write a temp file, keep a .bak (or .corrupt.json) copy of the old file, then rename.
#[tauri::command]
fn save_data(app: AppHandle, json: String) -> Result<(), String> {
    let p = data_path(&app)?;
    let tmp = p.with_extension("json.tmp");
    if let Ok(old) = fs::read_to_string(&p) {
        let valid = serde_json::from_str::<serde_json::Value>(&old).is_ok();
        let copy = p.with_extension(if valid { "json.bak" } else { "corrupt.json" });
        let _ = fs::write(copy, old);
    }
    fs::write(&tmp, json).map_err(|e| e.to_string())?;
    fs::rename(&tmp, &p).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_text_file(path: String, contents: String) -> Result<(), String> {
    fs::write(path, contents).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();
    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(w) = app.get_webview_window("main") {
                let _ = w.unminimize();
                let _ = w.set_focus();
            }
        }));
    }
    builder
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            data_location,
            load_data,
            save_data,
            write_text_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running PFT Desk");
}
