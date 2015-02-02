(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var GameView = ZedTV.GameView = function (ctx) {
    this.ctx = ctx;
    // this.game = new ZedTV.Game();
    // this.room = new ZedTV.Room(this.game);
    // this.inputMgr = new ZedTV.InputManager(this.game);
    this.paused = true;
    this.playerName = prompt("Please enter your name..") || "guest";
    // debugger;
    this.fb = new Firebase(
      'https://zedtv.firebaseio.com/high-scores'
    );
    this.fb.on("value", this.buildHighScores.bind(this));
    key("p", this.togglePause.bind(this));
  };

  GameView.NUM_HIGHSCORES = 10;

  GameView.prototype.start = function () {
    this.ctx.clearRect(0, 0, ZedTV.Game.DIM_X, ZedTV.Game.DIM_Y);
    this.game = new ZedTV.Game();
    this.room = new ZedTV.Room(this.game);
    this.inputMgr = new ZedTV.InputManager(this.game);
    this.togglePause();
    // key("p", this.togglePause.bind(this));
  };

  GameView.prototype.gameLoop = function () {
    this.inputMgr.handleInput();
    try {
      this.game.step();
    } catch (err) {
      if (typeof err === "string") {
        this.endGame();
        // this.togglePause();
        // alert(err);
        // window.location.reload();
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

        return [{name: this.playerName, score: yourScore}];

      } else if (highScores.length < GameView.NUM_HIGHSCORES ||
                 yourScore > highScores[highScores.length - 1].score) {

        for (var i = 0; i < highScores.length; i++) {
          if (highScores[i].score < yourScore) break;
        }
        highScores.splice(i, 0, {name: this.playerName, score: yourScore});

        if (highScores.length > GameView.NUM_HIGHSCORES) highScores.pop();

        congrats = "Congrats, " + this.playerName + ". Your score of: $";
        congrats += yourScore + " is #" + (i+1) + " on the high scores!";

        return highScores;

      } else {
        congrats = "GG, " + this.playerName + ". Your score was: $" + yourScore;
        return highScores;
      }
    }.bind(this));

    alert(congrats);
    this.start();
  };

  GameView.prototype.buildHighScores = function (snap) {
    console.log("high-scores value trigger..");
    console.log(snap.val());

    var highScores = snap.val();
    if (!highScores) return;
    $("#high-scores").empty();

    highScores.forEach(function (highScore) {
      $("#high-scores").append($("<li>").text(
        highScore.name + " $" + highScore.score
      ));
    });
  };

}());
