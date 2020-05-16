'use strict';

goog.provide('Blockly.Blocks.drone_camera');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['drone_camera_take_photo'] = {
    /**
     * Block to take photo.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "take photo",
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_camera_start_video'] = {
    /**
     * Block to start video recording.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "start video",
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_camera_stop_video'] = {
    /**
     * Block to stop video recording.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "stop video",
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_camera_detect_marker'] = {
    /**
     * Block to Report if the drone sees a marker.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "marker %1",
            "args0": [{
                "type": "field_dropdown",
                "name": "ID",
                "options": [
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3']
                ]
            }],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "output_boolean"]
        });
    }
};