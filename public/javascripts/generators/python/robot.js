'use strict';

goog.provide('Blockly.Python.robot');

goog.require('Blockly.Python');

  Blockly.Python['lightinput'] = function(block) {
    // TODO: Assemble Python into code variable.
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    
    return 'lightLevel()\n';
  };
  Blockly.Python['tempinput'] = function(block) {
    // TODO: Assemble Python into code variable.
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    
    return 'temperature()\n';
  };
  Blockly.Python['pin'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    //var code='';
    if(dropdown_name == 'P0')
    {
      var code=" if pin0.is_touched()";
    }
    if(dropdown_name == 'P1')
    {
       var code=" if pin1.is_touched()";
    }
    if(dropdown_name == 'P2')
    {
      var code= " if pin2.is_touched()";
    }
    
    var statements_name = Blockly.Python.statementToCode(block, 'INPUT');
    statements_name = Blockly.Python.addLoopTrap(statements_name, block.id) ||
    Blockly.Python.PASS;
    var data=statements_name
    var result='while True:\n' +code+ ':\n';
    return [result+data];
    };
  
    Blockly.Python['read_analog'] = function(block) {
      Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
      var dropdown_name = block.getFieldValue('NAME');
      // TODO: Assemble JavaScript into code variable.
      if(dropdown_name == 'P0')
      {
        var code= 'if pin0.read_analog()\n';
      }
      if(dropdown_name == 'P1')
      {
        var code= 'if pin1.read_analog()\n';
      }
      if(dropdown_name == 'P2')
      {
        var code= 'if pin2.read_analog()\n';
      } 
      return code;
    };
    Blockly.Python['read_digital'] = function(block) {
      Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
      var dropdown_name = block.getFieldValue('NAME');
      // TODO: Assemble JavaScript into code variable.
      if(dropdown_name == 'P0')
      {
        var code= 'if pin0.read_digital()\n';
      }
      if(dropdown_name == 'P1')
      {
        var code= 'if pin1.read_digital()\n';
      }
      if(dropdown_name == 'P2')
      {
        var code= 'if pin2.read_digital()\n';
      } 
      return code;
    };
    Blockly.Python['write_digital'] = function(block) {
      Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
      var number_value = block.getFieldValue('Value');
      var dropdown_name = block.getFieldValue('NAME');
      if(dropdown_name == 'P0')
      {
        var code= 'if pin0.write_digital('+number_value+')\n';
      }
      if(dropdown_name == 'P1')
      {
        var code= 'if pin1.write_digital('+number_value+')\n';
      } 
      if(dropdown_name == 'P2')
      {
        var code= 'if pin2.write_digital('+number_value+')\n';
      }
      return code;
    };
    Blockly.Python['write_analog'] = function(block) {
      Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
      var number_value = block.getFieldValue('Value');
      var dropdown_name = block.getFieldValue('NAME');
      if(dropdown_name == 'P0')
      {
        var code= 'if pin0.write_analog('+number_value+')\n';
      }
      if(dropdown_name == 'P1')
      {
        var code= 'if pin1.write_analog('+number_value+')\n';
      } 
      if(dropdown_name == 'P2')
      {
        var code= 'if pin2.write_analog('+number_value+')\n';
      }
      return code;
    };
    Blockly.Python['set_analog_period'] = function(block) {
      Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
      var number_value = block.getFieldValue('Value');
      var dropdown_name = block.getFieldValue('NAME');
      if(dropdown_name == 'P0')
      {
        var code= 'if pin0.set_analog_period('+number_value+')\n';
      }
      if(dropdown_name == 'P1')
      {
        var code= 'if pin1.set_analog_period('+number_value+')\n';
      } 
      if(dropdown_name == 'P2')
      {
        var code= 'if pin2.set_analog_period('+number_value+')\n';
      }
      return code;
    };
    Blockly.Python['set_analog_period_microseconds'] = function(block) {
      Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
      var number_value = block.getFieldValue('Value');
      var dropdown_name = block.getFieldValue('NAME');
      if(dropdown_name == 'P0')
      {
        var code= 'if pin0.set_analog_period_microseconds('+number_value+')\n';
      }
      if(dropdown_name == 'P1')
      {
        var code= 'if pin1.set_analog_period_microseconds('+number_value+')\n';
      } 
      if(dropdown_name == 'P2')
      {
        var code= 'if pin2.set_analog_period_microseconds('+number_value+')\n';
      }
      return code;
    };