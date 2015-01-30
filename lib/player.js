(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Player = ZedTV.Player = function (options) {
    ZedTV.MovingObject.call(this, {
      color: Player.COLOR,
      radius: Player.RADIUS,
      pos: options.pos,
      vel: [0,0],
      game: options.game
    });
  };

  ZedTV.Util.inherits(Player, ZedTV.MovingObject);

  Player.RADIUS = 10;
  Player.COLOR = "blue";
  Player.SPEED = 5;

  Player.prototype.go = function (angle) {
    this.vel = ZedTV.Util.getVelocity(Player.SPEED, angle);
  };

  Player.prototype.stop = function () {
    this.vel = [0,0];
  };

}());
