# ISEP-R0B0

## What is ISEP-R0B0?
ISEP-R0B0 is a project led by a interdisciplinary team at [LISITE](http://lisite.isep.fr/), 
the reseach lab at [Institut Supérieur d'Électronique de Paris](https://www.isep.fr/).
This project is supported by the [Fondation Orange](https://www.fondationorange.com/).

The overall objective of ISEP-R0B0 is to provide learners with cheap and programmable robots with two main goals:

- To allow anyone to program a robot, even without knowing anything about programming or programming languages.
- To make ISEP-R0B0 an educational tool which can also be used in STEM education, and in particular in Mathematics or Physics.

## Web Interface and Blockly
ISEP-R0B0 comes with a Web interface which displays a Visual Programming Language (VPL). 
Here, the VPL is based on Blockly, a framework to create small programs using blocks.

This GitHub repository is used to trace the development of this Web interface.

_More information will come as the project is further developed._

## How to run the project
The project uses a node.js server, which needs to be started before running the application.
To do so, open a Terminal window, go to the root directory of the project, and type: `node ./bin/www`.

Once the server is started, open your Web browser, type in the following URL: `localhost:3000`, and discover all the blocks at your disposal.
Currently, there are only the default blocks provided by Blockly and some blocks that were reconstructed from what [micro:bit](http://microbit.org/) itself provides.

## For developers

### Implementation of Blockly
ISEP-R0B0 bases its Visual Programming Language on Blockly, a framework which can translate graphical blocks into several programming languages.
In this project, we particularly benefit from the possibility to generate Python scripts with Blockly. 
In the future, we might focus more on a specific Python library: MicroPython, which is developed to run on microcontrollers.

For further references on Blockly, have a look at the documentation [here](https://developers.google.com/blockly/). 
### Creating custom blocks
To create custom blocks, a documentation and a specific tool exists [here](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html).

_More information is to be added here, with step-by-step process on how to create custom blocks and add them to the Blockly interface._
### Regenerating the Javascript files
When adding custom blocks into the project, follow these instructions:

1. Open a Terminal window, and change directories until you reach the root directory of the project
2. Type in the following instruction: `cd public/javascripts`, where the `build.py` file is located
3. Execute the script using Python 2.x (the script is not compatible with Python 3.x)
4. All the Javascript files that need to be used in the Blockly interface will be generated

Note: The `build.py` script has been modified to only generate Javascript files to generate Python code. 
To change this behavior, you simply need to uncomment these few lines.creating a test to add a new repositori
