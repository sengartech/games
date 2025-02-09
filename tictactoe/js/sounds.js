const sounds = {
  new_level: new Audio("./sounds/new_level.mp3"),
  move_click: new Audio("./sounds/move_click.mp3"),
  win: new Audio("./sounds/win.mp3"),
  draw: new Audio("./sounds/draw.mp3"),
};

// Play sound dynamically
function playSound(type) {
  if (sounds[type]) {
      sounds[type].currentTime = 0; 
      sounds[type].play();
  }
}
