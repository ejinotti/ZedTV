(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Util = ZedTV.Util = {};

  Util.inherits = function (child, parent) {
    var Dummy = function () {};
    Dummy.prototype = parent.prototype;
    child.prototype = new Dummy();
  };

  Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  Util.getSpeed = function (velocity) {
    return Util.dist([0, 0], velocity);
  };

  Util.getAngle = function (velocity) {
    return Math.atan2(velocity[1], velocity[0]);
  };

  Util.getVelocity = function (speed, angle) {
    var xVel = speed * Math.cos(angle);
    var yVel = speed * Math.sin(angle);
    return [xVel, yVel];
  };

}());
