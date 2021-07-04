// A lot of the code is similar to Nathan Altice's MovementStudies Runner.js scene.

const tileSize = 35;  // varible used to calculate where tiles should be set.
const groundWidth = 600;
const obsSpeedInPPS = 200;

let config = {
    type: Phaser.AUTO,
    width: 640,  // size of game, we can modify this if we want. I think maybe a bit wider could be good
    height: 480,
    physics: {     // physics settings from Nathan Altice's MovementStudies example.
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);



game.settings = {
    speed: 4     // initial speed
}