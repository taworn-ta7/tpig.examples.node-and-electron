'use strict'
const { app, BrowserWindow, Menu } = require('electron')
const config = require('./configs')
const { logger } = require('./libs')

function createWindow() {
    const window = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    click() {
                        logger.verbose(`File => Exit`)
                        app.emit('command-exit', "I quit. :)")
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click() {
                        logger.verbose(`Help => About`)
                    }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    logger.verbose(`start index.html`)
    window.loadFile('index.html')
}

app.whenReady().then(() => {
    logger.verbose(`window ready, createWindow()`)
    createWindow()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        logger.verbose(`window activate without window, createWindow()`)
        createWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    logger.verbose(`window(s) close all`)
})

app.on('command-exit', (parameter) => {
    logger.verbose(`parameter: ${parameter}`)
    app.quit()
})
