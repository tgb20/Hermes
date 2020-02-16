var fakeDragStack = [];
var workspace = null;

function start() {
    var soundsEnabled = null;
    if (sessionStorage) {
        // Restore sounds state.
        soundsEnabled = sessionStorage.getItem('soundsEnabled');
        if (soundsEnabled === null) {
            soundsEnabled = true;
        } else {
            soundsEnabled = (soundsEnabled === 'true');
        }
    } else {
        soundsEnabled = true;
    }

    // Setup blocks
    // Parse the URL arguments.
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
        sounds: soundsEnabled,
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

    // Restore previously displayed text.
    var text = sessionStorage.getItem('textarea');
    if (text) {
        document.getElementById('importExport').value = text;
    }
    taChange();

    if (sessionStorage) {
        // Restore event logging state.
        var state = sessionStorage.getItem('logEvents');
        logEvents(Boolean(state));

        // Restore flyout event logging state.
        state = sessionStorage.getItem('logFlyoutEvents');
        logFlyoutEvents(Boolean(state));
    }
}

function getToolboxElement() {
    var match = location.search.match(/toolbox=([^&]+)/);
    return document.getElementById('toolbox-' + (match ? match[1] : 'categories'));
}

function toXml() {
    var output = document.getElementById('importExport');
    var xml = Blockly.Xml.workspaceToDom(workspace);
    output.value = Blockly.Xml.domToPrettyText(xml);
    output.focus();
    output.select();
    taChange();
}

function fromXml() {
    var input = document.getElementById('importExport');
    var xml = Blockly.Xml.textToDom(input.value);
    Blockly.Xml.domToWorkspace(xml, workspace);
    taChange();
}

function toCode(lang) {
    var output = document.getElementById('importExport');
    output.value = Blockly[lang].workspaceToCode(workspace);
    taChange();
}

// Disable the "Import from XML" button if the XML is invalid.
// Preserve text between page reloads.
function taChange() {
    var textarea = document.getElementById('importExport');
    if (sessionStorage) {
        sessionStorage.setItem('textarea', textarea.value);
    }
    try {
        Blockly.Xml.textToDom(textarea.value);
    } catch (e) {
        valid = false;
    }
}

function logEvents(state) {
    var checkbox = document.getElementById('logCheck');
    checkbox.checked = state;
    if (sessionStorage) {
        sessionStorage.setItem('logEvents', state ? 'checked' : '');
    }
    if (state) {
        workspace.addChangeListener(logger);
    } else {
        workspace.removeChangeListener(logger);
    }
}

function logFlyoutEvents(state) {
    var checkbox = document.getElementById('logFlyoutCheck');
    checkbox.checked = state;
    if (sessionStorage) {
        sessionStorage.setItem('logFlyoutEvents', state ? 'checked' : '');
    }
    var flyoutWorkspace = (workspace.flyout_) ? workspace.flyout_.workspace_ :
        workspace.toolbox_.flyout_.workspace_;
    if (state) {
        flyoutWorkspace.addChangeListener(logger);
    } else {
        flyoutWorkspace.removeChangeListener(logger);
    }
}

function logger(e) {
    console.log(e);
}