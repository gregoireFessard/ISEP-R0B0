'use strict';

goog.provide('Blockly.Blocks.lineintermediate');  // Deprecated
goog.provide('Blockly.Constants.Lineintermediate');
goog.require('Blockly.Blocks');
Blockly.Constants.Lineintermediate.HUE = 250;
Blockly.Blocks.lineintermediate.HUE = Blockly.Constants.Lineintermediate.HUE;
Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
    "type": "start",
    "message0": "Start",
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lineSensorleft",
    "message0": "Line_Sensor_Left",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lineSensorright",
    "message0": "Line_Sensor_Right",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "if_condition",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "if"
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "curve left",
            "LEFT"
          ],
          [
            "curve right",
            "RIGHT"
          ],
          [
            "no curve",
            "STRAIGHT"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "conditions",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "TURN LEFT",
            "LEFT"
          ],
          [
            "TURN RIGHT",
            "RIGHT"
          ],
          [
            "Go STRAIGHT",
            "STRAIGHT"
          ]
        ]
      }
    ],
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