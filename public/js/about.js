const { ipcRenderer } = require('electron');

ipcRenderer.on('version', (event, version) => {
    console.log('version', version);
    document.getElementById('version').innerHTML = version;
});