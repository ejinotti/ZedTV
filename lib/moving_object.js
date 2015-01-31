(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var MovingObject = ZedTV.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(newPos)) return;
    this.pos = newPos;
  };

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var centerDist = ZedTV.Util.dist(this.pos, otherObj.pos);
    return centerDist < (this.radius + otherObj.radius);
  };

}());
