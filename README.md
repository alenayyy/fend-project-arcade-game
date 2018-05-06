The Classic Arcade Game Clone - FROGGER
===============================

## Table of Contents
* [Requirements](#requirements)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [Udacity's Instructions](#Udacity's Instructions)

## Requirements
Provided with visual assets and a game loop engine by Udacity; using these tools you must add a number of entities to the game including the player characters and enemies to recreate the classic arcade game Frogger.

## Instructions

### How to Run The Game
* Download or clone the repository on your computer
* If downloaded, unzip it
* Open the "index.html" file in your browser to play the game

### How to Play The Game
* Before starting the game, choose a character
* To start the game move the player.
* Use the arrow keys on keyboard to move the player UP, DOWN, LEFT, RIGHT.
* Move the player and try to reach as many gems and hearts as you can.
* Every time you collect a heart the number of lives increases by 1 and every time you collect a gem the score increases by 10 points.
* Avoid touching the enemies/bugs otherwise the number of lives decreases by 1 and the player is reset to its original position.
* When the player reach the water, the level increases by 1, the difficulty grow and the player is reset to its original position.
* To restart the game, click the restart button.
* To pause the game, click the pause button
* When the number of lives is 0, the game is over.

The goal of the player is to reach the water, without running into any enemies and, to collect as many gems and lives as possible.  The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the player moves back to the starting point. Once the player reaches the water the level increases. The game is over when the player looses all its lives.

## Contributing
Game engine and resources including the canvas provided by Udacity.
The rest of the functionality created by Alena.

The game is written in JavaScript and uses Bootstrap and a third party library - SweetAlert - to create a modal and display a message at the end of the game.Game sounds from Freesounds.org.

## Udacity's Instructions
* If you need a refresher on Object Oriented JavaScript, review our course and OOJS Notes.
* If you'd like a more detailed explanation as to how the game engine works, see our HTML5 Canvas course.
* Read the detailed instructions for the project.
* Download the art assets and provided game engine.
* Review the video of the completed game below and take note of the game's rules.
* Review the code and comments provided in app.js
* Identify the various classes you will need to write.
* Identify and code the properties each class must have to accomplish its tasks.
* Write the functions that provide functionality to each of your class instances.
* Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission.
* Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon.
* Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

* For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
