const { app, BrowserWindow } = require('electron');
let random = Math.random();
let nid = random * 100;
let sid = nid.toString();
var globalId = sid.replace(".", "");
const getViewport = () => {
    return require('electron').screen;
};
if (require('electron-squirrel-startup')) {
    app.quit();
}
const createConsoleWindow = () => {
    var width = getViewport().width;
    var height = getViewport().height;
    const consoleWindow = new BrowserWindow({
        width: 1280,
        height: 480,
        y: (height / 2 - 240) + 250,
        x: (width / 2 - 640),
        title: "Console w/ Global Session: " + globalId.toString(),
        autoHideMenuBar: false,
        icon: 'src/Assets/Image/logo/looneybin.png',
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true
        }
    });
    consoleWindow.loadFile('src/Source/ConsoleWindow.html', {
        query: {
            sid: globalId.toString()
        }
    });
    consoleWindow.webContents.openDevTools();
    consoleWindow.once('ready-to-show', () => {
        consoleWindow.show();
    });
    return consoleWindow;
};
const createAppWindow = () => {
    var width = getViewport().width;
    var height = getViewport().height;
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 860,
        y: (height / 2 - 360) - 250,
        x: (width / 2 - 640),
        title: "ClanCommander w/ Global Session: " + globalId.toString(),
        autoHideMenuBar: true,
        icon: 'src/Assets/Image/logo/looneybin.png',
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true,
            experimentalFeatures: true
        }
    });
    mainWindow.loadFile('src/Source/CaptureWindow.html', {
        query: {
            sid: globalId.toString()
        }
    });
    mainWindow.webContents.openDevTools();
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    return mainWindow;
};
app.allowRendererProcessReuse = true;
app.on('ready', () => {
    createAppWindow();
    createConsoleWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createConsoleWindow();
        createAppWindow();
    }
});
//# sourceMappingURL=index.js.map