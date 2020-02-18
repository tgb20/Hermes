'use strict';

goog.provide('Blockly.Blocks.drone_motion');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['drone_motion_takeoff'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "take off",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_land'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "land",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_setspeed'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "set speed to %1 cm/s",
            "args0": [
                {
                    "type": "input_value",
                    "name": "SPEED"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flyforward'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly forward %1 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flybackward'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly backward %1 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flyleft'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly left %1 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flyright'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly right %1 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flyup'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly up %1 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flydown'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly down %1 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flyto'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "fly to x %1 y %2 z %3 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "XPOS"
                },
                {
                    "type": "input_value",
                    "name": "YPOS"
                },
                {
                    "type": "input_value",
                    "name": "ZPOS"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flycurve'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "curve from x %1 y %2 z %3 to x %4 y %5 z %6 cm",
            "args0": [
                {
                    "type": "input_value",
                    "name": "XPOS1"
                },
                {
                    "type": "input_value",
                    "name": "YPOS1"
                },
                {
                    "type": "input_value",
                    "name": "ZPOS1"
                },
                {
                    "type": "input_value",
                    "name": "XPOS2"
                },
                {
                    "type": "input_value",
                    "name": "YPOS2"
                },
                {
                    "type": "input_value",
                    "name": "ZPOS2"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_rotateleft'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "rotate left %1 degrees",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DEGREES"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_rotateright'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "rotate right %1 degrees",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DEGREES"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flipforward'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "flip forward",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flipbackward'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "flip backward",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flipleft'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "flip left",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_flipright'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "flip right",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['drone_motion_emergency'] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "emergency stop motors",
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};