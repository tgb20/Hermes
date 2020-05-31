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
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || '';
    const code = '\tif (' + list + ') {' + list + '.push(' + item + '); } else { ' + list + ' = [' + item + ']; }\n';
    return code;
}

Blockly.JavaScript['data_deleteoflist'] = function (block) {
    const i = block.getFieldValue('INDEX') - 1;
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = '\t' + list + '.splice(' + i + ', 1);\n';
    return code;
}

Blockly.JavaScript['data_deletealloflist'] = function (block) {
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = '\t' + list + ' = [];\n';
    return code;
}

Blockly.JavaScript['data_insertatlist'] = function (block) {
    const item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || '';
    const i = block.getFieldValue('INDEX') - 1;
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = '\tif (' + list + ') { ' + list + '.splice(' + i + ', 0, ' + item + '); } else { ' + list + ' = [' + item + ']; }\n';
    return code;
}

Blockly.JavaScript['data_itemoflist'] = function (block) {
    const i = block.getFieldValue('INDEX') - 1;
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = list + '[' + i + ']';
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

Blockly.JavaScript['data_replaceitemoflist'] = function (block) {
    const item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || '';
    const i = block.getFieldValue('INDEX') - 1;
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = '\tif (' + list + ') { ' + list + '.splice(' + i + ', 1, ' + item + '); } else { ' + list + ' = [' + item + ']; }\n';
    return code +'\tconsole.log(' + list + ');\n';
}

Blockly.JavaScript['data_itemnumoflist'] = function (block) {
    const item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || '';
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = list + ".findIndex( (item) => item == '" + item + "') + 1";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

Blockly.JavaScript['data_lengthoflist'] = function (block) {
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = list + '.length';
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}

Blockly.JavaScript['data_listcontainsitem'] = function (block) {
    const item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) || '';
    const list = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    const code = list + ".includes(" + item + ")";
    return [code, Blockly.JavaScript.ORDER_ADDITION];
}