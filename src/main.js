/*/////////////////////////////////////////////////////////////////////////

Collaborator names: Victor Derbier, Harsha Madala, Claudia Mcmillin, Bryson Frank

Game title: Run Viking Run (endless runner)

Date completed: 7/6/21 (still working)

Creative tilt justification: 
    do something technically interesting? Are you particularly proud of a programming technique 
    you implemented? Did you look beyond the class examples and learn how to do something new?
        -
    
    have a great visual style? Does it use music or art that you're particularly proud of? 
    Are you trying something new or clever with the endless runner form?
        -I, Bryson, thought my viking was way better than I was expecting. With the running animation, 
        I did some really cool math and usage of moving limbs via Adobe Illustrator.
        -

---------------------------------------------------------------------------
Credits:
Font found at https://www.dafont.com/viking-younger-runes.font 
A lot of the code is similar to Nathan Altice's MovementStudies Runner.js scene.

/////////////////////////////////////////////////////////////////////////*/

const tileSize = 35;  // varible used to calculate where tiles should be set.
const groundHeight = 60;
const groundWidth = 600;


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
