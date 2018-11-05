'use strict';

goog.provide('Blockly.Blocks.lineadvanced');  // Deprecated
goog.provide('Blockly.Constants.Lineadvanced');
goog.require('Blockly.Blocks');
Blockly.Constants.Lineadvanced.HUE = 250;
Blockly.Blocks.lineadvanced.HUE = Blockly.Constants.Lineadvanced.HUE;
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
    "type": "adconditions",
    "message0": "IF %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Right sensor detects line",
            "RIGHT"
          ],
          [
            "Left sensor detects line",
            "Left"
          ],
          [
            "None of the sensor detects line",
            "Straight"
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
    "type": "motor",
    "message0": "motor %1 %2 ,    motor %3 %4",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME1",
        "options": [
          [
            "Right",
            "RIGHT"
          ],
          [
            "Left",
            "LEFT"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "fast",
            "FAST"
          ],
          [
            "medium",
            "MEDIUM"
          ],
          [
            "slow",
            "SLOW"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Right",
            "RIGHT"
          ],
          [
            "Left",
            "LEFT"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "fast",
            "FAST"
          ],
          [
            "medium",
            "MEDIUM"
          ],
          [
            "slow",
            "SLOW"
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