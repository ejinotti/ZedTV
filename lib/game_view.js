(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var GameView = ZedTV.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new ZedTV.Game();
    this.inputMgr = new ZedTV.InputManager(this.game);
    this.paused = true;
  };

  GameView.prototype.start = function () {
    this.togglePause();
    key("p", this.togglePause.bind(this));
  };

  GameView.prototype.gameLoop = function () {
    this.inputMgr.handleInput();
    this.game.step();
    this.game.draw(this.ctx);
  };

  GameView.prototype.togglePause = function () {
    if (this.paused) {
      this.gameLoopId = window.setInterval(
        this.gameLoop.bind(this),
        1000 / ZedTV.Game.FPS
      );
      this.paused = false;
    } else {
      window.clearInterval(this.gameLoopId);
      this.paused = true;
    }
  };

}());
