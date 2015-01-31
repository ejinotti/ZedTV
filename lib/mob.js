(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Mob = ZedTV.Mob = function (options) {
    ZedTV.MovingObject.call(this, {
      color: Mob.COLOR,
      radius: Mob.RADIUS,
      pos: options.pos,
      // vel: [0,0],
      game: options.game
    });

    this.framesToJitter = 0;
    this.hp = Mob.BASE_HP;
  };

  ZedTV.Util.inherits(Mob, ZedTV.MovingObject);

  Mob.RADIUS = 10;
  Mob.COLOR = "red";
  Mob.SPEED = 3;
  Mob.JITTERCHANCE = 0.1;
  Mob.JITTERFRAMES = 5;
  Mob.BASE_HP = 4;
  Mob.PLAYER_BUFFER = 60;

  Mob.prototype.move = function () {
    if (--this.framesToJitter <= 0) {
      this.vel = ZedTV.Util.getVelocity(Mob.SPEED, this.findAngleToPlayer());
    }
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

  Mob.prototype.takeDamage = function (damageVal) {
    this.hp -= damageVal;
    if (this.hp <= 0) this.game.remove(this);
  };

  Mob.prototype.findAngleToPlayer = function () {

    var angleToPlayer = ZedTV.Util.getAngle([
      this.game.player.pos[0] - this.pos[0],
      this.game.player.pos[1] - this.pos[1]
    ]);

    if (Math.random() <= Mob.JITTERCHANCE) {
      angleToPlayer += (Math.random() * Math.PI) - (Math.PI / 2);
      if (angleToPlayer > Math.PI) {
        angleToPlayer -= 2 * Math.PI;
      } else if (angleToPlayer < -Math.PI) {
        angleToPlayer += 2 * Math.PI;
      }
      this.framesToJitter = Mob.JITTERFRAMES;
    }

    return angleToPlayer;
  };

}());
