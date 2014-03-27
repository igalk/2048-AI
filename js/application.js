animationDelay = 100;
minSearchTime = 1000;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var manager = new GameManager(KeyboardInputManager, HTMLActuator);
});
