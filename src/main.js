const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = false; // process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: " Rhhii",
    // width: isDev ? 1000 : 500,
    // height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.maximize();
  // Menu.setApplicationMenu(null);

  // Open dev mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.on("ready", () => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
  process.exit(1);
});
