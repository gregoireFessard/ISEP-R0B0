'use strict';

goog.provide('Blockly.Python.basic');

goog.require('Blockly.Python');



Blockly.Python.addReservedWords('microbit, display, show, sleep, set_pixel');

Blockly.Python['show_number'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var number_value = block.getFieldValue('VALUE');
    if (number_value.length > 1) {
        return 'display.scroll(\'' + number_value + '\')\n';
    }
    return 'display.show(\'' + number_value + '\')\n';
};

Blockly.Python['show_leds'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var checkbox_led1_1 = block.getFieldValue('LED1_1') == 'TRUE';
    var checkbox_led1_2 = block.getFieldValue('LED1_2') == 'TRUE';
    var checkbox_led1_3 = block.getFieldValue('LED1_3') == 'TRUE';
    var checkbox_led1_4 = block.getFieldValue('LED1_4') == 'TRUE';
    var checkbox_led1_5 = block.getFieldValue('LED1_5') == 'TRUE';
    var checkbox_led2_1 = block.getFieldValue('LED2_1') == 'TRUE';
    var checkbox_led2_2 = block.getFieldValue('LED2_2') == 'TRUE';
    var checkbox_led2_3 = block.getFieldValue('LED2_3') == 'TRUE';
    var checkbox_led2_4 = block.getFieldValue('LED2_4') == 'TRUE';
    var checkbox_led2_5 = block.getFieldValue('LED2_5') == 'TRUE';
    var checkbox_led3_1 = block.getFieldValue('LED3_1') == 'TRUE';
    var checkbox_led3_2 = block.getFieldValue('LED3_2') == 'TRUE';
    var checkbox_led3_3 = block.getFieldValue('LED3_3') == 'TRUE';
    var checkbox_led3_4 = block.getFieldValue('LED3_4') == 'TRUE';
    var checkbox_led3_5 = block.getFieldValue('LED3_5') == 'TRUE';
    var checkbox_led4_1 = block.getFieldValue('LED4_1') == 'TRUE';
    var checkbox_led4_2 = block.getFieldValue('LED4_2') == 'TRUE';
    var checkbox_led4_3 = block.getFieldValue('LED4_3') == 'TRUE';
    var checkbox_led4_4 = block.getFieldValue('LED4_4') == 'TRUE';
    var checkbox_led4_5 = block.getFieldValue('LED4_5') == 'TRUE';
    var checkbox_led5_1 = block.getFieldValue('LED5_1') == 'TRUE';
    var checkbox_led5_2 = block.getFieldValue('LED5_2') == 'TRUE';
    var checkbox_led5_3 = block.getFieldValue('LED5_3') == 'TRUE';
    var checkbox_led5_4 = block.getFieldValue('LED5_4') == 'TRUE';
    var checkbox_led5_5 = block.getFieldValue('LED5_5') == 'TRUE';

    var leds = [
        [checkbox_led1_1, checkbox_led1_2, checkbox_led1_3, checkbox_led1_4, checkbox_led1_5],
        [checkbox_led2_1, checkbox_led2_2, checkbox_led2_3, checkbox_led2_4, checkbox_led2_5],
        [checkbox_led3_1, checkbox_led3_2, checkbox_led3_3, checkbox_led3_4, checkbox_led3_5],
        [checkbox_led4_1, checkbox_led4_2, checkbox_led4_3, checkbox_led4_4, checkbox_led4_5],
        [checkbox_led5_1, checkbox_led5_2, checkbox_led5_3, checkbox_led5_4, checkbox_led5_5]
    ];
    var code = '';

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (leds[i][j] == true) {
                code += 'display.set_pixel(' + i + ' ,' + j + ', 9)\n';
            }
        }
    }
    return code;
};


Blockly.Python['show_string'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var text_value = Blockly.Python.quote_(block.getFieldValue('VALUE'));
    if (text_value.length > 1) {
        return 'display.scroll(' + text_value + ')\n';
    }
    return 'display.show(' + text_value + ')\n';
};


Blockly.Python['pause'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var number_value = block.getFieldValue('VALUE');
    return 'sleep(' + number_value + ')\n';
};







Blockly.Python['show_icon'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var dropdown_icon = block.getFieldValue('ICON');
    var image_name = 'IMAGE.';
    switch (dropdown_icon) {
        case 'HEART':
            image_name += 'HEART';
            break;
        case 'SMALL_HEART':
            image_name += 'HEART_SMALL';
            break;
        case 'HAPPY':
            image_name += 'HAPPY';
            break;
        default:
            image_name += 'SMILE'
    }
    var code = 'display.show(' + image_name + ')\n';
    return code;
};

