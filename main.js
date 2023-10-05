const { app, BrowserWindow } = require("electron");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const createDashboardWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    // },
  });

  win.loadFile("index.html");
};

const createConfigWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadFile("config.html");
};

app.whenReady().then(() => {
  const db = new sqlite3.Database("test.db", (err) => {
    if (err) {
      console.log('error connecting to the database',err.message);
    }
    console.log("Connected to the database");
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='conf'",
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        if (!row) {
          createConfigWindow();
        } else {
          createDashboardWindow();
        }
      }
    );
  });
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
