'use strict';

goog.provide('Blockly.JavaScript.drone_motion');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['drone_motion_takeoff'] = function (block) {

    let code = '\tawait drone.send("takeoff");\n';

    return code;
}

Blockly.JavaScript['drone_motion_land'] = function (block) {

    let code = '\tawait drone.send("land");\n';

    return code;
}

Blockly.JavaScript['drone_motion_setspeed'] = function (block) {

    var value_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("speed", { value: ' + value_speed + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flyforward'] = function (block) {

    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("forward", { value: ' + value_distance + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flybackward'] = function (block) {

    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("back", { value: ' + value_distance + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flyleft'] = function (block) {

    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("left", { value: ' + value_distance + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flyright'] = function (block) {

    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("right", { value: ' + value_distance + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flyup'] = function (block) {

    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("up", { value: ' + value_distance + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flydown'] = function (block) {

    var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("down", { value: ' + value_distance + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_rotateleft'] = function (block) {

    var value_degrees= Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("ccw", { value: ' + value_degrees + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_rotateright'] = function (block) {

    var value_degrees= Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\tawait drone.send("cw", { value: ' + value_degrees + ' });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flipforward'] = function (block) {

    let code = '\tawait drone.send("flip", { value: "f" });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flipbackward'] = function (block) {

    let code = '\tawait drone.send("flip", { value: "b" });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flipleft'] = function (block) {

    let code = '\tawait drone.send("flip", { value: "l" });\n';

    return code;
}

Blockly.JavaScript['drone_motion_flipright'] = function (block) {

    let code = '\tawait drone.send("flip", { value: "r" });\n';

    return code;
}