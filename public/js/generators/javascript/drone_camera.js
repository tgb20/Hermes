'use strict';

goog.provide('Blockly.JavaScript.drone_camera');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['drone_camera_take_photo'] = function (block) {

    let code = '\ttakePhoto();\n';

    return code;
}

Blockly.JavaScript['drone_camera_start_video'] = function (block) {

    let code = '\tstartVideo();\n';

    return code;
}

Blockly.JavaScript['drone_camera_stop_video'] = function (block) {

    let code = '\tstopVideo();\n';

    return code;
}

Blockly.JavaScript['drone_camera_detect_marker'] = function (block) {
    const id = block.getFieldValue('ID');
    const code = '(' + id + ' in detectedMarkers) ? true : false';
    return [code, Blockly.JavaScript.ORDER_NONE];
}