const { app, BrowserWindow } = require('electron');

// Config Files
// var MainConfig = require( __dirname + '/Config/MainConfig.json');
// var WindowConfig = require( __dirname + '/Config/WindowConfig.json');
// var ControllerConfig = require( __dirname + '/Config/ControllerConfig.json');

// Generate global Identifier
let random = Math.random();
let nid = random*100;
let sid = nid.toString();
var globalId = sid.replace(".", "");

// Get Primary Display dimensions
const getViewport = () => {
  return require('electron').screen;
}

if (require('electron-squirrel-startup')) {

  // Quit the Application
  app.quit();

}

const createConsoleWindow = () => {

  // Get Primary Display dimensions
  var width = getViewport().width;
  var height = getViewport().height;

  // Configure BrowserWindow.
  const consoleWindow = new BrowserWindow({
    width: 1280,
    height: 480,
    y:  ( height / 2 - 240 ) + 250,
    x: ( width / 2 - 640 ),
    title: "Console w/ Global Session: " + globalId.toString(),
    autoHideMenuBar: false,
    icon: 'src/Assets/Image/logo/looneybin.png',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true
    }
  });

  // Load Index View.
  consoleWindow.loadFile('src/Source/ConsoleWindow.html', {
    query: {
      sid: globalId.toString()
    }
  });

  // Open the DevTools.
  consoleWindow.webContents.openDevTools();

  // Show window
  consoleWindow.once('ready-to-show', () => {
    consoleWindow.show();
  });

  return consoleWindow;

}

const createAppWindow = () => {

  // Get Primary Display dimensions
  var width = getViewport().width;
  var height = getViewport().height;

  // Configure BrowserWindow.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    y: ( height / 2 - 360 ) - 250,
    x: ( width / 2 - 640 ),
    title: "ClanCommander w/ Global Session: " + globalId.toString(),
    autoHideMenuBar: true,
    icon: 'src/Assets/Image/logo/looneybin.png',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      experimentalFeatures: true
    }
  });

  // Load Index View.
  mainWindow.loadFile('src/Source/CaptureWindow.html', {
    query: {
      sid: globalId.toString()
    }
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Show window
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