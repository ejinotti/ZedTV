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
      that.pollKeys(
        ["w", "d", "s", "a"],
        that.game.player.go,
        that.game.player.stop
      );
      that.pollKeys(
        ["i", "l", "k", "j"],
        that.game.player.setFiring,
        that.game.player.stopFiring
      );
      that.game.player.fire();
      that.game.step();
      that.game.draw(that.ctx);
    }, 1000 / ZedTV.Game.FPS);
  };

  // 4 keys to watch in clock format [ N, E, S, W ]
  // go => what to do when a good combo of keys is pressed
  // stop => what to do when not
  GameView.prototype.pollKeys = function (keys, doSomething, doNothing) {
    var moveCode = 0;
    if (key.isPressed(keys[0])) moveCode += 1000;
    if (key.isPressed(keys[1])) moveCode += 100;
    if (key.isPressed(keys[2])) moveCode += 10;
    if (key.isPressed(keys[3])) moveCode += 1;

    // console.log(moveCode);

    switch (moveCode) {
      case 1000:
        doSomething.call(this.game.player, ZedTV.Util.NORTH);
        break;
      case 100:
        doSomething.call(this.game.player, ZedTV.Util.EAST);
        break;
      case 10:
        doSomething.call(this.game.player, ZedTV.Util.SOUTH);
        break;
      case 1:
        doSomething.call(this.game.player, ZedTV.Util.WEST);
        break;
      case 1100:
        doSomething.call(this.game.player, ZedTV.Util.NORTHEAST);
        break;
      case 110:
        doSomething.call(this.game.player, ZedTV.Util.SOUTHEAST);
        break;
      case 11:
        doSomething.call(this.game.player, ZedTV.Util.SOUTHWEST);
        break;
      case 1001:
        doSomething.call(this.game.player, ZedTV.Util.NORTHWEST);
        break;
      default:
        doNothing.call(this.game.player);
    }
  };

}());
