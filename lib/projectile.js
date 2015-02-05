(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Projectile = ZedTV.Projectile = function (options) {
    ZedTV.MovingObject.call(this, {
      color: options.color,
      radius: options.radius,
      pos: options.pos,
      vel: options.vel,
      game: options.game
    });
  };

  ZedTV.Util.inherits(Projectile, ZedTV.MovingObject);

  Projectile.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(newPos)) {
      this.game.remove(this);
      return;
    }
    this.pos = newPos;
  };

}());
