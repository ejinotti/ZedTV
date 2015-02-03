(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var GameView = ZedTV.GameView = function (ctx) {
    this.ctx = ctx;
    this.paused = true;
    this.playerName = prompt("Please enter your name..") || "guest";
    this.playerName = this.playerName.substr(0, 20);
    this.fb = new Firebase(
      'https://zedtv.firebaseio.com/high-scores'
    );
    this.fb.on("value", this.buildHighScores.bind(this));
  };

  GameView.NUM_HIGHSCORES = 10;
  GameView.TIME_TIL_RESTART = 3000; // in milliseconds

  GameView.prototype.start = function () {
    this.ctx.clearRect(0, 0, ZedTV.Game.DIM_X, ZedTV.Game.DIM_Y);
    this.game = new ZedTV.Game();
    this.room = new ZedTV.Room(this.game);
    this.inputMgr = new ZedTV.InputManager(this.game);
    key("p", this.togglePause.bind(this));
    this.togglePause();
  };

  GameView.prototype.gameLoop = function () {
    this.inputMgr.handleInput();
    try {
      this.game.step();
    } catch (err) {
      if (typeof err === "string") {
        this.endGame();
        return;
      } else {
        throw err;
      }
    }
    this.game.draw(this.ctx);
  };

  GameView.prototype.togglePause = function () {
    if (this.paused) {
      this.gameLoopId = window.setInterval(
        this.gameLoop.bind(this),
        1000 / ZedTV.Game.FPS
      );
      this.room.resume();
      this.paused = false;
    } else {
      this.room.pause();
      window.clearInterval(this.gameLoopId);
      this.paused = true;
    }
  };

  GameView.prototype.endGame = function () {
    key.unbind("p");
    this.togglePause();
    this.room.clear();
    $("#score > strong").text("0");
    var yourScore = this.game.player.score;
    var congrats = null;

    this.fb.transaction(function (highScores) {

      console.log("checking HS..");
      console.log("this.playerName = " + this.playerName);
      console.log("yourScore = " + yourScore);

      if (!highScores) {
        congrats = "Congrats, " + this.playerName + ". Your score of: $";
        congrats += yourScore + " is #1 on the high scores!";

        highScores = [{name: this.playerName, score: yourScore}];

      } else if (highScores.length < GameView.NUM_HIGHSCORES ||
                 yourScore > highScores[highScores.length - 1].score) {

        for (var i = 0; i < highScores.length; i++) {
          if (highScores[i].score < yourScore) break;
        }

        highScores.splice(i, 0, {name: this.playerName, score: yourScore});
        highScores = highScores.slice(0, GameView.NUM_HIGHSCORES);

        congrats = "Congrats, " + this.playerName + ". Your score of: $";
        congrats += yourScore + " is #" + (i+1) + " on the high scores!";

      } else {
        congrats = "GG, " + this.playerName + ". Your score was: $";
        congrats += yourScore + ".";
      }

      return highScores;
    }.bind(this));

    congrats += " Restarting in " + (GameView.TIME_TIL_RESTART / 1000);
    congrats += " seconds..";

    var that = this;
    $("#end-game-msg").text(congrats).fadeIn(
      window.setTimeout.bind(null, function () {
        $("#end-game-msg").fadeOut();
        that.start();
      }, GameView.TIME_TIL_RESTART
    ));
  };

  GameView.prototype.buildHighScores = function (snap) {
    console.log("high-scores value trigger..");
    console.log(snap.val());

    var highScores = snap.val();
    if (!highScores) return;
    $("#high-scores").empty();

    highScores.forEach(function (highScore, i) {
      $("#high-scores").append($("<li>").text(
        "#" + (i + 1) + ". " + highScore.name + " $" + highScore.score
      ));
    });
  };

}());
