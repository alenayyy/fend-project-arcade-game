
const minSpeed= 100;
const maxSpeed = 300;
const start = -100;
const randomSpeed = function() {
  return Math.floor(Math.random()*(maxSpeed -minSpeed)) + minSpeed;
}

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
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
class Player {
  constructor(x,y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.moveSizeX = 101;
    this.moveSizeY = 83;
    this.maxY = 404;

  }

  update() {
    let padding = 30;
    allEnemies.forEach(enemy => {
      if(this.isTouching(this.x, this.y, enemy.x, enemy.y, padding)) {
        this.startOver();
      }
    });
  }

  startOver() {
    this.x = 202;
    this.y = this.maxY;

  }

  isTouching(playerX, playerY, enemyX, enemyY, padding) {
    return this.isBetween(playerX, enemyX - padding, enemyX + padding) &&
    this.isBetween(playerY, enemyY - padding, enemyY + padding);
  }

  isBetween(n, a, b) {
    return n>= a && n <=b;
  }

  handleInput(direction) {
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
        break;
      case 'down':
        if(this.y<this.maxY) {
          this.y += this.moveSizeY;

        }
        break;
    }
// if the player crossed already, display winning alert and reset the game
    if(this.y < 63) {

      swal({
        title: "Congratulations! You Won!",
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
            break
          default:
            swal("Goodbye!");
            this.startOver();
            
        }
      });
    }

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(start, 63);
const enemy2 = new Enemy(start, 145);
const enemy3 = new Enemy(start, 227);

const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player(202, 404);

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
