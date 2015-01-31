(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  // a Room is just a bunch of mob spawn timers
  var Room = ZedTV.Room = function (game) {
    this.game = game;
  };

  Room.MOBS_PER_SPAWN = 5;
  Room.SPAWN_FREQ = 5000; // in milliseconds
  Room.INTRO_SOUND = new Audio("sound/tf_goodluck.mp3");

  Room.prototype.start = function () {
    Room.INTRO_SOUND.play();
    this.timer = new ZedTV.Util.PausableInterval(
      this.spawnMobs.bind(this),
      Room.SPAWN_FREQ
    );
  };

  Room.prototype.spawnMobs = function () {
    for (var i = 0; i < Room.MOBS_PER_SPAWN; i++) {
      var mob = new ZedTV.Mob({
        pos: this.game.randomMobPosition(),
        game: this.game
      });
      this.game.add(mob);
    }
  };

  Room.prototype.resume = function () {
    if (this.timer) {
      this.timer.resume();
    } else {
      this.start();
    }
  };

  Room.prototype.pause = function () {
    this.timer.pause();
  };

}());
