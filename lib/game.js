(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Game = ZedTV.Game = function () {
    this.playerProjectiles = [];
    this.player = new ZedTV.Player({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      game: this
    });
    this.mobs = [];
    var mob = new ZedTV.Mob({
      pos: [1,1],
      game: this
    });
    this.mobs.push(mob);
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 30;
  Game.PLAYER_BUFFER = 30;

  Game.prototype.add = function (obj) {
    if (obj instanceof ZedTV.Projectile) {
      this.playerProjectiles.push(obj);
    } else if (obj instanceof ZedTV.Mob) {
      this.mobs.push(obj);
    } else {
      throw "bad boys bad boys, whatcha gonna do..";
    }
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof ZedTV.Projectile) {
      this.playerProjectiles.splice(this.playerProjectiles.indexOf(obj), 1);
    } else if (obj instanceof ZedTV.Mob) {
      this.mobs.splice(this.mobs.indexOf(obj), 1);
    } else {
      throw "bad boys bad boys, whatcha gonna do..";
    }
  };

  Game.prototype.allObjects = function () {
    return this.playerProjectiles.concat(this.player).concat(this.mobs);
  };

  Game.prototype.checkCollisions = function () {
    var that = this;

    this.mobs.forEach(function (mob) {
      if (mob.isCollidedWith(that.player)) {
        alert("gg");
        window.location.reload();
        return;
      }
      that.playerProjectiles.forEach(function (projectile) {
        if (mob.isCollidedWith(projectile)) {
          that.remove(mob);
          that.remove(projectile);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) { obj.move(); });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.randomPosition = function () {
    return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
  };

  Game.prototype.randomMobPosition = function () {
    var mobPos = this.randomPosition();

    while (ZedTV.Util.dist(mobPos, this.player.pos) <= Game.PLAYER_BUFFER) {
      mobPos = this.randomPosition();
    }

    return mobPos;
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

}());
