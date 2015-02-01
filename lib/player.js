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
    this.firing = false;
    this.framesTilFire = 1;
    this.image = new Image();
    this.image.src = "gfx/diddley.png";
    this.score = 0;
  };

  ZedTV.Util.inherits(Player, ZedTV.MovingObject);

  Player.RADIUS = 20;
  Player.COLOR = "blue";
  Player.SPEED = 5;
  Player.RATEOFFIRE = 10; // shots per sec.. max is FPS obviously.
  Player.SHOTDELAY = ZedTV.Game.FPS / Player.RATEOFFIRE;
  Player.CRIT_CHANCE = 0.2;
  Player.SOUND_FIRING = new Audio("sound/coin.mp3");

  Player.prototype.go = function (angle) {
    this.vel = ZedTV.Util.getVelocity(Player.SPEED, angle);
  };

  Player.prototype.stop = function () {
    this.vel = [0,0];
  };

  Player.prototype.fire = function (angle) {
    if (!this.firing) return;

    if (--this.framesTilFire <= 0) {
      var projectile = new ZedTV.Projectile({
        pos: this.pos,
        angle: this.firingAngle,
        game: this.game
      });
      this.game.add(projectile);
      this.framesTilFire = Player.SHOTDELAY;
    }

    // no need to do any kind of frame delay..
    // if sound is already playing, play() will do nothing.
    Player.SOUND_FIRING.play();
  };

  Player.prototype.setFiring = function (angle) {
    this.firing = true;
    this.firingAngle = angle;
  };

  Player.prototype.stopFiring = function () {
    this.firing = false;
    this.framesTilFire = 1;
  };

  Player.prototype.grabPrize = function (prize) {
    this.score += prize.value;
    $("#score > strong").text(this.score);
    prize.getGrabbed();
  };

}());
