const tello = require('tello-drone');
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const ws = require('ws');
const fs = require('fs');
const os = require('os');
const { outputFile } = require('fs-extra');
const { ipcMain, app, BrowserWindow, Menu } = require('electron')

let platform = os.platform()
if (platform == "darwin") {
	platform = "mac";
} else if(platform == "win32") {
	platform = "win";
}

var getResourcesPath = function () {
    var paths = Array.from(arguments)
    
    if (/[\\/]Electron\.app[\\/]/.test(process.execPath)) {
        paths.unshift(path.join(process.cwd(), 'resources') );
    } else {
        // In builds the resources directory is located in 'Contents/Resources'
        paths.unshift(process.resourcesPath)
    } 
    return path.join.apply(null, paths)
}

// TODO: Support Windows with ffmpeg.exe binary
const platformPath = getResourcesPath(platform)
const ffmpegpath = path.join(platformPath, 'bin', 'ffmpeg');

const exp = express()

const drone = tello.connect();

let win, droneState;

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
    })
}

ipcMain.on('greenflag', (event, arg) => {
    let code = arg;
    console.log('CODE: ' + code);
    eval(code);
    greenFlag();
});

ipcMain.on('takeoff', (event, arg) => {
    drone.send('takeoff');    
});


ipcMain.on('land', (event, arg) => {
    drone.send('land');    
});

ipcMain.on('emergency', (event, arg) => {
    drone.send('emergency');
});

ipcMain.on('rc', (event, arg) => {

    let leftRight = arg.leftRight;
    let forBack = arg.forBack;
    let upDown = arg.upDown;
    let yaw = arg.yaw;
 
    drone.send("rc", { a: leftRight, b: forBack, c: upDown, d: yaw });
});

ipcMain.on('connect', (event, arg) => {
    // Try to connect
    console.log(arg);
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

drone.on("connection", () => {
    console.log("Connected to drone");
});

drone.on("state", state => {
    //console.log("Recieved State > ", state);
    droneState = state;
    win.webContents.send('dronestate', state);
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

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 980,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('public/index.html')


    const template = [
        {
            label: 'Default'
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
                {
                    label: 'Display JavaScript',
                    type: 'checkbox', 
                    checked: false,
                    click: e => {
                        win.webContents.send('displayJS', e.checked);
                    }
                },
                {
                    label: 'Detect Markers',
                    type: 'checkbox', 
                    checked: false,
                    click: e => {
                        win.webContents.send('detectMarkers', e.checked);
                    }
                },
                { type: 'separator' },
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        { role: 'windowMenu' }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.whenReady().then(createWindow)