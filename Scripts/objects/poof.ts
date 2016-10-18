module objects {
    export class Poof extends objects.GameObject {

        //the only thing this class does is remove itself after 0.2 seconds
        //so we create a timer to do just that
        private _timer : number = 0;

        constructor(imageString:string) {
            super(enemyAtlas, imageString, "");
        }

        public update() : void {
            //timer is in milliseconds
            //after 200, remove self from the scene
            this._timer += createjs.Ticker.interval;
            if (this._timer > 200)
                currentScene.removeChild(this);
        }

        public setPosition(pos : objects.Vector2) : void {
            this.x = pos.x;
            this.y = pos.y;
        }
    }
}