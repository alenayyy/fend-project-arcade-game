//create HTML elements : paragraph, div, images
const chooseCharacter = document.createElement('p');
chooseCharacter.textContent = "Choose the character:";
document.body.appendChild(chooseCharacter);

const divImg = document.createElement('div');
divImg.setAttribute('id', 'divImg');
document.body.appendChild(divImg);

//variable array for displayed images
const smallCharacters = ['images/char-boy4.png',
'images/char-cat-girl3.png',
'images/char-horn-girl3.png',
'images/char-pink-girl3.png',
'images/char-princess-girl3.png'];

//created HTML image elements
for(var i=0; i<=4; i++) {
  const imgCharacter= document.createElement('img');
  imgCharacter.setAttribute('class', 'image');
  imgCharacter.setAttribute('id', i);
  divImg.appendChild(imgCharacter);
  imgCharacter.setAttribute('src', smallCharacters[i]);
}

//add event listerner on the div that contain images
divImg.addEventListener('click', giveCharacter);

//function that change/give the character/player
function giveCharacter(evt) {
  if (evt.target.nodeName === 'IMG') { // ← verifies target is desired element
  player = setPlayer(evt.target.id);
}
}
