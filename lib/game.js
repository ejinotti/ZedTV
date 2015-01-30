(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Game = ZedTV.Game = function () {
    // this.addPlayer();
    this.player = new ZedTV.Player({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      game: this
    });
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 32;

  Game.prototype.allObjects = function () {
    return [this.player];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    // this.checkCollisions();
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

}());
