'use strict';

goog.provide('Blockly.Blocks.input');  // Deprecated
goog.provide('Blockly.Constants.Input');
goog.require('Blockly.Blocks');
Blockly.Constants.Input.HUE = 250;
Blockly.Blocks.input.HUE = Blockly.Constants.Input.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  
  {
        "type": "button",
        "message0": "Button %1 is pressed %2 %3",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "NAME",
            "options": [
              [
                "A",
                "A"
              ],
              [
                "B",
                "B"
              ],
              [
                "A+B",
                "A+B"
              ]
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "INPUT"
          }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      },
       {
        "type": "forever",
        "message0": "Forever %1 %2",
        "args0": [
          {
            "type": "input_dummy"
          },
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
        "type": "gesture",
        "message0": "on %1 %2 %3",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "NAME",
            "options": [
              [
                "up",
                "up"
              ],
              [
                "down",
                "down"
              ],
              [
                "left",
                "left"
              ],
              [
                "face up",
                "face up"
              ],
              [
                "right",
                "right"
              ],
              [
                "face down",
                "face down"
              ],
              [
                "freefall",
                "freefall"
              ],
              [
                "shake",
                "shake"
              ],
              [
                "right",
                "right"
              ],
              [
                "3g",
                "3g"
              ],
              [
                "6g",
                "6g"
              ],
              [
                "8g",
                "8g"
              ]
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "NAME"
          }
        ],
        "inputsInline": true,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      },
      {
        "type": "first",
        "message0": "Start %1 %2",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "NAME"
          }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
       }
    
]); // END JSON EXTRACT (Do not delete this comment.)



