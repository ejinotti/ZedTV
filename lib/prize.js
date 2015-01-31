(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var Prize = ZedTV.Prize = function(options) {
    ZedTV.MovingObject.call(this, {
      radius: Prize.RADIUS,
      pos: options.pos,
      game: options.game
    });
    this.ttl = Prize.DURATION * ZedTV.Game.FPS;
    this.generateValue();
  };

  ZedTV.Util.inherits(Prize, ZedTV.MovingObject);

  Prize.RADIUS = 20;
  Prize.DURATION = 10; // in seconds.
  Prize.WALL_BUFFER = 100;
  Prize.PLAYER_BUFFER = 200;
  Prize.GRAB_SOUND = new Audio("sound/grabprize.mp3");

  Prize.prototype.generateValue = function () {
    var rand = Math.random();
    this.image = new Image();

    if (rand < 0.5) {
      this.value = 10;
      this.image.src = "gfx/cash.png";
    } else if (rand < 0.7) {
      this.value = 20;
      this.image.src = "gfx/prize1.png";
    } else if (rand < 0.9) {
      this.value = 20;
      this.image.src = "gfx/prize2.png";
    } else {
      this.value = 50;
      this.image.src = "gfx/potofgold.png";
    }
  };

  Prize.prototype.move = function () {
    if (--this.ttl < 0) {
      this.game.remove(this);
    } else if (this.ttl < 30) {
      this.alpha = 0.5;
    } else if (this.ttl < 90) {
      this.alpha = 0.75;
    }
  };

  Prize.prototype.getGrabbed = function () {
    Prize.GRAB_SOUND.play();
    this.game.remove(this);
  };

}());
