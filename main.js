const electron = require('electron')
const {app, BrowserWindow} = electron
const {autoUpdater} = require('electron-updater')
const bs = require('browser-sync')

let win

function createWindow() {
    
    win = new BrowserWindow({
        width: 800,
        height:600
    })
    win.loadURL('file://'+__dirname+'/app/index.html')
    win.setMenu(null)

    //win.webContents.openDevTools()

    win.webContents.on('new-window', handleRedirect)
    win.webContents.on('will-navigate', handleRedirect)

    win.on('closed', () =>{
        win = null
    })
}

//app options
app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdates();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
})

function handleRedirect(e, url) {
    e.preventDefault()
    electron.shell.openExternal(url)
}

bs.init({
    localyOnly: true
})

//auto-update options
autoUpdater.on('update-downloaded', (ev, info) => {
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  }, 5000)
})