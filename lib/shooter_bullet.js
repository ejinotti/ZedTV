(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var ShooterBullet = ZedTV.ShooterBullet = function (options) {
    ZedTV.Projectile.call(this, {
      color: ShooterBullet.COLOR,
      radius: ShooterBullet.RADIUS,
      pos: options.pos,
      vel: ZedTV.Util.getVelocity(ShooterBullet.SPEED, options.angle),
      game: options.game
    });
    this.enemy = true;
  };

  ZedTV.Util.inherits(ShooterBullet, ZedTV.Projectile);

  ShooterBullet.COLOR = "gray";
  ShooterBullet.RADIUS = 8;
  ShooterBullet.SPEED = 8;

}());
