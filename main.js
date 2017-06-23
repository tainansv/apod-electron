const electron = require('electron')
const {app, BrowserWindow, dialog} = electron
const {autoUpdater} = require('electron-updater')

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

//auto-update options
autoUpdater.on('update-downloaded', (ev, info) => {
    win.webContents.send('message', "Update dowloaded. Will install in 5 seconds.");
    setTimeout(function() {
        autoUpdater.quitAndInstall();  
    }, 5000)
})