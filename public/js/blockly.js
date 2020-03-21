var workspace = null;

const { ipcRenderer, remote } = require('electron');
const prompt = require('electron-prompt');
const fs = require('fs');
const dialog = remote.dialog;
const win = remote.getCurrentWindow();
const lang = 'JavaScript';
let flying = false;

Blockly.prompt = ((msg, defaultValue, callback) => {
    prompt({
        title: msg,
        label: msg,
        type: 'input'
    }).then((name) => {callback(name)});
});

function start() {
    var match = location.search.match(/dir=([^&]+)/);
    var rtl = match && match[1] == 'rtl';
    var toolbox = getToolboxElement();

    match = location.search.match(/side=([^&]+)/);

    var side = match ? match[1] : 'start';

    match = location.search.match(/locale=([^&]+)/);
    var locale = match ? match[1] : 'en';
    Blockly.ScratchMsgs.setLocale(locale);

    // Create main workspace.
    workspace = Blockly.inject('blocklyDiv', {
        comments: true,
        disable: false,
        collapse: false,
        media: 'media/',
        readOnly: false,
        rtl: rtl,
        scrollbars: true,
        toolbox: toolbox,
        toolboxPosition: side == 'top' || side == 'start' ? 'start' : 'end',
        horizontalLayout: side == 'top' || side == 'bottom',
        trashcan: true,
        sounds: true,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.75,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1
        },
        colours: {
            fieldShadow: 'rgba(255, 255, 255, 0.3)',
            dragShadowOpacity: 0.6
        }
    });
}

function getToolboxElement() {
    var match = location.search.match(/toolbox=([^&]+)/);
    return document.getElementById('toolbox-' + (match ? match[1] : 'categories'));
}

function codePreview(code) {
    const output = document.getElementById('importExport');
    output.textContent = code;
    output.classList.toggle("active");
}

function clickedGreenFlag() {
    let code = Blockly[lang].workspaceToCode(workspace);
    if (code.length > 0) {
        code += "}";
        codePreview(code);
        ipcRenderer.send('greenflag', code);
    }
}

function fullScreenVideo() {
    if (!document.fullscreenElement) {
        document.querySelector("#fullscreen i").textContent = 'fullscreen_exit';
        document.querySelector("#videowrapper").requestFullscreen();
      } else {
        document.querySelector("#fullscreen i").textContent = 'fullscreen';
        document.exitFullscreen();
      }
}

ipcRenderer.on('file', (event, arg) => {

    console.log(arg);

    if (arg == 'save') {
        saveWorkspace();
    }

    if (arg == 'open') {
        loadWorkspace();
    }
});

ipcRenderer.on('dronestate', (event, arg) => {

    let bat = arg.bat;
    let h = arg.h;

    document.getElementById('bat').textContent = bat;
    document.getElementById('height').textContent = h;
});

document.addEventListener('keydown', getKeyPress);

function getKeyPress(e) {

    // KeyW, KeyA, KeyS, KeyD = forward, left, back, right
    // ArrowUp, ArrowLeft, ArrowDown, ArrowRight = up, yaw left, down, yaw right
    // Tab = takeoff, Delete = land

    let keyCode = e.code;

    let leftRight = 0;
    let forBack = 0;
    let upDown = 0;
    let yaw = 0;

    if (keyCode == 'Delete') {
        ipcRenderer.send('land');
        flying = false;
    }
    if (keyCode == 'Tab') {
        ipcRenderer.send('takeoff');
        flying = true;
    }
    if(keyCode == 'KeyW') {
        forBack = 50;
    }
    if(keyCode == 'KeyS') {
        forBack = -50;
    }
    if(keyCode == 'KeyA') {
        leftRight = 50;
    }
    if(keyCode == 'KeyD') {
        leftRight = -50;
    }
    if(keyCode == 'ArrowUp') {
        upDown = 50;
    }
    if(keyCode == 'ArrowDown') {
        upDown = -50;
    }
    if(keyCode == 'ArrowLeft') {
        yaw = -50;
    }
    if(keyCode == 'ArrowRight') {
        yaw = 50;
    }
    ipcRenderer.send('rc', {leftRight: leftRight, forBack: forBack, upDown: upDown, yaw: yaw});
}

document.addEventListener('keyup', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: 0, upDown: 0, yaw: 0});
});

document.querySelector('.mdl-button.forward').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: 50, upDown: 0, yaw: 0}); 
    console.log('forward');
})
document.querySelector('.mdl-button.backward').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: -50, upDown: 0, yaw: 0}); 
})
document.querySelector('.mdl-button.left').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: -50, forBack: 0, upDown: 0, yaw: 0}); 
})
document.querySelector('.mdl-button.right').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 50, forBack: 0, upDown: 0, yaw: 0}); 
})
document.querySelector('.mdl-button.up').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: 0, upDown: 50, yaw: 0}); 
})
document.querySelector('.mdl-button.down').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: 0, upDown: -50, yaw: 0}); 
})
document.querySelector('.mdl-button.yaw-left').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: 0, upDown: 0, yaw: -50}); 
})
document.querySelector('.mdl-button.yaw-right').addEventListener('mousedown', () => {
    ipcRenderer.send('rc', {leftRight: 0, forBack: 0, upDown: 0, yaw: 50}); 
})
const buttons = document.querySelectorAll(".mdl-button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseup", () => {
        ipcRenderer.send('rc', {leftRight: 0, forBack: 0, upDown: 0, yaw: 0}); 
    });
}

function takeoffOrLand() {
    if (flying) {
        ipcRenderer.send('land');
        flying = false;
        document.querySelector('#btn-takeoff-land i').textContent = 'flight_takeoff';
        document.querySelector('#text-takeoff-land').textContent = 'Takeoff';
    } else {
        ipcRenderer.send('takeoff');
        flying = true;
        document.querySelector('#btn-takeoff-land i').textContent = 'flight_land';
        document.querySelector('#text-takeoff-land').textContent = 'Land';
    }
}

function saveWorkspace() {
    let xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);

    let xmlString = new XMLSerializer().serializeToString(xml);

    let options = {
        title: "Save your workspace",
        buttonLabel: "Save Workspace",
        filters: [
            { name: 'Workspace File', extensions: ['space'] }
        ]
    }

    dialog.showSaveDialog(win, options).then(result => {
        let filename = result.filePath;
        console.log(filename);

        if (filename === undefined) {
            console.log('Filename not selected');
            return;
        }

        fs.writeFile(filename, xmlString, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Success!');
        });
    });
}

function loadWorkspace() {

    let options = {
        title: "Open a workspace",
        buttonLabel: "Open Workspace",
        filters: [
            { name: 'Workspace File', extensions: ['space'] }
        ]
    }

    dialog.showOpenDialog(win, options).then(result => {
        let filename = result.filePaths[0];

        if (filename === undefined) {
            console.log('No File');
            return;
        }

        let xmlString = fs.readFileSync(filename);

        let xml = Blockly.Xml.textToDom(xmlString);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, Blockly.mainWorkspace);

    });
}

function connectButton() {
    ipcRenderer.send('connect', 'connect');
}