
/******************ENEMIES**************************************/
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.heightAdj = 20;
    this.x = x;
    this.y = y - this.heightAdj;
    this.speed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x >= ctx.canvas.width) {
        this.x = start;
        this.speed = randomSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/****************** PRIZES **************************/
// base class for prizes like Gem and Heart
class Prize {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // get the position of the prize
  getCellPosition() {
    let col = Math.floor(this.x / cellWidth);
    let row = Math.floor(this.y / cellHeight);
    let cellPos = {
      x: col,
      y: row
    };
    return cellPos;
  }
}

class Gem extends Prize {
  constructor(x, y, gemColor) {
    super(x, y);
    this.sprite = 'images/Gem '+gemColor+'.png';
  }

  update() {
    // compare the player cell position to the gem position; if match, increase the score and hide the gem
    if(player.getCellPosition().x === this.getCellPosition().x && player.getCellPosition().y === this.getCellPosition().y) {
      game.addPoints(10);
      sound[1].play();
      this.x = -100;
      this.y = -100;
    }
  }
}

class Heart extends Prize {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/Heart.png';
  }

  update() {
    // compare the player cell position to the heart position; if match, increase the  number of lives and hide the heart
    if(player.getCellPosition().x === this.getCellPosition().x && player.getCellPosition().y === this.getCellPosition().y) {
      game.changeHearts(1);
      sound[0].play();
      this.x = -100;
      this.y = -100;
    }
  }
}

// class responsible for keeping track of scores, lives, levels and prizes (which include lives)
class Game {
  constructor(hearts) {
    this.hearts = hearts;
    this.score = 0;
    this.level = 0;
    this.allPrizes = [];
    document.getElementById('playerScore').innerText = 'Score: '+this.score;
    document.getElementById('playerLives').innerText = 'Lives: '+this.hearts;
  }

  // add or substract a life and let the user know the number of lives remaining
  changeHearts(count) {
    this.hearts += count;
    document.getElementById('playerLives').innerText = 'Lives: '+this.hearts;
    return this.hearts;
  }

  // add points and let the user know the current score
  addPoints(points) {
    this.score += points;
    document.getElementById('playerScore').innerText = 'Score: '+this.score;
  }

  // advance the game's level and shuffle the prizes
  newLevel() {
    this.level++;
    document.getElementById('playerLevel').innerHTML = 'Level: ' + game.level;

    // every time when advancing one level, increase the min/max speed
    if(this.level > 1) {
      minSpeed += increaseLevelSpeed;
      maxSpeed += increaseLevelSpeed;
      sound[2].play();
    }

    this.shufflePrizes();
  }

  // recreate prizes and change their position
  shufflePrizes() {
    const gem1 = new Gem(randomPrize(0, 6) * cellWidth + 25, randomPrize(1,3) * cellHeight + 35, 'Orange');
    const gem2 = new Gem(randomPrize(0, 6) * cellWidth + 25, randomPrize(1,3) * cellHeight + 35, 'Green');
    const heart = new Heart(randomPrize(0, 6) * cellWidth + 25, randomPrize(1,3) * cellHeight + 35);
    this.allPrizes = [gem1, gem2, heart];
  }
}

/******************PLAYER**************************/
class Player {
  constructor(x,y, image) {
    this.sprite = image;
    this.heightAdj = 10;
    this.x = x;
    this.y = y - this.heightAdj;
    this.moveSizeX = cellWidth;
    this.moveSizeY = cellHeight;
    this.maxY = cellHeight * 4;

  }

  // detect collision between player and bugs
  update() {
    let padding = 30;
    allEnemies.forEach(enemy => {
      if(this.isTouching(enemy.x, enemy.y, padding)) {
        sound[3].play();
        this.bugAteMe();
      }
    });
  }

  // when player is eaten by bug, the player position is reset and one life is taken away
  bugAteMe() {
    this.x = 3 * cellWidth;
    this.y = 5 * cellHeight - this.heightAdj;
    let livesCount = game.changeHearts(-1);

    if(livesCount > 0) {
      game.shufflePrizes();
      document.getElementById('playerLives').innerHTML = 'Lives: ' + livesCount;
    }
    else {
      sound[4].play();
        swal({
          title:
          `Game over!
          You reached level ${game.level} and won ${game.score} points!`,
          text: "" ,
          icon: "success",
          buttons: {
            cancel: "Quit",
            continue: {
              text: 'Play again',
              value: 'yes'
            }
          }
        }).then( (value) => {
          switch(value) {
            case "yes": this.startOver();
              break;
            default:
              swal("Goodbye!");
              stopTheGame();
          }
        });
      }
  }

  // resets the game's hearts, score, level and min/max speed; it also resets the player to the starting point
  startOver() {
    game.hearts = 3;
    game.score = 0;
    game.level = 0;
    minSpeed = 100;
    maxSpeed = 300;
    this.increaseLevelAndResetPlayerPosition();
    document.getElementById('playerScore').innerHTML = 'Score: ' + game.score;
    document.getElementById('playerLives').innerHTML = 'Lives: ' + game.hearts;
  }

  // check if player is touching anything (prize or bug)
  isTouching(spriteX, spriteY, padding) {
    return this.isBetween(this.x, spriteX - padding, spriteX + padding) &&
    this.isBetween(this.y, spriteY - padding, spriteY + padding);
  }

  // return true if n is between a and b; false otherwise
  isBetween(n, a, b) {
    return n>= a && n <=b;
  }

  // increase the level count and reset the player's position (x/y)
  increaseLevelAndResetPlayerPosition() {
    // increase the level and shuffle the prizes
    game.newLevel();
    this.x = 3 * cellWidth;
    this.y = 5 * cellHeight - this.heightAdj;
  }

  handleInput(direction) {
    if(locked)
      return;

    switch (direction) {
      case 'left':
        if(this.x >0) {
          this.x -= this.moveSizeX;
        }
        break;
      case 'right':
        if(this.x < ctx.canvas.width - this.moveSizeX) {
          this.x += this.moveSizeX;
        }
        break;
      case 'up':
        if(this.y>0) {
          this.y -= this.moveSizeY;
        }
        if(this.y < 63) {
          locked = true;
          // reset the player to the start point
          setTimeout(function(){
            player.increaseLevelAndResetPlayerPosition();
            locked = false;
          },1000);
        }
        break;
      case 'down':
        if(this.y<this.maxY) {
          this.y += this.moveSizeY;
        }
        break;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // return the coordinates of the cell based on current x and y;
  // for example, if x = 303 and y = 405, the cell position returned is {x: 3, y: 5}
  getCellPosition() {
    let col = Math.floor(this.x / cellWidth);
    let row = Math.floor(this.y / cellHeight) + 1;

    let cellPos = {
      x: col,
      y: row
    };
    return cellPos;
  }

}

/******************Create Constants**************************************/

let minSpeed = 100;
let maxSpeed = 300;
const increaseLevelSpeed = 20;

const start = -100;

const cellHeight = 83;
const cellWidth = 101;


// flag to lock the keyboard when player gets to the water to avoid increasing the level more than once
let locked = false;

const randomSpeed = function() {
  return Math.floor(Math.random()*(maxSpeed - minSpeed)) + minSpeed;
};

const randomPrize = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/******************Create HTML elements**************************************/
// create game title
const gameTitle = document.createElement('h1');
gameTitle.textContent = 'Arcade Game - FROGGER';
document.body.appendChild(gameTitle);

//create HTML elements for lives, score and level
const container = document.createElement('div');
document.body.appendChild(container);
container.classList.add('container');

for (var i=1; i<=3; i++) {
  const para = document.createElement('div');
  container.appendChild(para);

  switch (i) {
    case 1:
      para.textContent = "Lives:";
      para.setAttribute('id','playerLives');
      break;
    case 2:
      para.textContent = "Score:";
      para.setAttribute('id','playerScore');
      break;
    case 3:
      para.textContent = "Level:";
      para.setAttribute('id','playerLevel');
      break;
  }
}

/*************** OBJECT INSTANTIATE *************************************/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/*const enemy1 = new Enemy(start, 1 * cellHeight);
const enemy2 = new Enemy(start, 2 * cellHeight);
const enemy3 = new Enemy(start, 3 * cellHeight);
const allEnemies = [enemy1, enemy2, enemy3];*/

const characters= [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

function setPlayer(i) {
  return new Player(3 * cellWidth, 5 * cellHeight, characters[i]);
}

const allEnemies = [];

// set positions for all enemies
var enemyPositionY = cellHeight;       // y position for the first bug
for(var i= 1; i<=3; i++){ //i is the number of lines
    if (i % 2 === 0){
        for(var j = 1; j<=2; j++){ //j is the number of bugs for each line
            // sets the x position for one enemy at -100, another one at -200
            allEnemies.push(new Enemy(-100 * j, enemyPositionY));
        }
    }
    else {
        allEnemies.push(new Enemy(-100, enemyPositionY));
}
    enemyPositionY += cellHeight;
}
//Player instantiate
let player = setPlayer(2);

//Game instantiate
const game = new Game(3);
game.newLevel();

var sound = [];
sound.push(new Audio('audio/lives.wav'));
sound.push(new Audio('audio/gems.wav'));
sound.push(new Audio('audio/level.wav'));
sound.push(new Audio('audio/enemy.wav'));
sound.push(new Audio('audio/gameoverr.mp3'));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
