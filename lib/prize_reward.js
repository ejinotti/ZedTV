(function() {
  if (typeof ZedTV === "undefined") {
    window.ZedTV = {};
  }

  var PrizeReward = ZedTV.PrizeReward = function (options) {
    this.pos = options.pos;
    this.value = options.value;
    this.framesToLive = PrizeReward.FRAMES_TO_LIVE;
    this.game = options.game;
  };

  PrizeReward.COLOR = "gold";
  PrizeReward.FRAMES_TO_LIVE = 8;
  PrizeReward.VMOVE_PIXELS = -2;
  PrizeReward.FONT_FAM = "Arial";
  PrizeReward.FONT_SIZE = "18pt";

  PrizeReward.prototype.draw = function (ctx) {
    ctx.fillStyle = PrizeReward.COLOR;
    ctx.font = "bold " + PrizeReward.FONT_SIZE + " " + PrizeReward.FONT_FAM;
    ctx.textAlign = "center";
    ctx.fillText("+$" + this.value, this.pos[0], this.pos[1]);
  };

  PrizeReward.prototype.move = function () {
    if (--this.framesToLive <= 0) {
      this.game.remove(this);
    } else {
      this.pos[1] += PrizeReward.VMOVE_PIXELS;
    }
  };

}());
