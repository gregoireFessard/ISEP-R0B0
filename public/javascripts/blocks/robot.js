'use strict';

goog.provide('Blockly.Blocks.robot');  // Deprecated
goog.provide('Blockly.Constants.Robot');
goog.require('Blockly.Blocks');
Blockly.Constants.Robot.HUE = 250;
Blockly.Blocks.robot.HUE = Blockly.Constants.Robot.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
{
    "type": "lightinput",
    "message0": "lightlevel",
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "tempinput",
    "message0": "temperaturelevel",
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "pin",
    "message0": "Pin %1 TouchPin %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "P0",
            "P0"
          ],
          [
            "P1",
            "P1"
          ],
          [
            "P2",
            "P2"
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
  "type": "read_digital",
  "message0": "read_digital %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "P0",
          "P0"
        ],
        [
          "P1",
          "P1"
        ],
        [
          "P2",
          "P2"
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
    "type": "read_analog",
    "message0": "read_analog %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "P0",
            "P0"
          ],
          [
            "P1",
            "P1"
          ],
          [
            "P2",
            "P2"
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
    "type": "write_digital",
    "message0": "write_digital %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "Value",
        "value": 0,
        "min": 0,
        "max": 1
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "P0",
            "P0"
          ],
          [
            "P1",
            "P1"
          ],
          [
            "P2",
            "P2"
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
    "type": "write_analog",
    "message0": "write_analog %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "Value",
        "value": 0,
        "min": 0,
        "max": 1023
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "P0",
            "P0"
          ],
          [
            "P1",
            "P1"
          ],
          [
            "P2",
            "P2"
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
    "type": "set_analog_period",
    "message0": "set_analog_period %1 ms %2",
    "args0": [
      {
        "type": "field_input",
        "name": "Value",
        "value": 1,
        "min": 1,
        "max": 20
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "P0",
            "P0"
          ],
          [
            "P1",
            "P1"
          ],
          [
            "P2",
            "P2"
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
    "type": "set_analog_period_microseconds",
    "message0": "set_analog_period_microseconds %1 µs %2",
    "args0": [
      {
        "type": "field_input",
        "name": "Value",
        "value": 256,
        "min": 256,
        "max": 1000
      },
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "P0",
            "P0"
          ],
          [
            "P1",
            "P1"
          ],
          [
            "P2",
            "P2"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }


    ]); // END JSON EXTRACT (Do not delete this comment.)
    
