(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  // a Room is just a bunch of mob spawn timers
  var Room = ZedTV.Room = function (game) {
    this.game = game;
  };

  Room.GRUNTS_PER_SPAWN = 5;
  Room.GRUNT_SPAWN_FREQ = 5000; // in milliseconds
  Room.PRIZES_PER_SPAWN = 10;
  Room.PRIZE_SPAWN_FREQ = 8000;
  Room.INTRO_SOUND = new Audio("sound/tf_goodluck.mp3");
  Room.INTRO_SOUND.volume = 0.5;

  Room.prototype.start = function () {
    Room.INTRO_SOUND.play();
    this.timers = [];

    this.timers.push(new ZedTV.Util.PausableInterval(
      this.spawnGrunts.bind(this),
      Room.GRUNT_SPAWN_FREQ
    ));

    this.timers.push(new ZedTV.Util.PausableInterval(
      this.spawnPrizes.bind(this),
      Room.PRIZE_SPAWN_FREQ
    ));
  };

  Room.prototype.spawnGrunts = function () {
    for (var i = 0; i < Room.GRUNTS_PER_SPAWN; i++) {
      var grunt = new ZedTV.Grunt({
        pos: this.game.randBuffPos(ZedTV.Grunt.PLAYER_BUFFER, 0),
        game: this.game
      });
      this.game.add(grunt);
    }
  };

  Room.prototype.spawnPrizes = function () {
    var playerBuff = ZedTV.Prize.PLAYER_BUFFER;
    var wallBuff = ZedTV.Prize.WALL_BUFFER;

    var startPt = this.game.randBuffPos(playerBuff, wallBuff);
    this.game.add(new ZedTV.Prize({
      pos: startPt,
      game: this.game
    }));

    for (var i = 1; i < Room.PRIZES_PER_SPAWN; i++) {
      var dx = (wallBuff * 2 * Math.random()) - wallBuff;
      var dy = (wallBuff * 2 * Math.random()) - wallBuff;
      this.game.add(new ZedTV.Prize({
        pos: [startPt[0] + dx, startPt[1] + dy],
        game: this.game
      }));
    }
  };

  Room.prototype.resume = function () {
    if (this.timers) {
      this.timers.forEach(function (timer) { timer.resume(); });
    } else {
      this.start();
    }
  };

  Room.prototype.pause = function () {
    this.timers.forEach(function (timer) { timer.pause(); });
  };

  Room.prototype.clear = function () {
    this.timers.forEach(function (timer) { timer.clear(); });
  };

}());
