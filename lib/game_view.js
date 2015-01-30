(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var GameView = ZedTV.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var that = this;

    // window.setInterval(this.pollKeys.bind(this), 1000 / (ZedTV.Game.FPS * 2));
    window.setInterval(function () {
      that.pollKeys();
      that.game.step();
      that.game.draw(that.ctx);
    }, 1000 / ZedTV.Game.FPS);
  };

  GameView.prototype.pollKeys = function () {
    var moveCode = 0;
    if (key.isPressed("w")) moveCode += 1000;
    if (key.isPressed("d")) moveCode += 100;
    if (key.isPressed("s")) moveCode += 10;
    if (key.isPressed("a")) moveCode += 1;

    switch (moveCode) {
      case 1000:
        this.game.player.go(ZedTV.Util.NORTH);
        break;
      case 100:
        this.game.player.go(ZedTV.Util.EAST);
        break;
      case 10:
        this.game.player.go(ZedTV.Util.SOUTH);
        break;
      case 1:
        this.game.player.go(ZedTV.Util.WEST);
        break;
      case 1100:
        this.game.player.go(ZedTV.Util.NORTHEAST);
        break;
      case 110:
        this.game.player.go(ZedTV.Util.SOUTHEAST);
        break;
      case 11:
        this.game.player.go(ZedTV.Util.SOUTHWEST);
        break;
      case 1001:
        this.game.player.go(ZedTV.Util.NORTHWEST);
        break;
      default:
        this.game.player.stop();
    }
  };

}());
