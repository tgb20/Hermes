var workspace = null;

const { ipcRenderer, remote } = require('electron');
const prompt = require('electron-prompt');
const fs = require('fs');
const dialog = remote.dialog;
const win = remote.getCurrentWindow();
const lang = 'JavaScript';

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

function codePreview() {
    let output = document.getElementById('importExport');
    output.textContent = Blockly[lang].workspaceToCode(workspace);
    if (output.textContent.length > 0) { output.textContent += "}"; }
}

function clickedGreenFlag() {
    codePreview();
    let code = Blockly[lang].workspaceToCode(workspace) + "}";
    ipcRenderer.send('greenflag', code);
}

function fullScreenVideo() {
    document.querySelector("#videowrapper").requestFullscreen();
}

function toggleJavaScript() {
    codePreview();
    output.classList.toggle("active");
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
    console.log(arg);

    let bat = arg.bat;
    let h = arg.h;

    document.getElementById('bat').textContent = bat;
    document.getElementById('height').textContent = h;
});

document.addEventListener('keydown', getKeyPress);

function getKeyPress(e) {

    let keyCode = e.code;

    let leftRight = 0;
    let forBack = 0;
    let upDown = 0;
    let yaw = 0;

    // KeyW, KeyA, KeyS, KeyD, ArrowUp, ArrowLeft, ArrowDown, ArrowRight

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

    ipcRenderer.send('rc', {leftRight: leftRight, forBack: forBack, upDown: upDown, yaw: yaw});
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