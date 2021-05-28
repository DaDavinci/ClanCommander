const { app, BrowserWindow } = require('electron');

class Main
{

  // Config Files
  public settings = require( __dirname + '/config/nxtbot-settings.json');

  // Generate global Identifier
  public random = Math.random();
  public numberId = this.random*100;
  public stringId = this.numberId.toString();
  public globalId = this.stringId.replace(".", "");

  // Constructor
  public constructor()
  {

    // Check if app is started with squirrel
    if (require('electron-squirrel-startup')) {

      // Quit the Application
      app.quit();

    }

    // Set app flags
    app.allowRendererProcessReuse = true;

    // Set app EventHandlers
    app.on('ready', () => {
      main.createAppWindow();
      main.createConsoleWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {

      // Start the window processes
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createConsoleWindow();
        this.createAppWindow();
      }
    });

    return this;
  }

  public createConsoleWindow = () =>
  {

    // Configure BrowserWindow.
    const consoleWindow = new BrowserWindow({
      width: 1280,
      height: 480,
      y:  ( 1280 / 2 - 240 ) + 250,
      x: ( 480 / 2 - 640 ),
      title: "Console Session: " + this.globalId.toString(),
      autoHideMenuBar: false,
      icon: 'dist/assets/images/logo/looneybin.png',
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: true,
        experimentalFeatures: true
      }
    });

    // Load Index View.
    consoleWindow.loadFile('dist/views/ConsoleWindow.html', {
      query: {
        sid: this.globalId.toString()
      }
    });

    // Open the DevTools.
    // consoleWindow.webContents.openDevTools();

    // Show window
    consoleWindow.once('ready-to-show', () => {
      consoleWindow.show();
    });

    return consoleWindow;

  }

  public createAppWindow = () => {

    // Configure BrowserWindow.
    const mainWindow = new BrowserWindow({
      width: 1600,
      height: 900,
      y: ( 1600 / 2 - 400 ) - 250,
      x: ( 900 / 2 - 225 ),
      title: "ClanCommander (NXTBot)",
      autoHideMenuBar: false,
      icon: 'dist/assets/images/logo/looneybin.png',
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: true,
        experimentalFeatures: true
      }
    });

    // Load Index View.
    mainWindow.loadFile('dist/views/CaptureWindow.html', {
      query: {
        sid: this.globalId.toString()
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

}

// Run the Client
const main = new Main();