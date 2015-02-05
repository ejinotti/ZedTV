(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Mob = ZedTV.Mob = function (options) {
    ZedTV.MovingObject.call(this, {
      color: options.color,
      radius: options.radius,
      pos: options.pos,
      game: options.game
    });

    this.hp = options.hp;
    this.pointValue = options.pointValue;
  };

  ZedTV.Util.inherits(Mob, ZedTV.MovingObject);

  Mob.prototype.takeDamage = function (damageVal) {
    this.hp -= damageVal;
    if (this.hp <= 0) {
      this.game.remove(this);
      this.game.player.score += this.pointValue;
      $("#score > strong").text(this.game.player.score);
    }
  };

  Mob.prototype.findAngleToPlayer = function () {
    return ZedTV.Util.getAngle([
      this.game.player.pos[0] - this.pos[0],
      this.game.player.pos[1] - this.pos[1]
    ]);
  };

}());
