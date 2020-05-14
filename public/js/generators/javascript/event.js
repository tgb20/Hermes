'use strict';

goog.provide('Blockly.JavaScript.event');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['event_whenflagclicked'] = function (block) {

    let code = "(async function greenFlag() {\n";

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['drone_event_emergency'] = function (block) {

    let code = '\tawait drone.send("emergency");\n';

    return code;
}