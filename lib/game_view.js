(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var GameView = ZedTV.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.paused = false;
  };

  GameView.prototype.start = function () {
    var that = this;

    this.gameLoopId = window.setInterval(
      this.gameLoop.bind(this),
      1000 / ZedTV.Game.FPS
    );

    key("p", function () {
      if (that.paused) {
        that.gameLoopId = window.setInterval(
          that.gameLoop.bind(that),
          1000 / ZedTV.Game.FPS
        );
        that.paused = false;
      } else {
        window.clearInterval(that.gameLoopId);
        that.paused = true; 
      }
    });
  };

  GameView.prototype.gameLoop = function () {
    this.pollKeys(
      ["w", "d", "s", "a"],
      this.game.player.go,
      this.game.player.stop
    );
    this.pollKeys(
      ["i", "l", "k", "j"],
      this.game.player.setFiring,
      this.game.player.stopFiring
    );
    this.game.player.fire();
    this.game.step();
    this.game.draw(this.ctx);
  };

  // 4 keys to watch in clockwise format [ N, E, S, W ]
  // goodKeysFn => what to do when a good combo of keys is pressed
  // badKeysFn => what to do when not
  GameView.prototype.pollKeys = function (keys, goodKeysFn, badKeysFn) {
    var moveCode = 0;
    if (key.isPressed(keys[0])) moveCode += 1000;
    if (key.isPressed(keys[1])) moveCode += 100;
    if (key.isPressed(keys[2])) moveCode += 10;
    if (key.isPressed(keys[3])) moveCode += 1;

    switch (moveCode) {
      case 1000:
        goodKeysFn.call(this.game.player, ZedTV.Util.NORTH);
        break;
      case 100:
        goodKeysFn.call(this.game.player, ZedTV.Util.EAST);
        break;
      case 10:
        goodKeysFn.call(this.game.player, ZedTV.Util.SOUTH);
        break;
      case 1:
        goodKeysFn.call(this.game.player, ZedTV.Util.WEST);
        break;
      case 1100:
        goodKeysFn.call(this.game.player, ZedTV.Util.NORTHEAST);
        break;
      case 110:
        goodKeysFn.call(this.game.player, ZedTV.Util.SOUTHEAST);
        break;
      case 11:
        goodKeysFn.call(this.game.player, ZedTV.Util.SOUTHWEST);
        break;
      case 1001:
        goodKeysFn.call(this.game.player, ZedTV.Util.NORTHWEST);
        break;
      default:
        badKeysFn.call(this.game.player);
    }
  };

}());
