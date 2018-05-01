const wrapper = document.createElement('div');
document.body.appendChild(wrapper);
wrapper.setAttribute('id','wrapper');

// create Reset and Pause button HTML elements
function createButton(name) {
  const button = document.createElement('button');
  wrapper.appendChild(button);
  button.setAttribute('class','button');
  button.textContent = name;
  button.setAttribute('id',name);
}
createButton('Reset');
createButton('Pause');

// add event listener on div wrapper element
wrapper.addEventListener('click', respondToTheClick);
// variable array to keep the enemy's speed
var enemySpeeds = [];

function stopTheGame() {
  allEnemies.forEach((enemy, index) => {
  enemySpeeds[index] = enemy.speed;
  enemy.speed = 0;
})
};

function playTheGame() {
  allEnemies.forEach((enemy, index) => {
  enemy.speed = enemySpeeds[index];
})
};

// function to be executed when reset/ pause is clicked
function respondToTheClick(evt) {
//if the reset is clicked set the game from begining and give the enemy's bug the speed for level one
  if (evt.target.nodeName === 'BUTTON' && evt.target.innerText === "Reset") {  // ← verifies target is desired element
      document.getElementById('Pause').innerText = "Pause";
      player.startOver();
      allEnemies.forEach(enemy => {
        enemy.speed = randomSpeed();
      })
  }
  //if the pause button is clicked, set the enemys' speed to zero
  else if(evt.target.nodeName === 'BUTTON' && evt.target.innerText === "Pause") {
    stopTheGame();
    evt.target.innerText = "Continue";
  }
  /*if the pause button is clicked second time, set the enemys' speed to the value they had
  when the button pause was clicked first time*/
  else if(evt.target.nodeName === 'BUTTON' && evt.target.innerText === "Continue") {
    playTheGame();
    evt.target.innerText = "Pause";
  }
}
