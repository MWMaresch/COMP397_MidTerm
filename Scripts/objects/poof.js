var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Poof = (function (_super) {
        __extends(Poof, _super);
        function Poof(imageString) {
            _super.call(this, enemyAtlas, imageString, "");
            //the only thing this class does is remove itself after 0.2 seconds
            //so we create a timer to do just that
            this._timer = 0;
        }
        Poof.prototype.update = function () {
            //timer is in milliseconds
            //after 200, remove self from the scene
            this._timer += createjs.Ticker.interval;
            if (this._timer > 200)
                currentScene.removeChild(this);
        };
        Poof.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        return Poof;
    }(objects.GameObject));
    objects.Poof = Poof;
})(objects || (objects = {}));
//# sourceMappingURL=poof.js.map