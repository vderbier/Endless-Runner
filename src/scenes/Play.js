class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/Background.png');
        this.load.image('mountains', './assets/mountains.png')
        this.load.image('ground', './assets/ground.png');
        this.load.image('rock', './assets/rock1.png');
        this.load.image('runner', './assets/Runner.png');
      }
    
    create() {

        this.physics.world.gravity.y = 2600;

        // Add tile Sprites
        this.mountains = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mountains').setOrigin(0, 0);

        // So here we have to add this group to have collision for the ground. 
        this.ground = this.add.group();

        // we add the ground sprite  to the group and have settings so its collision box doesn't move.
        // tileSize defined in Main
        for (let i = 0; i < game.config.width; i += groundWidth) {  // we need this loop to make the collision reach the end of the stage.
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // Make the ground group we just made into a tileSprite that scrolls.
        this.scrollingGround = this.add.tileSprite(0, game.config.height - tileSize, game.config.width, tileSize, 'ground').setOrigin(0, 0); 

        // define jump key
        //let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // set up runner
        this.runner = this.physics.add.sprite(120, game.config.height/2-tileSize, 'runner').setScale(0.8); // 0.8 is the scale
        this.physics.add.collider(this.runner, this.ground);

        this.frames = 0;
        this.nextRockFrame = 1; // when the next rock should arrive, first is immediatly.
    }

    update() {  // ~60 Frames per seconds

        this.frames += 1;

        // scrolling environment 
        this.scrollingGround.tilePositionX += game.settings.speed;
        this.mountains.tilePositionX += 2;

        // Use frame rate to callculate when next obs should appear. 
        if (this.frames >= this.nextRockFrame) { // create next obstacle
            let obs = this.physics.add.sprite(game.config.width + tileSize*2, game.config.height - tileSize*3 + 7, 'rock');
            obs.body.setVelocityX(-obsSpeedInPPS); // pixels per second. NEED TO INCREMENT OVER TIME. 
            this.physics.add.collider(obs, this.ground);
            this.frames = 0; // reset frames counter.
            this.nextRockFrame = Phaser.Math.RND.integerInRange(100, 200); // next obs between 50 and 100 frames from prev one.
            console.log(this.nextRockFrame);
        }
    }
}
