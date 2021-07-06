// A lot of the code is similar to Nathan Altice's MovementStudies Runner.js scene.

const tileSize = 35;  // varible used to calculate where tiles should be set.
const groundHeight = 60;
const groundWidth = 600;

// hahaha

let config = {
    type: Phaser.AUTO,
    width: 888,  // size of game, we can modify this if we want. I think maybe a bit wider could be good
    height: 500,
    physics: {     // physics settings from Nathan Altice's MovementStudies example.
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);

game.settings = {
    speed: 6,     // initial speed
    obsSpeedInPPS: 360  // obstacle speed is 60 * speed at all points of the game.
}

let score = 0;
