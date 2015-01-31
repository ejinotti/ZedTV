(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Mob = ZedTV.Mob = function (options) {
    ZedTV.MovingObject.call(this, {
      color: Mob.COLOR,
      radius: Mob.RADIUS,
      pos: options.pos,
      vel: [0,0],
      game: options.game
    });
  };

  ZedTV.Util.inherits(Mob, ZedTV.MovingObject);

  Mob.RADIUS = 10;
  Mob.COLOR = "red";
  Mob.SPEED = 3;

  Mob.prototype.move = function () {
    this.vel = ZedTV.Util.getVelocity(Mob.SPEED, this.findAngleToPlayer());
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

  Mob.prototype.findAngleToPlayer = function () {
    return ZedTV.Util.getAngle([
      this.game.player.pos[0] - this.pos[0],
      this.game.player.pos[1] - this.pos[1]
    ]);
  };

}());
