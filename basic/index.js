'use strict'
const { app, BrowserWindow, Menu } = require('electron')
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const path = require('path')
const config = require('./configs')
const { logger } = require('./libs')

const createWindow = async () => {
    await i18next.use(Backend).init({
        fallbackLng: 'en',
        lng: 'th',
        preload: ['en', 'th'],
        ns: ['translations'],
        defaultNS: 'translations',
        backend: {
            loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json')
        }
    })

    const window = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const template = [
        {
            label: i18next.t('File'),
            submenu: [
                {
                    label: i18next.t('Exit'),
                    click() {
                        logger.verbose(`File => Exit`)
                        app.emit('command-exit', "I quit. :)")
                    }
                }
            ]
        },
        {
            label: i18next.t('Help'),
            submenu: [
                {
                    label: i18next.t('About'),
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
