/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.defaultToolbox');

goog.require('Blockly.Blocks');

/**
 * @fileoverview Provide a default toolbox XML.
 */

Blockly.Blocks.defaultToolbox = '<xml id="toolbox-categories" style="display: none">' +
  '<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">' +
    '<block type="drone_motion_takeoff" id="drone_motion_takeoff"></block>' +
    '<block type="drone_motion_land" id="drone_motion_land"></block>' +
    '<block type="drone_motion_setspeed" id="drone_motion_setspeed">' +
      '<value name="SPEED">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">30</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flyforward" id="drone_motion_flyforward">' +
      '<value name="DISTANCE">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flybackward" id="drone_motion_flybackward">' +
      '<value name="DISTANCE">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flyleft" id="drone_motion_flyleft">' +
      '<value name="DISTANCE">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flyright" id="drone_motion_flyright">' +
      '<value name="DISTANCE">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flyup" id="drone_motion_flyup">' +
      '<value name="DISTANCE">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flydown" id="drone_motion_flydown">' +
      '<value name="DISTANCE">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flyto" id="drone_motion_flyto">' +
      '<value name="XPOS">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="YPOS">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="ZPOS">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">20</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flycurve" id="drone_motion_flycurve">' +
      '<value name="XPOS1">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">25</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="YPOS1">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">25</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="ZPOS1">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">25</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="XPOS2">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">50</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="YPOS2">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">50</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="ZPOS2">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">50</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_rotateleft" id="drone_motion_rotateleft">' +
      '<value name="DEGREES">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">90</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_rotateright" id="drone_motion_rotateright">' +
      '<value name="DEGREES">' +
          '<shadow type="math_positive_number">' +
            '<field name="NUM">90</field>' +
          '</shadow>' +
        '</value>' +
    '</block>' +
    '<block type="drone_motion_flipforward" id="drone_motion_flipforward"></block>' +
    '<block type="drone_motion_flipbackward" id="drone_motion_flipbackward"></block>' +
    '<block type="drone_motion_flipleft" id="drone_motion_flipleft"></block>' +
    '<block type="drone_motion_flipright" id="drone_motion_flipright"></block>' +
    '<block type="drone_motion_emergency" id="drone_motion_emergency"></block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">' +
    '<block type="event_whenflagclicked" id="event_whenflagclicked"></block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">' +
    '<block type="control_wait" id="control_wait">' +
      '<value name="DURATION">' +
        '<shadow type="math_positive_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="control_repeat" id="control_repeat">' +
      '<value name="TIMES">' +
        '<shadow type="math_whole_number">' +
          '<field name="NUM">10</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="control_forever" id="control_forever"></block>' +
    '<block type="control_if" id="control_if"></block>' +
    '<block type="control_if_else" id="control_if_else"></block>' +
    '<block type="control_wait_until" id="control_wait_until"></block>' +
    '<block type="control_repeat_until" id="control_repeat_until"></block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">' +
    '<block type="drone_sensing_speed" id="drone_sensing_speed"></block>' +
    '<block type="drone_sensing_battery" id="drone_sensing_battery"></block>' +
    '<block type="drone_sensing_time" id="drone_sensing_time"></block>' +
    '<block type="drone_sensing_height" id="drone_sensing_height"></block>' +
    '<block type="drone_sensing_temp" id="drone_sensing_temp"></block>' +
    '<block type="drone_sensing_pitch" id="drone_sensing_pitch"></block>' +
    '<block type="drone_sensing_roll" id="drone_sensing_roll"></block>' +
    '<block type="drone_sensing_yaw" id="drone_sensing_yaw"></block>' +
    '<block type="drone_sensing_baro" id="drone_sensing_baro"></block>' +
    '<block type="drone_sensing_accx" id="drone_sensing_accx"></block>' +
    '<block type="drone_sensing_accy" id="drone_sensing_accy"></block>' +
    '<block type="drone_sensing_accz" id="drone_sensing_accz"></block>' +
    '<block type="drone_sensing_tof" id="drone_sensing_tof"></block>' +
  '</category>' +
  '<category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#40BF4A" secondaryColour="#389438">' +
    '<block type="operator_add" id="operator_add">' +
      '<value name="NUM1">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="NUM2">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_subtract" id="operator_subtract">' +
      '<value name="NUM1">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="NUM2">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_multiply" id="operator_multiply">' +
      '<value name="NUM1">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="NUM2">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_divide" id="operator_divide">' +
      '<value name="NUM1">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="NUM2">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_random" id="operator_random">' +
      '<value name="FROM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="TO">' +
        '<shadow type="math_number">' +
          '<field name="NUM">10</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_lt" id="operator_lt">' +
      '<value name="OPERAND1">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="OPERAND2">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_equals" id="operator_equals">' +
      '<value name="OPERAND1">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="OPERAND2">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_gt" id="operator_gt">' +
      '<value name="OPERAND1">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="OPERAND2">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_and" id="operator_and"></block>' +
    '<block type="operator_or" id="operator_or"></block>' +
    '<block type="operator_not" id="operator_not"></block>' +
    '<block type="operator_mod" id="operator_mod">' +
      '<value name="NUM1">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
      '<value name="NUM2">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_round" id="operator_round">' +
      '<value name="NUM">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="operator_mathop" id="operator_mathop">' +
      '<value name="NUM">' +
        '<shadow type="math_number">' +
          '<field name="NUM"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
  '</category>' +
  '</xml>';
