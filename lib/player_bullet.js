(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var PlayerBullet = ZedTV.PlayerBullet = function (options) {
    ZedTV.Projectile.call(this, {
      radius: PlayerBullet.RADIUS,
      pos: options.pos,
      vel: ZedTV.Util.getVelocity(PlayerBullet.SPEED, options.angle),
      game: options.game
    });
    this.enemy = false;
    this.damageVal = PlayerBullet.DAMAGE;
    this.image = new Image();
    this.image.src = "gfx/quarter.png";
  };

  ZedTV.Util.inherits(PlayerBullet, ZedTV.Projectile);

  PlayerBullet.RADIUS = 15;
  PlayerBullet.SPEED = 15;
  PlayerBullet.DAMAGE = 1;
  PlayerBullet.DAMAGE_CRIT = 4;
  PlayerBullet.SOUNDS_CRIT = [
    new Audio("sound/crit_hit.mp3"),
    new Audio("sound/crit_hit2.mp3"),
    new Audio("sound/crit_hit3.mp3")
  ];

  PlayerBullet.SOUNDS_CRIT.forEach(function (sound) {
    sound.volume = 0.5;
  });

  PlayerBullet.prototype.explode = function () {
    var crit = false;
    if (Math.random() < ZedTV.Player.CRIT_CHANCE) {
      crit = true;
      this.damageVal = PlayerBullet.DAMAGE_CRIT;
      this.playCritSound();
    }
    var explosion = new ZedTV.Explosion({
      pos: this.pos, game: this.game, crit: crit
    });
    this.game.add(explosion);
    this.game.remove(this);
  };

  PlayerBullet.prototype.playCritSound = function () {
    var rand = Math.random();

    if (rand < 0.4) {
      PlayerBullet.SOUNDS_CRIT[0].play();
    } else if (rand < 0.8) {
      PlayerBullet.SOUNDS_CRIT[1].play();
    } else {
      PlayerBullet.SOUNDS_CRIT[2].play();
    }
  };

}());
