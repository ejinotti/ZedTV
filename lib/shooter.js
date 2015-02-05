(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Shooter = ZedTV.Shooter = function (options) {
    ZedTV.Mob.call(this, {
      color: Shooter.COLOR,
      radius: Shooter.RADIUS,
      pos: options.game.randBuffPos(Shooter.PLAYER_BUFFER, Shooter.WALL_BUFFER),
      game: options.game,
      hp: Shooter.BASE_HP,
      pointValue: Shooter.POINT_VALUE
    });

    this.framesTilTurn = 0;
    this.framesTilShoot = Shooter.SHOOT_FRAMES;
  };

  ZedTV.Util.inherits(Shooter, ZedTV.Mob);

  Shooter.RADIUS = 30;
  Shooter.COLOR = "blue";
  Shooter.BASE_HP = 12;
  Shooter.POINT_VALUE = 50;

  Shooter.SPEED = 1;
  Shooter.PLAYER_BUFFER = 400;
  Shooter.WALL_BUFFER = 100;
  Shooter.TURN_FRAMES = 30;
  Shooter.SHOOT_FRAMES = ZedTV.Game.FPS;

  Shooter.prototype.move = function () {
    if (--this.framesTilTurn <= 0) {
      var moveAngle = ZedTV.Util.getRandomAngle();
      this.vel = ZedTV.Util.getVelocity(Shooter.SPEED, moveAngle);
      this.framesTilTurn = Shooter.TURN_FRAMES;
    }

    if (--this.framesTilShoot <= 0) {
      var bullet = new ZedTV.ShooterBullet({
        pos: this.pos,
        angle: this.findAngleToPlayer(),
        game: this.game
      });
      this.game.add(bullet);
      this.framesTilShoot = Shooter.SHOOT_FRAMES;
    }

    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

}());
