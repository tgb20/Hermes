const tello = require('tello-drone');
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const ws = require('ws');
const fs = require('fs');
const os = require('os');
const { outputFile } = require('fs-extra');
const { ipcMain, app, BrowserWindow, Menu } = require('electron')
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
const { dialog } = require('electron')
let winMarkerConfig, aboutBrowserWindow;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const version = app.getVersion()
log.info('Hermes version', version);

const droneState = {
    vgx: 0,
    vgy: 0,
    vgz: 0,
    bat: 0,
    time: 0,
    h: 0,
    temph: 0,
    templ: 0,
    pitch: 0,
    yaw: 0,
    baro: 0,
    agx: 0,
    agy: 0,
    agz: 0,
    tof: 0
}

// Normalize platform for path to ffmpeg binary
let platform = os.platform()
if (platform == "darwin") {
    platform = "mac";
} else if (platform == "win32") {
    platform = "win";
}

// Get path to resources directory if app is built
var getResourcesPath = function () {
    var paths = Array.from(arguments)
    if (platform === 'mac') {
        if (/[\\/]Electron\.app[\\/]/.test(process.execPath)) {
            paths.unshift(path.join(process.cwd(), 'resources'));
        } else {
            // In builds, the resources directory is located in 'Contents/Resources'
            paths.unshift(process.resourcesPath)
        }
    } else {
        // win
        paths.unshift(path.join(process.cwd(), 'resources'))
    }
    
    return path.join.apply(null, paths)
}

// TODO: Support Windows with ffmpeg.exe binary
const platformPath = getResourcesPath(platform)
const ffmpegpath = path.join(platformPath, 'bin', 'ffmpeg');

const exp = express()

const drone = tello.connect();

let win;
let flying;

const TELLO_VIDEO_PORT = 11111
const TELLO_HOST = '192.168.10.1'
const HOST = 'localhost';
const PORT = 3000;

// Store photos and videos in the default directories
const imageDir = app.getPath('pictures') + "/Hermes/";
const videoDir = app.getPath('videos') + "/Hermes/";

// Create the directories if they doesn't already exist
mkDir(imageDir);
mkDir(videoDir);

function mkDir(path) {
    fs.opendir(path, (err, dir) => {
        if (err) {
            fs.mkdir(path, (err) => {
                if (err) throw error;
            })
        }
        dir.close();
    });
}

ipcMain.on('tryConnect', (event, arg) => {
    drone.send('command');
    console.log('Tried Connecting to Drone');
});

ipcMain.on('greenflag', (event, code) => {
    eval(code);
});

ipcMain.on('takeoff', (event, arg) => {
    drone.send('takeoff');
    flying = true;
    console.log('flying: ', flying);
    win.webContents.send('flying', true);
});


ipcMain.on('land', (event, arg) => {
    drone.send('land');
    flying = false;
    console.log('flying: ', flying);
    win.webContents.send('flying', false);
});

ipcMain.on('emergency', (event, arg) => {
    drone.send('emergency');
    flying = false;
    win.webContents.send('flying', false);
});

ipcMain.on('rc', (event, arg) => {
    drone.send("rc", { a: arg.leftRight, b: arg.forBack, c: arg.upDown, d: arg.yaw });
});

function takePhoto() {
    win.webContents.send('takePhoto');
}

ipcMain.on('save_photo', (event, fileName, img) => {
    const filePath = imageDir + fileName;
    outputFile(filePath, img, (err) => {
        if (err) {
            event.sender.send('save_file_error', err.message);
        } else {
            event.reply('saved_file', filePath);
        }
    })
})

function startVideo() {
    win.webContents.send('startVideo');
}

function stopVideo() {
    win.webContents.send('stopVideo');
}

ipcMain.on('save_video', (event, fileName, buffer) => {
    const webmFilename = videoDir + fileName + '.webm';
    const mp4Filename = videoDir + fileName + '.mp4';
    outputFile(webmFilename, buffer, (err) => {
        if (err) {
            event.sender.send('save_file_error', err.message);
        } else {
            const ffmpeg = spawn(ffmpegpath, [
                '-y',
                '-i',
                webmFilename,
                '-c:v',
                'mpeg4',
                '-strict', 'experimental',
                mp4Filename
            ])

            ffmpeg.stderr.on('data', data => {
                console.log(`stderr: ${data}`)
            })

            ffmpeg.on('close', code => {
                console.log(`child process exited with code ${code}`);
                event.reply('saved_file', mp4Filename);
            })
        }
    })
})

exp.use(express.static(path.join(__dirname, 'public')))

exp.post(`/tellostream`, (req, res) => {
    res.connection.setTimeout(0)

    console.log(
        `Stream Connected: ${req.socket.remoteAddress}:${req.socket.remotePort}`
    )

    req.on('data', function (data) {
        wsServer.broadcast(data);
    })

    req.on('end', function () {
        console.log(
            `Stream Disconnected: ${req.socket.remoteAddress}:${req.socket.remotePort}`
        )
    })
});

drone.on("state", state => {
    // console.log("Received State > ", state);
    if (win.webContents) {
        win.webContents.send('dronestate', state);
        Object.assign(droneState, state);
    }
});

drone.on("send", (err, length) => {
    if (err) console.log(err);

    console.log(`Sent command is ${length} long`);
});

drone.on("message", message => {
    console.log("Received Message > ", message);
});

drone.on("connection", async () => {
    try {
        await drone.send("battery?");
        await drone.send("streamon");
        console.log("Connected to drone");
    } catch (error) {
        console.log(error)
    }
});

function startVideoStream() {
    console.log('starting ffmpeg')
    // ffmpeg -i udp://192.168.10.1:11111 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 800k -r 20 -bf 0 http://127.0.0.1:8081/tellostream
    const ffmpeg = spawn(ffmpegpath, [
        '-hide_banner',
        '-i',
        `udp://${TELLO_HOST}:${TELLO_VIDEO_PORT}`,
        '-f',
        'mpegts',
        '-codec:v',
        'mpeg1video',
        '-s',
        '1280x720',
        '-b:v',
        '1000k',
        '-bf',
        '0',
        '-r',
        '30',
        `http://${HOST}:${PORT}/tellostream`
    ])

    ffmpeg.stderr.on('data', data => {
        console.log(`stderr: ${data}`)
    })

    ffmpeg.on('close', code => {
        console.log(`child process exited with code ${code}`)
    })
}
startVideoStream();

const server = exp.listen(PORT, HOST, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`Server started at http://${host}:${port}/`)
});

const wsServer = new ws.Server({ server: server })

wsServer.on('connection', function (socket, upgradeReq) {
    const remoteAddress = (upgradeReq || socket.upgradeReq).socket.remoteAddress

    console.log(
        `WebSocket Connected: ${remoteAddress} (${wsServer.clients.size} total)`
    )

    socket.on('close', function (code, message) {
        console.log(
            `WebSocket Disonnected: ${remoteAddress} (${wsServer.clients.size} total)`
        )
    })
})

wsServer.broadcast = function (data) {
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send(data)
        }
    })
}

function configureMarkers() {
    if (!winMarkerConfig) {
        winMarkerConfig = new BrowserWindow({
            width: 472,
            height: 600,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        winMarkerConfig.on('closed', () => {
            winMarkerConfig = null
        })
        winMarkerConfig.loadFile('public/configMarkers.html');
    }
}

function aboutWindow() {
    if (!aboutBrowserWindow) {
        aboutBrowserWindow = new BrowserWindow({
            width: 480,
            height: 360,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        aboutBrowserWindow.on('closed', () => {
            aboutBrowserWindow = null
        })

        aboutBrowserWindow.webContents.on('new-window', function(e, url) {
            e.preventDefault();
            require('electron').shell.openExternal(url);
        });

        aboutBrowserWindow.loadFile('public/aboutBrowserWindow.html');
        aboutBrowserWindow.webContents.on('did-finish-load', () => {
            aboutBrowserWindow.webContents.send('version', version);
        })
    }
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('public/index.html');

    win.on('closed', () => {
        win = null;
        if (wsServer) wsServer.close();
    });

    const template = [
        {
            label: 'Default',
            submenu: [
                {
                    label: 'About',
                    click() {
                        aboutWindow();
                    }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    click() {
                        // Send save message
                        win.webContents.send('file', 'save');
                    },
                    accelerator: 'CmdOrCtrl+S'
                },
                {
                    label: 'Open',
                    click() {
                        // Send open message
                        win.webContents.send('file', 'open');
                    },
                    accelerator: 'CmdOrCtrl+O'
                },
                {
                    label: 'Quit',
                    click() {
                        app.quit()
                    },
                    accelerator: 'CmdOrCtrl+Q'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { type: 'separator' },
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Developer',
            submenu: [
                { role: 'toggledevtools' },
                { type: 'separator' },
                {
                    label: 'Display JavaScript',
                    type: 'checkbox',
                    checked: false,
                    click: e => {
                        win.webContents.send('displayJS', e.checked);
                    }
                },
                {
                    label: 'Configure markers',
                    click() {
                        configureMarkers();
                    },
                },
                {
                    label: 'Use local camera',
                    type: 'checkbox',
                    checked: false,
                    click: e => {
                        win.webContents.send('useLocalCamera', e.checked);
                    }
                }
            ]
        },
        { role: 'windowMenu' },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Open Documentation',
                    click: e => {
                        shell.openExternal('https://hermes.orange.haus');
                    }
                },
                {
                    label: 'Submit Bug Report',
                    click: e => {
                        shell.openExternal('https://github.com/tgb20/Hermes/issues');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

/* Auto-update */

autoUpdater.on('checking-for-update', () => {
    // It's quiet here.
});

autoUpdater.on('update-available', (info) => {
    options = {
        title: 'Hermes Updates',
        message: 'An update for Hermes is available. The update will download in the background.',
        buttons: ["Download", "Cancel"],
        defaultId: 0,
        cancelId: 1
    };
    dialog.showMessageBox(win, options, (res, checked) => {
        console.log(res);
        if (res === 0) {
            let cancellationToken;
            appUpdater.downloadUpdate(cancellationToken);
        }
    });
});

autoUpdater.on('update-not-available', (info) => {
    // It's quiet here.
});

autoUpdater.on('error', (err) => {
    options = {
        message: 'Error in auto-updater. ' + err,
    };
    dialog.showMessageBox(win, options, (res, checked) => {
        console.log(res);
    });
})

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
})

autoUpdater.on('update-downloaded', (info) => {
    options = {
        title: 'Hermes Updates',
        message: 'The update has been downloaded. ',
        buttons: ["Restart & Install", "Cancel"],
        defaultId: 0,
        cancelId: 1
    };
    dialog.showMessageBox(win, options, (res, checked) => {
        console.log(res);
        if (res === 0) {
            const isSilent = false;
            const isForceRunAfter = true;
            appUpdater.quitAndInstall(isSilent, isForceRunAfter)
        }
    });
});

app.on('ready', function()  {
    autoUpdater.checkForUpdatesAndNotify();
});

app.whenReady().then(createWindow)

const updateMarkers = () => {
    win.webContents.send('updateMarkers');
}
module.exports.updateMarkers = updateMarkers;