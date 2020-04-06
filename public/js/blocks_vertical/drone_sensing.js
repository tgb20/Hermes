'use strict';

goog.provide('Blockly.Blocks.drone_sensing');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['drone_sensing_speed_x'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "speed x (cm/s)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_speed_y'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "speed y (cm/s)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_speed_z'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "speed z (cm/s)",
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

Blockly.Blocks['drone_sensing_temp_high'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "high temperature (C)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": false,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_temp_low'] = {
    /**
     * Block to report Y.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "low temperature (C)",
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
            "message0": "acceleration y (0.001 g)",
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
            "message0": "acceleration z (0.001 g)",
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

Blockly.Blocks['drone_sensing_take_photo'] = {
    /**
     * Block to take photo.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "take photo",
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_sensing_start_video'] = {
    /**
     * Block to start video recording.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "start video",
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_sensing_stop_video'] = {
    /**
     * Block to stop video recording.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "stop video",
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "shape_statement"]
        });
    }
};