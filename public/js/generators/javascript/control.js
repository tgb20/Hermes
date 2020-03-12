goog.provide('Blockly.JavaScript.control');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['control_repeat'] = function (block) {

    var value_times = Blockly.JavaScript.valueToCode(block, 'TIMES');

    var value_branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');

    value_branch = Blockly.JavaScript.prefixLines(value_branch, '\t');

    let code = '\tfor(let i = 0; i < ' + value_times + '; i++) {\n' + value_branch + '\t}\n';

    return code;
}

Blockly.JavaScript['control_wait'] = function (block) {

    var value_duration = Blockly.JavaScript.valueToCode(block, 'DURATION');

    let milliseconds = value_duration + ' * 1000';

    let code = '\tawait new Promise(r => setTimeout(r, ' + milliseconds + '));\n';

    return code;
}

Blockly.JavaScript['control_if'] = function (block) {

    var value_condition = Blockly.JavaScript.valueToCode(block, 'CONDITION');
    var value_branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');

    value_branch = Blockly.JavaScript.prefixLines(value_branch, '\t');

    let code = '\tif(' + value_condition + ') {\n' + value_branch + '\t}\n';

    return code;
}

Blockly.JavaScript['control_if_else'] = function (block) {

    var value_condition = Blockly.JavaScript.valueToCode(block, 'CONDITION');
    var value_branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
    var value_branch2 = Blockly.JavaScript.statementToCode(block, 'SUBSTACK2');

    value_branch = Blockly.JavaScript.prefixLines(value_branch, '\t');

    value_branch2 = Blockly.JavaScript.prefixLines(value_branch2, '\t');

    let code = '\tif(' + value_condition + ') {\n' + value_branch + '\t} else {\n' + value_branch2 + '\t}\n';

    return code;
}

Blockly.JavaScript['control_while'] = function (block) {

    var value_condition = Blockly.JavaScript.valueToCode(block, 'CONDITION');
    var value_branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');

    value_branch = Blockly.JavaScript.prefixLines(value_branch, '\t');

    let code = '\twhile(' + value_condition + ') {\n' + value_branch + '\t}\n';

    return code;
}
