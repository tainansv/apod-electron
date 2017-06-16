const electron = require('electron')
const {app, BrowserWindow} = electron

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

app.on('ready', createWindow)

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