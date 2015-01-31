(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Projectile = ZedTV.Projectile = function (options) {
    ZedTV.MovingObject.call(this, {
      color: Projectile.COLOR,
      radius: Projectile.RADIUS,
      pos: options.pos,
      vel: ZedTV.Util.getVelocity(Projectile.SPEED, options.angle),
      game: options.game
    });
    this.damageVal = Projectile.DAMAGE;
  };

  ZedTV.Util.inherits(Projectile, ZedTV.MovingObject);

  Projectile.COLOR = "gray";
  Projectile.RADIUS = 4;
  Projectile.SPEED = 15;
  Projectile.DAMAGE = 1;

  Projectile.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(newPos)) {
      this.game.remove(this);
      return;
    }
    this.pos = newPos;
  };

  Projectile.prototype.explode = function () {
    var explosion = new ZedTV.Explosion({ pos: this.pos, game: this.game });
    this.game.add(explosion);
    this.game.remove(this);
  };

}());
