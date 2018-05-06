"use strict"
var imageNames = ['Smart Boy','Cat Girl','Horn Girl','Pink Girl','Princess Girl'];
imageNames.forEach((name,index) => {
  const spanImg = document.createElement('span');
  document.getElementById(index).appendChild(spanImg);
  spanImg.classList.add('tooltipp');
  spanImg.textContent = name;
  document.getElementsByTagName("IMG")[index].setAttribute("data-toggle", "tooltip");
  document.getElementsByTagName("IMG")[index].setAttribute("title", name);
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
