(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var InputManager = ZedTV.InputManager = function (game) {
    this.game = game;
  };

  InputManager.prototype.handleInput = function () {
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
  };

  // 4 keys to watch in clockwise format [ N, E, S, W ]
  // goodFn => player fn to call when good combo of keys is pressed
  // badFn => player fn to call when not, ie no keys or too many keys.
  InputManager.prototype.pollKeys = function (keys, goodFn, badFn) {
    var directionCode = 0;
    if (key.isPressed(keys[0])) directionCode += 1000;
    if (key.isPressed(keys[1])) directionCode += 100;
    if (key.isPressed(keys[2])) directionCode += 10;
    if (key.isPressed(keys[3])) directionCode += 1;

    switch (directionCode) {
      case 1000:
        goodFn.call(this.game.player, ZedTV.Util.NORTH);
        break;
      case 100:
        goodFn.call(this.game.player, ZedTV.Util.EAST);
        break;
      case 10:
        goodFn.call(this.game.player, ZedTV.Util.SOUTH);
        break;
      case 1:
        goodFn.call(this.game.player, ZedTV.Util.WEST);
        break;
      case 1100:
        goodFn.call(this.game.player, ZedTV.Util.NORTHEAST);
        break;
      case 110:
        goodFn.call(this.game.player, ZedTV.Util.SOUTHEAST);
        break;
      case 11:
        goodFn.call(this.game.player, ZedTV.Util.SOUTHWEST);
        break;
      case 1001:
        goodFn.call(this.game.player, ZedTV.Util.NORTHWEST);
        break;
      default:
        badFn.call(this.game.player);
    }
  };

}());
