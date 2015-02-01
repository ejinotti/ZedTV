(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Projectile = ZedTV.Projectile = function (options) {
    ZedTV.MovingObject.call(this, {
      // color: Projectile.COLOR,
      radius: Projectile.RADIUS,
      pos: options.pos,
      vel: ZedTV.Util.getVelocity(Projectile.SPEED, options.angle),
      game: options.game
    });
    this.damageVal = Projectile.DAMAGE;
    this.image = new Image();
    this.image.src = "gfx/quarter.png";
  };

  ZedTV.Util.inherits(Projectile, ZedTV.MovingObject);

  // Projectile.COLOR = "gray";
  Projectile.RADIUS = 15;
  Projectile.SPEED = 15;
  Projectile.DAMAGE = 1;
  Projectile.SOUNDS_CRIT = [
    new Audio("sound/crit_hit.mp3"),
    new Audio("sound/crit_hit2.mp3"),
    new Audio("sound/crit_hit3.mp3")
  ];

  Projectile.SOUNDS_CRIT.forEach(function (sound) {
    sound.volume = 0.5;
  });

  Projectile.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(newPos)) {
      this.game.remove(this);
      return;
    }
    this.pos = newPos;
  };

  Projectile.prototype.explode = function () {
    var crit = false;
    if (Math.random() < ZedTV.Player.CRIT_CHANCE) {
      crit = true;
      this.damageVal = 4;
      this.playCritSound();
    }
    var explosion = new ZedTV.Explosion({
      pos: this.pos, game: this.game, crit: crit
    });
    this.game.add(explosion);
    this.game.remove(this);
  };

  Projectile.prototype.playCritSound = function () {
    var rand = Math.random();

    if (rand < 0.4) {
      Projectile.SOUNDS_CRIT[0].play();
    } else if (rand < 0.8) {
      Projectile.SOUNDS_CRIT[1].play();
    } else {
      Projectile.SOUNDS_CRIT[2].play();
    }
  };

}());
