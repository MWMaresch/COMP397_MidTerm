module objects {
    export class Enemy extends objects.GameObject {

        private _life : number;

        constructor(imageString:string, life : number) {
            super(enemyAtlas, imageString, "");
            this._life = life;
        }

        get life() : number {
            return this._life;
        }

        public setPosition(pos : objects.Vector2) : void {
            this.x = pos.x;
            this.y = pos.y;
        }

        //being a Vector2 simplifies its usage later on
        public getPosition() : objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }

        public shot() : void {
            //when someone is shot they get hurt
            this._life--;
        }
    }
}