var workspace = null;

const { ipcRenderer, remote } = require('electron');
const prompt = require('electron-prompt');
const fs = require('fs');
const dialog = remote.dialog;
const win = remote.getCurrentWindow();
let keyboard = false;

let lastState, currentState;

Blockly.prompt = ((msg, defaultValue, callback) => {
    prompt({
        title: msg,
        label: msg,
        type: 'input'
    }).then((name) => { callback(name) });
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
    workspace.addChangeListener(updateCodePreview);

    let greenFlagBlock = workspace.newBlock('event_whenflagclicked');
    greenFlagBlock.initSvg();
    greenFlagBlock.render();

    workspace.scrollCenter();

    document.addEventListener('blocklyCheckmark', (event) => {

        console.log(event);

        let blockID = event.detail.id;
        let showHide = event.detail.value;


        let sensorChip = document.getElementById(blockID);
        if (showHide) {
            sensorChip.style.display = "";
        } else {
            sensorChip.style.display = "none";
        }
    });
}

function getToolboxElement() {
    const match = location.search.match(/toolbox=([^&]+)/);
    return document.getElementById('toolbox-' + (match ? match[1] : 'categories'));
}

ipcRenderer.on('displayJS', (event, arg) => {
    if (arg) {
        document.getElementById('importExport').classList.add('active');
    } else {
        document.getElementById('importExport').classList.remove('active');
    }
});

function generateJavaScript() {
    let code = Blockly.JavaScript.workspaceToCode(workspace);

    if (code.length > 0) {

        let lines = code.match(/[^\r\n]+/g);
        let cpLines = [...lines];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (line == '(async function greenFlag() {') {
                if (i > 0) {
                    let lineBefore = lines[i - 1];

                    if (!lineBefore.startsWith('var')) {
                        cpLines.splice(i, 0, '})();');
                    }
                }
            }
        }
        let newCode = '';
        cpLines.forEach(line => {
            newCode += line + '\n';
        });

        return newCode;
    }
    return '';
}

function updateCodePreview(event) {
    if (event.type != Blockly.Events.BLOCK_MOVE) {
        const code = generateJavaScript();
        if (code != '') {
            document.getElementById('importExport').textContent = code + '})();';
        }
    }
}

function clickedGreenFlag() {
    const code = generateJavaScript() + '})();';
    ipcRenderer.send('greenflag', code);
}

function clickedStop() {
    ipcRenderer.send('emergency');
}

function enableKeyboard() {
    keyboard = true;
}

function disableKeyboard() {
    keyboard = false;
}

function fullScreenVideo() {
    if (!document.fullscreenElement) {
        document.querySelector("#videowrapper").requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', (event) => {

    let sensorOutputs = document.querySelector('#sensor-outputs');

    if (document.fullscreenElement) {
        document.querySelector('#fullscreen-sensors').appendChild(sensorOutputs);
        document.querySelector("#fullscreen i").textContent = 'fullscreen_exit';
        document.querySelector("#fullscreen-rc-controls").style.display = 'block';
    } else {
        document.querySelector('#sensor-area').appendChild(sensorOutputs);
        document.querySelector("#fullscreen i").textContent = 'fullscreen';
        document.querySelector("#fullscreen-rc-controls").style.display = 'none';
    }
});

ipcRenderer.on('file', (event, arg) => {

    if (arg == 'save') {
        saveWorkspace();
    }

    if (arg == 'open') {
        loadWorkspace();
    }
});

ipcRenderer.on('dronestate', (event, arg) => {
    currentState = arg;
    document.getElementById('vgx').textContent = arg.vgx;
    document.getElementById('vgy').textContent = arg.vgy;
    document.getElementById('vgz').textContent = arg.vgz;
    document.getElementById('bat').textContent = arg.bat;
    document.getElementById('time').textContent = arg.time;
    document.getElementById('h').textContent = arg.h;
    document.getElementById('temph').textContent = arg.temph;
    document.getElementById('templ').textContent = arg.templ;
    document.getElementById('pitch').textContent = arg.pitch;
    document.getElementById('yaw').textContent = arg.yaw;
    document.getElementById('baro').textContent = arg.baro;
    document.getElementById('agx').textContent = arg.agx;
    document.getElementById('agy').textContent = arg.agy;
    document.getElementById('agz').textContent = arg.agz;
    document.getElementById('tof').textContent = arg.tof;
});

ipcRenderer.on('flying', (event, arg) => {
    flying = arg;
    console.log('app flying: ', flying);
});

const validKeys = {
    'KeyW': { leftRight: 0, forBack: 50, upDown: 0, yaw: 0 },
    'KeyS': { leftRight: 0, forBack: -50, upDown: 0, yaw: 0 },
    'KeyA': { leftRight: -50, forBack: 0, upDown: 0, yaw: 0 },
    'KeyD': { leftRight: 50, forBack: 0, upDown: 0, yaw: 0 },
    'ArrowUp': { leftRight: 0, forBack: 0, upDown: 50, yaw: 0 },
    'ArrowDown': { leftRight: 0, forBack: 0, upDown: -50, yaw: 0 },
    'ArrowRight': { leftRight: 0, forBack: 0, upDown: 0, yaw: 50 },
    'ArrowLeft': { leftRight: 0, forBack: 0, upDown: 0, yaw: -50 },
}

document.addEventListener('keydown', getKeyPress);

function getKeyPress(key) {

    // KeyW, KeyA, KeyS, KeyD = forward, left, back, right
    // ArrowUp, ArrowLeft, ArrowDown, ArrowRight = up, yaw left, down, yaw right

    if (keyboard) {
        if (key.code in validKeys) {
            ipcRenderer.send('rc', validKeys[key.code]);
        }
        // Tab = takeoff, Backspace = land
        if (key.code == 'Tab') {
            ipcRenderer.send('takeoff');
        }
        if (key.code == 'Backspace') {
            ipcRenderer.send('land');
        }
    }
}

document.addEventListener('keyup', (key) => {
    if (keyboard && key.code in validKeys) {
        ipcRenderer.send('rc', { leftRight: 0, forBack: 0, upDown: 0, yaw: 0 });
    }
});

document.querySelectorAll('.mdl-button.forward').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: 50, upDown: 0, yaw: 0 });
        })
    }
);
document.querySelectorAll('.mdl-button.backward').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: -50, upDown: 0, yaw: 0 });
        })
    }
);
document.querySelectorAll('.mdl-button.left').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: -50, forBack: 0, upDown: 0, yaw: 0 });
        })
    }
)
document.querySelectorAll('.mdl-button.right').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 50, forBack: 0, upDown: 0, yaw: 0 });
        })
    }
);
document.querySelectorAll('.mdl-button.up').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: 0, upDown: 50, yaw: 0 });
        })
    }
);
document.querySelectorAll('.mdl-button.down').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: 0, upDown: -50, yaw: 0 });
        })
    }
);
document.querySelectorAll('.mdl-button.yaw-left').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: 0, upDown: 0, yaw: -50 });
        })
    }
)
document.querySelectorAll('.mdl-button.yaw-right').forEach(
    (button) => {
        button.addEventListener('mousedown', () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: 0, upDown: 0, yaw: 50 });
        })
    }
);
// Stop movement on mouseup
document.querySelectorAll(".mdl-button").forEach(
    (button) => {
        button.addEventListener("mouseup", () => {
            ipcRenderer.send('rc', { leftRight: 0, forBack: 0, upDown: 0, yaw: 0 });
        });
    }
);

const interval = setInterval(function () {
    let connectButtonElement = document.getElementById('connectButton');
    if (currentState != lastState) {
        connectButtonElement.classList.remove('mdl-color--red');
        connectButtonElement.classList.add('mdl-color--green');
        connectButtonElement.children[0].innerHTML = 'wifi_on';
    } else {
        connectButtonElement.classList.remove('mdl-color--green');
        connectButtonElement.classList.add('mdl-color--red');
        connectButtonElement.children[0].innerHTML = 'wifi_off';
        ipcRenderer.send('tryConnect', 'connect');
    }

    lastState = currentState;
}, 1000);


function takeoffOrLand() {
    if (flying) {
        ipcRenderer.send('land');
        document.querySelectorAll('#btn-takeoff-land i').forEach(
            (button) => {
                button.textContent = 'flight_takeoff';
            }
        );
        document.querySelectorAll('#text-takeoff-land').forEach(
            (text) => {
                text.textContent = 'Takeoff';
            }
        );
    } else {
        ipcRenderer.send('takeoff');
        document.querySelectorAll('#btn-takeoff-land i').forEach(
            (button) => {
                button.textContent = 'flight_land';
            }
        );
        document.querySelectorAll('#text-takeoff-land').forEach(
            (text) => {
                text.textContent = 'Land';
            }
        );
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
    ipcRenderer.send('tryConnect', 'connect');
}