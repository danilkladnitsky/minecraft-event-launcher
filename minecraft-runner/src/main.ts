import { app, BrowserWindow } from "electron";
import * as path from "path";
import disableCors from "./utils/cors";
const { NODE_ENV } = process.env;

const WINDOW_SIZE = {
  height: 600,
  width: 800
};

const isProd = NODE_ENV !== "DEV";

function createWindow() {
  const mainWindow = new BrowserWindow({
    ...WINDOW_SIZE,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: isProd,
      devTools: !isProd
    },
    resizable: false,
    icon: __dirname + '/launcher_icon.ico',
  });

  disableCors(mainWindow);

  mainWindow.loadURL(isProd ? "https://mbtl.ru/" : "http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

require("./web-launcher");
