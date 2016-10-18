/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var enemyAtlas;
var currentScene;
var scene;
var crosshair;
// Preload Assets required
var assetData = [
    { id: "PlayBtn", src: "../../Assets/images/sack.png" },
    { id: "MenuBg", src: "../../Assets/images/bank1.png" },
    { id: "GameBg", src: "../../Assets/images/bank.png" },
    { id: "Crosshair", src: "../../Assets/images/crosshair.png" },
    { id: "Criminal", src: "../../Assets/images/enemy.png" } //also includes poof sprites
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    var atlasData = {
        images: [assets.getResult("Criminal")],
        frames: [
            [0, 0, 208, 224, 0],
            [400, 0, 125, 120, 0],
            [210, 0, 125, 120, 0],
            [405, 129, 125, 120, 0],
            [210, 129, 93, 120, 0],
            [310, 129, 86, 120, 0]
        ],
        animations: {
            "criminal": { "frames": [0] },
            "poof": { "frames": [1, 2, 3, 4, 5], "speed": 0.5, "next": false }
        },
        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    };
    enemyAtlas = new createjs.SpriteSheet(atlasData);
    crosshair = new createjs.Bitmap(assets.getResult("Crosshair"));
    //we want an ACCURATE crosshair
    crosshair.regX = 37;
    crosshair.regY = 37;
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    //update the crosshair position here because it applies to all scenes
    crosshair.x = stage.mouseX;
    crosshair.y = stage.mouseY;
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting SHOOTER scene");
            break;
    }
}
//# sourceMappingURL=game.js.map