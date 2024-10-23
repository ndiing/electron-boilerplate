const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("node:path");
const { updateElectronApp } = require("update-electron-app");
updateElectronApp({
    updateInterval: "5 minutes",
});
// require("mssql/msnodesqlv8");
// require("sqlite3");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

let tray;
let myWindow = null;

const additionalData = { myKey: "myValue" };
const gotTheLock = app.requestSingleInstanceLock(additionalData);

const createWindow = () => {
    // // Create the browser window.
    // const mainWindow = new BrowserWindow({
    //   width: 800,
    //   height: 600,
    //   webPreferences: {
    //     preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    //   },
    // });

    // // and load the index.html of the app.
    // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    const icon = nativeImage.createFromDataURL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfoChYOBgq1EEA/AAAEnklEQVQ4y61VW2xUVRRd+9zHTKcz0yl9UURLy0MEizEgCfChbWoMwRoTY/io8qHy4QNjNBoS+gGRD0mUIMH4SAxIQnxEjQYSYgQTUCEpL8EqlYfWUhzaYdrCzPTOvfecvf24bal8u3/2OTnnrL3WOTlrU8f1Z/B/hB0lERBFAwEIBAIIRCACJNoDEYgAJABBBIAQkQgA2BJlYDJDIJYoAJ6UfQkFDIBALjkVFFcgBmNq8+SxW0BTYUGVxDNi5tp33efcfac9U0FlTe5ceKEv/FMgSZVg8O3SbgNSUGNcaHUWvJTqut+9B4AWIxCHbAAX9cB7hX3H/DMpVRlxnzpID2XX3eJCaowLaxOrX696tsz+J4VvfvJP53hUwBlVtcxdtC75eINds7f47a7CvqRKyDQoq+m1JRNcSI2Z4hOJhzdm1h/xTjx3vftQ+biPQISNmBtcOBv0fVn6rpISXanOGNyj3sk4xXhSkNX06pLonTwut1izd9ZuOu6deTH3ZrVKdVSsGNZ5BhPIhqpAXIG+H/+5WqW7Up29wcVLwUCc3OjmFTMLMxieKa9PPwlgc36XC3tz9YatNa8sdRcVdIkEhjlkLYwMpXeM7h3S+Q1VT0Fg2AgzMysREUGZ/QZV25FY+cXNg/3B1YV28/J4K4DOZDuz4ckwbJSQZ8q7b3w932laaLeUjAcBsyhmBotnyvPsJgBHSyddcW7ooic+gBPjvypREVJUWbN2xekZPweg1VlQNj4YIhxJk5DDejUDQDbMVcDt9wcPFY8B6Bk/G5hAMQmLZkMCY1gJ5cMRLbrRrjWTfBWzsDCzaNYAiKGNicF9N7fH52BH46ZqSufCvG98JTQSjhnWzCwiCjSBIjwhzRhWTIPBNQCz7HrPlF1xhoL8hsEt9XbNV3N2tbrzH021HWj+sCvTaYvtG79O1Siy+oOrYEwwMsyatQPnvHdJi34kuSowYchhJSWOFHqe/7u72kp/3rxzS+PLM6zMpoYXlsYXDQcjbZXLAZws9TqwtTHMrKIrtEUNhflPR/avybQ1O7PGddkYnaLU4Zs97X1Pfzz8xaB/rcz+wbEjPxZOzbLq1teuPV48fd67HIMbCbQNMwAiYpY/yv0AXDjMrMkokiqVHNU3t/7z/gfDn2Ws1GX/ioHe07Itpty3sh9ZYhlmFgZgMzMghkgbvTA2p2CKvaULDrmuZY2EYyDEyY1T7Ho4MuBnW2J3vN20cVVqWffA9jOl8xk7rY2e+P3MLADIQNDg1Lrkbm/qXpa8t9GtOzR27MDoD1f8LIMb3fr29MquuscAvNG/bd/I/oxdFRgNgCIgwwyCiMThtrizY8rtSK/oHb/wS+G31dUPrqlum24yB/KH38nu7iv/lbHTIevpSzT3VAcAASyoBxKLs2Gu379a5HEjXO/MWFwxb7Y7k0gNBbnfvcuD4VBcxSutCiPmNmOj5hPt0e8XSIk9m6wYuRZZBASiy+xr0ZFVxVUsRq5AWFgmFUUgAGwjAoAgAJIqISIiokULoIBKVRHVAMAioegIIloVYKoPRFYrAhII/9d2DUSEaXrtie4QdZQIkKLpv+2a7eeuxog1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTEwLTIyVDE0OjA2OjAzKzAwOjAwB4aaKgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0xMC0yMlQxNDowNjowMyswMDowMHbbIpYAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMTAtMjJUMTQ6MDY6MTArMDA6MDDcjBlKAAAAAElFTkSuQmCC");
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Quit",
            click: () => {
                app.quit();
            },
        },
        { type: 'separator' },
        {
            label: "Relaunch",
            click: () => {
                app.relaunch();
                app.exit(0);
            },
        },
    ]);

    tray.setToolTip(`${app.getName()} ${app.getVersion()}`);
    tray.setContextMenu(contextMenu);
};

if (!gotTheLock) {
    app.quit();
} else {
    require("./index.js");

    app.on("second-instance", (event, commandLine, workingDirectory, additionalData) => {
        // // Print out data received from the second instance.
        // console.log(additionalData);
        // // Someone tried to run a second instance, we should focus our window.
        // if (myWindow) {
        //     if (myWindow.isMinimized()) myWindow.restore();
        //     myWindow.focus();
        // }
    });

    // app.whenReady().then(() => {
    //     myWindow = new BrowserWindow({});
    //     myWindow.loadURL("https://electronjs.org");
    // });

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(() => {
        createWindow();

        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
