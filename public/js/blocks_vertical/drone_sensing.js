'use strict';

goog.provide('Blockly.Blocks.drone_sensing');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['drone_sensing_speed'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "speed (cm/s)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_battery'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "battery (%)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_time'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "flight time (s)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_height'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "height (cm)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_temp'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "temperature (C)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_pitch'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "pitch (°)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_roll'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "roll (°)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_yaw'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "yaw (°)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_baro'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "barometer (m)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_accx'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "acceleration x (0.001 g)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_accy'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "acceleration x (0.001 g)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_accz'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "acceleration x (0.001 g)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_tof'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "tof (cm)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};