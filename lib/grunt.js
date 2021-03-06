(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Grunt = ZedTV.Grunt = function (options) {
    ZedTV.Mob.call(this, {
      color: Grunt.COLOR,
      radius: Grunt.RADIUS,
      pos: options.game.randBuffPos(Grunt.PLAYER_BUFFER, 0),
      game: options.game,
      hp: Grunt.BASE_HP,
      pointValue: Grunt.POINT_VALUE
    });

    this.framesToJitter = 0;
    this.speed = Grunt.SPEED;
  };

  ZedTV.Util.inherits(Grunt, ZedTV.Mob);

  Grunt.RADIUS = 20;
  Grunt.COLOR = "red";
  Grunt.BASE_HP = 4;
  Grunt.POINT_VALUE = 10;

  Grunt.SPEED = 2;
  Grunt.JITTERCHANCE = 0.1;
  Grunt.JITTERFRAMES = 10;
  Grunt.PLAYER_BUFFER = 300;

  Grunt.prototype.move = function () {
    if (--this.framesToJitter <= 0) {
      var angleToPlayer = this.findAngleToPlayer();

      if (Math.random() <= Grunt.JITTERCHANCE) {
        angleToPlayer += (Math.random() * Math.PI) - (Math.PI / 2);
        if (angleToPlayer > Math.PI) {
          angleToPlayer -= 2 * Math.PI;
        } else if (angleToPlayer < -Math.PI) {
          angleToPlayer += 2 * Math.PI;
        }
        this.framesToJitter = Grunt.JITTERFRAMES;
      }
      this.vel = ZedTV.Util.getVelocity(this.speed, angleToPlayer);
    }
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

}());
