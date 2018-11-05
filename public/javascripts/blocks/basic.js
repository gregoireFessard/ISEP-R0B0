/**
 * Created by Patrick on 19/10/2017
 * Will add a licence after
 */

'use strict';
goog.provide('Blockly.Blocks.basic');
goog.provide('Blockly.Constants.Basic');

goog.require('Blockly.Blocks');

Blockly.Constants.Basic.HUE = 205;
Blockly.Blocks.basic.HUE = Blockly.Constants.Basic.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "show_number",
        "message0": "show number %1",
        "args0": [
            {
                "type": "field_number",
                "name": "VALUE",
                "value": 0
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 205,
        "tooltip": "Show a number on the display",
        "helpUrl": ""
    },{
        "type": "show_leds",
        "message0": "show leds %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "LED1_1",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED1_2",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED1_3",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED1_4",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED1_5",
                "checked": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "LED2_1",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED2_2",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED2_3",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED2_4",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED2_5",
                "checked": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "LED3_1",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED3_2",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED3_3",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED3_4",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED3_5",
                "checked": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "LED4_1",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED4_2",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED4_3",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED4_4",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED4_5",
                "checked": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_checkbox",
                "name": "LED5_1",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED5_2",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED5_3",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED5_4",
                "checked": false
            },
            {
                "type": "field_checkbox",
                "name": "LED5_5",
                "checked": false
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 205,
        "tooltip": "Turn on leds as specified in the input",
        "helpUrl": ""
    },
    {
        "type": "show_string",
        "message0": "show string %1",
        "args0": [
            {
                "type": "field_input",
                "name": "VALUE",
                "text": ""
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 205,
        "tooltip": "Show a string on the display",
        "helpUrl": ""
    },
    {
        "type": "pause",
        "message0": "pause (ms) %1",
        "args0": [
            {
                "type": "field_number",
                "name": "VALUE",
                "value": 100,
                "min": 0
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 205,
        "tooltip": "Makes the Micro:bit pauses ",
        "helpUrl": ""
    },
    {
        "type": "show_icon",
        "message0": "show icon %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ICON",
                "options": [
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/heart.png",
                            "width": 25,
                            "height": 25,
                            "alt": "heart"
                        },
                        "HEART"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/smallheart.png",
                            "width": 25,
                            "height": 25,
                            "alt": "small heart"
                        },
                        "SMALL_HEART"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/yes.png",
                            "width": 25,
                            "height": 25,
                            "alt": "yes"
                        },
                        "YES"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/no.png",
                            "width": 25,
                            "height": 25,
                            "alt": "no"
                        },
                        "NO"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/happy.png",
                            "width": 25,
                            "height": 25,
                            "alt": "happy"
                        },
                        "HAPPY"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/sad.png",
                            "width": 25,
                            "height": 25,
                            "alt": "sad"
                        },
                        "SAD"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/confused.png",
                            "width": 25,
                            "height": 25,
                            "alt": "confused"
                        },
                        "CONFUSED"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/angry.png",
                            "width": 25,
                            "height": 25,
                            "alt": "angry"
                        },
                        "ANGRY"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/asleep.png",
                            "width": 25,
                            "height": 25,
                            "alt": "asleep"
                        },
                        "ASLEEP"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/surprised.png",
                            "width": 25,
                            "height": 25,
                            "alt": "surprised"
                        },
                        "SURPRISED"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/silly.png",
                            "width": 25,
                            "height": 25,
                            "alt": "silly"
                        },
                        "SILLY"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/fabulous.png",
                            "width": 25,
                            "height": 25,
                            "alt": "fabulous"
                        },
                        "FABULOUS"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/meh.png",
                            "width": 25,
                            "height": 25,
                            "alt": "meh"
                        },
                        "MEH"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/tshirt.png",
                            "width": 25,
                            "height": 25,
                            "alt": "t-shirt"
                        },
                        "T-SHIRT"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/rollerskate.png",
                            "width": 25,
                            "height": 25,
                            "alt": "rollerskate"
                        },
                        "ROLLERSKATE"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/duck.png",
                            "width": 25,
                            "height": 25,
                            "alt": "duck"
                        },
                        "DUCK"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/house.png",
                            "width": 25,
                            "height": 25,
                            "alt": "house"
                        },
                        "HOUSE"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/tortoise.png",
                            "width": 25,
                            "height": 25,
                            "alt": "tortoise"
                        },
                        "TORTOISE"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/butterfly.png",
                            "width": 25,
                            "height": 25,
                            "alt": "butterfly"
                        },
                        "BUTTERFLY"
                    ],
                    [
                        {
                            "src": "https://pxt.azureedge.net/commit/b0905b93b6d9dfa6d0cf4b497f33f0e277fb5aac/blocks/iconnames/stickfigure.png",
                            "width": 25,
                            "height": 25,
                            "alt": "stickfigure"
                        },
                        "STICKFIGURE"
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