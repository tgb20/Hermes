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
            "checkboxInFlyout": true,
            "tooltip": "the speed of the x axis (1-100cm/s)",
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
            "checkboxInFlyout": true,
            "tooltip": "the speed of the y axis (1-100cm/s)",
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
            "checkboxInFlyout": true,
            "tooltip": "the speed of the z axis (1-100cm/s)",
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
            "tooltip": "the percentage of the current battery level (0-100%)",
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
            "checkboxInFlyout": true,
            "tooltip": "the amount of time the motor has been used",
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
            "tooltip": "the height in cm (0-3000cm)",
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
            "checkboxInFlyout": true,
            "tooltip": "the highest temperature in degree Celsius (0-90C)",
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
            "checkboxInFlyout": true,
            "tooltip": "the lowest temperature in degree Celsius (0-90C)",
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
            "checkboxInFlyout": true,
            "tooltip": "the degree of the attitude pitch",
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
            "checkboxInFlyout": true,
            "tooltip": "the degree of the attitude roll",
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
            "checkboxInFlyout": true,
            "tooltip": "the degree of the attitude yaw",
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
            "checkboxInFlyout": true,
            "tooltip": "the barometer measurement in cm",
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
            "message0": "acceleration x (cm/s²)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": true,
            "tooltip": "the acceleration of the x axis",
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
            "message0": "acceleration y (cm/s²)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": true,
            "tooltip": "the acceleration of the y axis",
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
            "message0": "acceleration z (cm/s²)",
            "category": Blockly.Categories.sensing,
            "checkboxInFlyout": true,
            "tooltip": "the acceleration of the z axis",
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
            "checkboxInFlyout": true,
            "tooltip": "the time of flight distance in cm",
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['drone_sensing_flying'] = {
    /**
     * Block to Report if the drone is flying.
     * @this Blockly.Block
     */
    init: function() {
        this.jsonInit({
            "message0": "flying",
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};