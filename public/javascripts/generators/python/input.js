'use strict';

goog.provide('Blockly.Python.input');

goog.require('Blockly.Python');
Blockly.Python.addReservedWords('microbit, display, show');


Blockly.Python['button'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
  //var code='';
  if(dropdown_name == 'A')
  {
    var code=" if button_a.is_pressed()";
  }
  if(dropdown_name == 'B')
  {
     var code=" if button_b.is_pressed()";
  }
  if(dropdown_name == 'A+B')
  {
    var code= " if button_a.is_pressed() and button_b.is_pressed()";
  }
  
  var statements_name = Blockly.Python.statementToCode(block, 'INPUT');
  statements_name = Blockly.Python.addLoopTrap(statements_name, block.id) ||
  Blockly.Python.PASS;
  var data=statements_name
  var result='while True:\n' +code+ ':\n';
  return [result+data];
  };

  Blockly.Python['forever'] = function(block) {
    var statements_name = Blockly.Python.statementToCode(block, 'NAME');
    // TODO: Assemble Python into code variable.
    statements_name = Blockly.Python.addLoopTrap(statements_name, block.id) ||
    Blockly.Python.PASS;
    return ['while True:\n'+statements_name];
  };

  Blockly.Python['gesture'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var statements_name = Blockly.Python.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    if(dropdown_name == 'up')
    {
      var code=" if accelerometer.is_gesture('up')";
    }
    if(dropdown_name == 'down')
    {
       var code=" if accelerometer.is_gesture('down')";
    }
    if(dropdown_name == 'left')
    {
      var code= " if accelerometer.is_gesture('left')";
    }
    
    if(dropdown_name == 'right')
    {
      var code= " if accelerometer.is_gesture('right')";
    }
    if(dropdown_name == 'face up')
    {
      var code= " if accelerometer.is_gesture('face up')";
    }
    if(dropdown_name == 'face down')
    {
      var code= " if accelerometer.is_gesture('face down')";
    }
    if(dropdown_name == 'freefall')
    {
      var code= " if accelerometer.is_gesture('freefall')";
    }
    if(dropdown_name == 'shake')
    {
      var code= " if accelerometer.is_gesture('shake')";
    }
    if(dropdown_name == '3g')
    {
      var code= " if accelerometer.is_gesture('3g')";
    }
    if(dropdown_name == '6g')
    {
      var code= " if accelerometer.is_gesture('6g')";
    }
    if(dropdown_name == '8g')
    {
      var code= " if accelerometer.is_gesture('8g')";
    }
    
    
      statements_name = Blockly.Python.addLoopTrap(statements_name, block.id) ||
      Blockly.Python.PASS;
      var data=statements_name
      var result='while True:\n' +code+ ':\n';
      return [result+data];
  };
  
  Blockly.Python['first'] = function(block) {
    var statements_name = Blockly.Python.statementToCodestart(block, 'NAME');
    // TODO: Assemble Python into code variable.
    
    statements_name = Blockly.Python.addLoopTrapstart(statements_name, block.id) ||
    Blockly.Python.PASS;
    return [statements_name];
  };







