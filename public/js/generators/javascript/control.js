goog.provide('Blockly.JavaScript.control');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['control_repeat'] = function (block) {

    var value_times = Blockly.JavaScript.valueToCode(block, 'TIMES');

    var value_branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');


    let code = '\tfor(let i = 0; i < ' + value_times + '; i++) {\n' + value_branch + '\t}\n';

    return code;
}

Blockly.JavaScript['control_wait'] = function (block) {

    var value_duration = Blockly.JavaScript.valueToCode(block, 'DURATION');

    let milliseconds = value_duration + ' * 1000';

    let code = '\tawait new Promise(r => setTimeout(r, ' + milliseconds + '));\n';

    return code;
}
