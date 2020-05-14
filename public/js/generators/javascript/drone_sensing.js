'use strict';

goog.provide('Blockly.JavaScript.drone_sensing');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['drone_sensing_speed_x'] = function (block) {

    let code = 'droneState.vgx';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_speed_y'] = function (block) {

    let code = 'droneState.vgy';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_speed_z'] = function (block) {

    let code = 'droneState.vgz';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_battery'] = function (block) {

    let code = 'droneState.bat';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_time'] = function (block) {

    let code = 'droneState.time';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_height'] = function (block) {

    let code = 'droneState.h';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_temp_high'] = function (block) {

    let code = 'droneState.temph';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_temp_low'] = function (block) {

    let code = 'droneState.templ';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_pitch'] = function (block) {

    let code = 'droneState.pitch';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_roll'] = function (block) {

    let code = 'droneState.roll';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_yaw'] = function (block) {

    let code = 'droneState.yaw';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_baro'] = function (block) {

    let code = 'droneState.baro';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_accx'] = function (block) {

    let code = 'droneState.agx';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_accy'] = function (block) {

    let code = 'droneState.agy';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_accz'] = function (block) {

    let code = 'droneState.agz';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_tof'] = function (block) {

    let code = 'droneState.tof';

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_sensing_flying'] = function (block) {
    return [flying, Blockly.JavaScript.ORDER_NONE];
}