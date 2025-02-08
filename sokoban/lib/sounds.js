const sounds = {
  new_level: new Audio("./assets/sounds/new_level.mp3"),
  move_click: new Audio("./assets/sounds/move_click.mp3"),
  gem_collected: new Audio("./assets/sounds/gem_collected.mp3"),
  win: new Audio("./assets/sounds/win.mp3"),
};

// Play sound dynamically
function playSound(type) {
  if (sounds[type]) {
      sounds[type].currentTime = 0; 
      sounds[type].play();
  }
}
