'use strict';

goog.provide('Blockly.JavaScript.operators');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['operator_add'] = function (block) {
  var value_num1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_num1 + " + " + value_num2;

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_subtract'] = function (block) {
  var value_num1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_num1 + " - " + value_num2;

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_multiply'] = function (block) {
  var value_num1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_num1 + " * " + value_num2;

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_divide'] = function (block) {
  var value_num1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_num1 + " / " + value_num2;

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_random'] = function (block) {
  var value_from = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC);

  if (value_from > value_to) {
    var c = value_from;
    value_from = value_to;
    value_to = c;
  }

  let code = "Math.floor(Math.random() * (" + value_to + " - " + value_from + " + 1) + "+ value_from + ")";

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_lt'] = function (block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_operand1 + " < " + value_operand2;

  code = code.replace(/\'/gi,'')

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_equals'] = function (block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_operand1 + " == " + value_operand2;

  code = code.replace(/\'/gi,'')

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_gt'] = function (block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_operand1 + " > " + value_operand2;

  code = code.replace(/\'/gi,'')

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_and'] = function (block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_operand1 + " && " + value_operand2;

  code = code.replace(/\'/gi,'')

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_or'] = function (block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_operand1 + " || " + value_operand2;

  code = code.replace(/\'/gi,'')

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_not'] = function (block) {
  var value_operand = Blockly.JavaScript.valueToCode(block, 'OPERAND', Blockly.JavaScript.ORDER_ATOMIC);

  let code = "!" + value_operand;

  code = code.replace(/\'/gi,'')

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_mod'] = function (block) {
  var value_num1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_ATOMIC);

  let code = value_num1 + " % " + value_num2;

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_round'] = function (block) {
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);

  let code = "Math.round(" + value_num + ")";

  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['operator_mathop'] = function (block) {
  var value_operator = block.getFieldValue('OPERATOR');
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);

  let code = "";

  switch(value_operator) {
    case 'abs':
      code = 'Math.abs(' + value_num + ')';
      break;
    case 'floor':
      code = 'Math.floor(' + value_num + ')';
      break;
    case 'ceiling':
      code = 'Math.ceil(' + value_num + ')';
      break;
    case 'sqrt':
      code = 'Math.sqrt(' + value_num + ')';
      break;
    case 'sin':
      code = 'Math.sin(' + value_num + ')';
      break;
    case 'cos':
      code = 'Math.cos(' + value_num + ')';
      break;
    case 'tan':
      code = 'Math.tan(' + value_num + ')';
      break;
    case 'asin':
      code = 'Math.asin(' + value_num + ')';
      break;
    case 'acos':
      code = 'Math.acos(' + value_num + ')';
      break;
    case 'atan':
      code = 'Math.atan(' + value_num + ')';
      break;
    case 'ln':
      code = 'Math.log10(' + value_num + ')';
      break;
    case 'log':
      code = 'Math.log(' + value_num + ')';
      break;
    case 'e ^':
      code = 'Math.exp(' + value_num + ')';
      break;
    case '10 ^':
      code = 'Math.pow(10, ' + value_num + ')';
      break;
    default:
      break;
  }

  return [code, Blockly.JavaScript.ORDER_NONE];
}