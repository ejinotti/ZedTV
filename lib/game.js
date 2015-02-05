(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Game = ZedTV.Game = function () {
    this.playerProjectiles = [];
    this.mobProjectiles = [];
    this.player = new ZedTV.Player({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      game: this
    });
    this.mobs = [];
    var grunt = new ZedTV.Grunt({
      pos: [1,1],
      game: this
    });
    this.mobs.push(grunt);
    this.cosmetics = [];
    this.prizes = [];
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.add = function (obj) {
    if (obj instanceof ZedTV.Projectile) {
      if (obj.enemy) {
        this.mobProjectiles.push(obj);
      } else {
        this.playerProjectiles.push(obj);
      }
    } else if (obj instanceof ZedTV.Mob) {
      this.mobs.push(obj);
    } else if (obj instanceof ZedTV.Explosion) {
      this.cosmetics.push(obj);
    } else if (obj instanceof ZedTV.Prize) {
      this.prizes.push(obj);
    } else if (obj instanceof ZedTV.PrizeReward) {
      this.cosmetics.push(obj);
    } else {
      throw "bad boys bad boys, whatcha gonna do..";
    }
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof ZedTV.Projectile) {
      if (obj.enemy) {
        this.mobProjectiles.splice(this.mobProjectiles.indexOf(obj), 1);
      } else {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(obj), 1);
      }
    } else if (obj instanceof ZedTV.Mob) {
      this.mobs.splice(this.mobs.indexOf(obj), 1);
    } else if (obj instanceof ZedTV.Explosion) {
      this.cosmetics.splice(this.cosmetics.indexOf(obj), 1);
    } else if (obj instanceof ZedTV.Prize) {
      this.prizes.splice(this.prizes.indexOf(obj), 1);
    } else if (obj instanceof ZedTV.PrizeReward) {
      this.cosmetics.splice(this.cosmetics.indexOf(obj), 1);
    } else {
      throw "bad boys bad boys, whatcha gonna do..";
    }
  };

  // important note:
  // this ordering determines the draw ordering..
  // i.e. z-index
  Game.prototype.allObjects = function () {
    return this.prizes
      .concat(this.playerProjectiles)
      .concat(this.mobs)
      .concat(this.cosmetics)
      .concat(this.mobProjectiles)
      .concat(this.player);
  };

  Game.prototype.checkCollisions = function () {
    var that = this;

    this.mobs.forEach(function (mob) {
      if (mob.isCollidedWith(that.player)) throw("gg");
      that.playerProjectiles.forEach(function (projectile) {
        if (mob.isCollidedWith(projectile)) {
          projectile.explode();
          mob.takeDamage(projectile.damageVal);
        }
      });
    });

    this.mobProjectiles.forEach(function (projectile) {
      if (projectile.isCollidedWith(that.player)) throw("gg");
    });

    this.prizes.forEach(function (prize) {
      if (prize.isCollidedWith(that.player)) that.player.grabPrize(prize);
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

  // get rand pos at least buffer away from any wall.
  Game.prototype.randPos = function (xRange, yRange, buffer) {
    return [
      ((xRange - (buffer * 2)) * Math.random()) + buffer,
      ((yRange - (buffer * 2)) * Math.random()) + buffer,
    ];
  };

  // get rand pos at least:
  //   wallBuff away from any wall.
  //   AND
  //   playerBuff away from the player.
  Game.prototype.randBuffPos = function (playerBuff, wallBuff) {
    var mobPos = this.randPos(Game.DIM_X, Game.DIM_Y, wallBuff);

    while (ZedTV.Util.dist(mobPos, this.player.pos) <= playerBuff) {
      mobPos = this.randPos(Game.DIM_X, Game.DIM_Y, wallBuff);
    }

    return mobPos;
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

}());
