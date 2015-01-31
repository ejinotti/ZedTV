(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Explosion = ZedTV.Explosion = function (options) {
    ZedTV.MovingObject.call(this, {
      color: Explosion.COLOR1,
      radius: Explosion.RADIUS,
      pos: options.pos,
      vel: [0,0],
      game: options.game
    });
    this.framesToLive = Explosion.FRAMES_TO_LIVE;
  };

  ZedTV.Util.inherits(Explosion, ZedTV.MovingObject);

  Explosion.COLOR1 = "yellow";
  Explosion.COLOR2 = "orange";
  Explosion.RADIUS = 6;
  Explosion.FRAMES_TO_LIVE = 5;

  Explosion.prototype.move = function () {
    if (--this.framesToLive <= 0) {
      this.game.remove(this);
    } else {
      this.color = (this.framesToLive % 2 === 0) ?
        Explosion.COLOR2 : Explosion.COLOR1;
    }
  };

}());
