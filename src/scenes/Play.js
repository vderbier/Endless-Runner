class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/Background.png');
        this.load.image('mountains', './assets/mountains.png')
        this.load.image('ground', './assets/ground.png');
        this.load.image('groundCover', './assets/GroundCover.png');
        this.load.image('rock', './assets/rock1.png');
        this.load.image('runner', './assets/Runner.png');
      }
    
    create() {

        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 2200;
        this.gameOver = false;
        this.isJumping = false;
        this.MAX_JUMPS = 1;

        // Add tile Sprites
        this.mountains = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mountains').setOrigin(0, 0);
        

        // So here we have to add this group to have collision for the ground. 
        this.ground = this.add.group();

        // we add the ground sprite  to the group and have settings so its collision box doesn't move.
        // tileSize defined in Main
        for (let i = 0; i < game.config.width; i += groundWidth) {  // we need this loop to make the collision reach the end of the stage.
            let groundTile = this.physics.add.sprite(i, game.config.height - groundHeight, 'ground').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        this.groundCover = this.add.tileSprite(0, game.config.height - groundHeight -10, game.config.width, groundHeight + 10, 'groundCover').setOrigin(0, 0);

        // Make the ground group we just made into a tileSprite that scrolls. no need because it has no texture.
       // this.scrollingGround = this.add.tileSprite(0, game.config.height - tileSize, game.config.width, tileSize, 'ground').setOrigin(0, 0); 

        // define jump key
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // set up runner
        this.runner = this.physics.add.sprite(120, game.config.height/2-tileSize, 'runner').setScale(0.8); // 0.8 is the scale
        this.physics.add.collider(this.runner, this.ground);

        this.frames = 0;
        this.nextRockFrame = 1; // when the next rock should arrive, first is immediatly.
    }

    update() {  // ~60 Frames per seconds

        if (!this.gameOver) { 

            this.frames += 1;

            // scrolling environment 
        // this.scrollingGround.tilePositionX += game.settings.speed;
            this.mountains.tilePositionX += 1;
            this.groundCover.tilePositionX += game.settings.speed;

            // Use frame rate to callculate when next obs should appear. 
            if (this.frames >= this.nextRockFrame) { // create next obstacle
                
                let obs = this.physics.add.sprite(game.config.width + tileSize*2, game.config.height - tileSize*4, 'rock').setScale(0.8);
                obs.body.setVelocityX(-obsSpeedInPPS); // pixels per second. NEED TO INCREMENT OVER TIME. 
                this.physics.add.collider(obs, this.ground);

                this.physics.add.collider(obs, this.runner);
                console.log(this.physics.add.collider(obs, this.runner));
            
                this.frames = 0; // reset frames counter.
                this.nextRockFrame = Phaser.Math.RND.integerInRange(100, 200); // next obs between 100 and 200 frames from prev one. NEEDS TO GET SMALLER OVER TIME.
                //console.log(this.nextRockFrame);  
            }

            /* This jumping section is from Nathan Altice's MovementStudies Variable Jump scene. */
            this.runner.isGrounded = this.runner.body.touching.down;
            if (this.runner.isGrounded) {    // if we are on the ground we should get our jump back 
                this.isJummping = false;
                this.jumps = this.MAX_JUMPS;
            }  //else {
              // play jump animation.
            //}

            // jump when up key is down.
            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(this.upKey, 150)) {
                this.runner.body.velocity.y = this.JUMP_VELOCITY;
                this.isJummping = true;
            }

            // upon release of up key, start falling back down.
            if(this.isJummping && Phaser.Input.Keyboard.UpDuration(this.upKey)) {
                this.jumps -= 1;
                console.log(this.jumps);
                this.isJumping = false;
            }
            /***********************************************************************************/
        }
    }
}
