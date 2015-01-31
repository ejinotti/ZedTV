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
  };

  ZedTV.Util.inherits(Player, ZedTV.MovingObject);

  Player.RADIUS = 10;
  Player.COLOR = "blue";
  Player.SPEED = 5;
  Player.RATEOFFIRE = 10; // shots / sec.. max is FPS obviously.
  Player.SHOTDELAY = ZedTV.Game.FPS / Player.RATEOFFIRE;

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
  };

  Player.prototype.setFiring = function (angle) {
    this.firing = true;
    this.firingAngle = angle;
  };

  Player.prototype.stopFiring = function () {
    this.firing = false;
    this.framesTilFire = 1;
  };

}());
