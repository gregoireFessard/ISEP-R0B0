'use strict';

goog.provide('Blockly.Blocks.complex');  // Deprecated
goog.provide('Blockly.Constants.Complex');
goog.require('Blockly.Blocks');
Blockly.Constants.Complex.HUE = 250;
Blockly.Blocks.complex.HUE = Blockly.Constants.Complex.HUE;
Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
    "type": "start",
    "message0": "Start %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "NAME"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "linefollower",
    "message0": "Line follower Sensor",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "movements",
    "message0": "Movements",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "end",
    "message0": "End",
    "previousStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
  
]); // END JSON EXTRACT (Do not delete this comment.)
