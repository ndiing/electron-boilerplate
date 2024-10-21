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

    const icon = nativeImage.createFromDataURL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASdSURBVEiJtVVdbJNlFH7e9/tru64bHR0wGLBuCwqC4DKQjW513bo1uhhRo4kXJuqFIYFo9M6bJXqh0QQxxhhujD+ISvhRIPthwGCCGi80kiyGYDe2FdcRSrut/f7f14uOptvH/CHx3H3nPO9zznPO+d4X+J9NWCoQC8UCtcE1VX+MjaX+jqAzHK6rXr+ejo2N5e4WF5c6qAoql23xQGeoTeGE5Dhn75wZPn8JAKItbS0AeZ1w7mE20QQZzy/FQ4o/wuGw6Fbdnt6femeK/dGmaCVEu59zVHCbuRhjhLnItqGhockFqnfEfKpbzQ0NDVl3fLQYIKhChS0bx6NN0cpCC5of2QTRPg2OrQSopgINUIEuJyq/En24tbu4CFs2jsuG7F9SAQDEQpGNDPwD7hYfFw2j1LLpbwAJLMZxzmAZFuOi/SBkeUyx6QkKsq93+OxIMY4uPigxbYIDYlmizLSY+PLdyAGAEAoiUEps6UDgZsDggCgxbWIxzjHkhy51ZC+HhtWGIFbWSZUPJE3zSiHIbBdAAEo1AEiqmt/D+YaVq2j14VtEU6qqHJvkaBEAdIbatr9bXfvhRre7sdg/m8uBcMBb4in4bmUySBnGzVcz04/2XTj782IuR4sAoK9+c2aj291Q7Bs3dOz5cxx7khOYNPSCv9xXCsm2Al8E1vvuxrXgR+tqjewMrg1+vU5xda1VlGBxrDdzGz9m55BjDBWihE3uvApKCHTLxJRlhuKVlc/U1wRHrl0fLaxvQUEsFlM4429KXH+s2evjADBlmhjVNQBAk9cHvyDCL4jY6c0XG9c0JC0DLkmBH/AxhcQYw1vhcNh1h5d0hSJbOEgNJ3w3Bfm27+LgMfPFfVdHNa3+lYk4LM7x2srViPjKF8zgTOY29idvQCQEb1euhlfXjeDJr5TOUPuTHLybgBwn4KOUER5lYAHKyCd9FwePzSdm46YOi/N8pfMqim1Uz8/B4hyTtgFC8uD+4cGjhOJTBhbgBB3iwMVz7y0+TIAbzV7fhu5yP2ZsG7uXLXck2O2vQMq2UCaIaJA90DQ1eyfWf+HseQDnHUMGgPb29rLNcklXlSzf31hSil2lPnhoflSGaYIAkGUJHipgV6kPjSVezGazmAEfvbpmxaF4PK4X8znWlBr88PBc6jQABgAn0ym8n0xAZXYBk2MM+6cSOJVOwWYMqqHhF1v9nOr40sHn0M4xcy6V/AbAIQCYNHQMZNI4nUkXIKfSKZyZSSNh6kjPzcElKVcPTWsfESCzmM75HhByLSe46wRB22tZrsYXAivuWyMraCgpAcy8iub5tjW73JibndFLlWVttpSoJ6DX/lkBw7jAESQHD2ZE2WhVKL3QXe5HlaQUIKslGa2KC2o2d8vr9m1ZfuTjBAitAYjjsltwF0UikQpBxxEw4dmBywPT+Y6B2C/tfQKcPpeZm22yuC0S0IRl272rjn72BpmfVWRHZIUg4TCxxaf6f+h3PrM96KHRUORkR1PHVkfwX1p7S/u2aEvkux70FDpTWNPA0wGqZrWRwe8Hf73XBPHr8amadbW/z26fnR4ZGeH3yvOf7C8gOOT3Ktw5XQAAAABJRU5ErkJggg==");
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Quit",
            role: "quit",
            click: () => {
                app.quit();
            },
        },
    ]);

    tray.setToolTip(`${app.getName()} ${app.getVersion()}`);
    tray.setContextMenu(contextMenu);
};

if (!gotTheLock) {
    app.quit();
} else {
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
