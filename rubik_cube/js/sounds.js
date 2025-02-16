const sounds = {
  start_game: new Audio("./sounds/start_game.mp3"),
  move_click: new Audio("./sounds/move_click.mp3"),
  win: new Audio("./sounds/win.mp3"),
};

// Play sound dynamically
function playSound(type) {
  if (sounds[type]) {
      sounds[type].currentTime = 0; 
      sounds[type].play();
  }
}
