const tello = require("tello-drone");
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const ws = require('ws');
const { ipcMain, app, BrowserWindow, Menu } = require('electron')

const exp = express()

const drone = tello.connect();

let win, droneState;

const TELLO_VIDEO_PORT = 11111
const TELLO_HOST = '192.168.10.1'

const HOST = 'localhost';
const PORT = 3000;

ipcMain.on('greenflag', (event, arg) => {
    let code = arg;
    console.log('CODE: ' + code);
    eval(code);
    greenFlag();
});

ipcMain.on('rc', (event, arg) => {

    let leftRight = arg.leftRight;
    let forBack = arg.forBack;
    let upDown = arg.upDown;
    let yaw = arg.yaw;
 
    // drone.send("rc", { value: '0 0 0 0'});
});

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
    console.log("Recieved Message > ", message);
});

drone.on("connection", async () => {
    try {
        await drone.send("battery?");
        await drone.send("streamon");
    } catch (error) {
        console.log(error)
    }
});

console.log('starting ffmpeg')
// ffmpeg -i udp://192.168.10.1:11111 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 800k -r 20 -bf 0 http://127.0.0.1:8081/tellostream
const ffmpeg = spawn('ffmpeg', [
    '-hide_banner',
    '-i',
    `udp://${TELLO_HOST}:${TELLO_VIDEO_PORT}`,
    '-f',
    'mpegts',
    '-codec:v',
    'mpeg1video',
    '-s',
    '640x480',
    '-b:v',
    '800k',
    '-bf',
    '0',
    '-r',
    '20',
    `http://${HOST}:${PORT}/tellostream`
])

ffmpeg.stderr.on('data', data => {
    console.log(`stderr: ${data}`)
})

ffmpeg.on('close', code => {
    console.log(`child process exited with code ${code}`)
})

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
        width: 800,
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
                }
            ]
        },
        { role: 'viewMenu' },
        { role: 'windowMenu' }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.whenReady().then(createWindow)