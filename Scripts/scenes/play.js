/*
    Play scene where the main gameplay occurs
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            //these two must start at 0 because we add to them
            this._timer = 0;
            this._score = 0;
            //this.start();  this was being called an extra time
        }
        Play.prototype.start = function () {
            this._timer += createjs.Ticker.interval;
            //set background image
            this._bg = new createjs.Bitmap(assets.getResult("GameBg"));
            this.addChild(this._bg);
            this._createNewEnemy();
            //add time and score labels
            this._timeLabel = new objects.Label("Time: 0", "80px Arial", "#ffffff", 150, 170);
            this.addChild(this._timeLabel);
            this._scoreLabel = new objects.Label("Score: 0", "80px Arial", "#ffffff", 160, 70);
            this.addChild(this._scoreLabel);
            stage.addChild(this);
            //add crosshair AFTER everything else so it displays on top
            stage.addChild(crosshair);
        };
        Play.prototype._createNewEnemy = function () {
            this._enemy = new objects.Enemy("criminal", (Math.random() * 4) + 1);
            this._setEnemyPosition();
            this._enemy.on("click", this._onEnemyClick, this);
            this.addChild(this._enemy);
        };
        Play.prototype._setEnemyPosition = function () {
            //put them at a random point on the screen
            var randX = Math.random() * config.Screen.WIDTH;
            var randY = Math.random() * config.Screen.HEIGHT;
            this._enemy.setPosition(new objects.Vector2(randX, randY));
        };
        Play.prototype._createPoof = function () {
            //create poof at the enemy's position
            this._poof = new objects.Poof("poof");
            this._poof.setPosition(this._enemy.getPosition());
            this.addChild(this._poof);
        };
        Play.prototype.update = function () {
            //update the timer every frame
            this._timer += createjs.Ticker.interval;
            this._timeLabel.text = "Time: " + (Math.round(this._timer / 10) / 100).toString();
            if (this._poof != null) {
                //we must call poof's update so they can eventually remove themselves
                this._poof.update();
            }
        };
        Play.prototype._onEnemyClick = function (event) {
            this._enemy.shot();
            //if they die
            if (this._enemy.life <= 0) {
                //add to our score and update the label
                this._score += 5;
                this._scoreLabel.text = "Score: " + this._score.toString();
                //create the poof BEFORE removing the enemy so it knows the enemy's position
                this._createPoof();
                this.removeChild(this._enemy);
                this._createNewEnemy();
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map