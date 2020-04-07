'use strict';

goog.provide('Blockly.JavaScript.data');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['data_variable'] = function (block) {

    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);

    let code = variable_name;

    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['data_setvariableto'] = function (block) {

    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);

    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\t' + variable_name + ' = parseInt(' + value_value + ');\n';

    return code;
}

Blockly.JavaScript['data_changevariableby'] = function (block) {

    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);

    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = '\t' + variable_name + ' += ' + value_value + ';\n';

    return code;
}

Blockly.JavaScript['data_addtolist'] = function (block) {

    let code = '\tlet testGenerator = "New List!";\n';

    return code;
}