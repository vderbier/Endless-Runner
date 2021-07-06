class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/Background.png');
        this.load.image('mountains', './assets/mountains.png')
        this.load.image('ground', './assets/Ground.png');
        this.load.image('groundCover', './assets/GroundCover.png');
        this.load.image('rock', './assets/rock1.png');
        this.load.image('bigRock', './assets/rock2.png');
        this.load.image('tree', './assets/tree.png');
        this.load.image('runner', './assets/Runner.png');

        this.load.spritesheet('running', './assets/AnimatedRunner8Frames-01.png', 
            {frameWidth: 80, frameHeight: 127, startFrame: 0, endFrame: 7});
      }
    
    create() {

        this.init();

        // Add tile Sprites
        this.mountains = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mountains').setOrigin(0, 0);
        

        // So here we have to add this group to have collision for the ground. 
        this.ground = this.add.group();

        // we add the ground sprite to the group and have settings so its collision box doesn't move.
        // tileSize defined in Main
        for (let i = 0; i < game.config.width; i += groundWidth) {  // we need this loop to make the collision reach the end of the stage.
            let groundTile = this.physics.add.sprite(i, game.config.height - groundHeight, 'ground').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            groundTile.body.colldeWorldBounds = true;
            groundTile.body.bounce.set(0);
            this.ground.add(groundTile);
        }

        this.groundCover = this.add.tileSprite(0, game.config.height - groundHeight -10, game.config.width, groundHeight + 10, 'groundCover').setOrigin(0, 0); // 10 is arbitrary

        // define jump key
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // set up runner
        this.runner = this.physics.add.sprite(120, game.config.height/2-tileSize, 'runner'); // 0.8 is the scale
        // running animation config
        this.animFramesConfig = {
            key: 'running',
            frames: this.anims.generateFrameNumbers('running', { start: 0, end: 7, first: 0}),
            frameRate: game.settings.speed*2 // anim will get faster as game gets faster.
        };
        this.anims.create(this.animFramesConfig);

        this.runner.anims.play('running', true);

        this.physics.add.collider(this.runner, this.ground);

    }

    update() {  // ~60 Frames per seconds

        if (!this.gameOver) { 

            this.countSeconds();
          
            this.frames += 1;
            console.log(this.frames);

            // scrolling environment 
            this.mountains.tilePositionX += 1;
            this.groundCover.tilePositionX += game.settings.speed;

            // Use frame rate to callculate when next obs should appear. 
            if (this.frames >= this.nextRockFrame) { // create next obstacle

                if (this.incrementSpeed == true) {    // increase speed of everything once a new obstacle spawns
                      this.speedIncrease();
                }

                // randomize which obstacle will spawn
                let randNum = Phaser.Math.RND.integerInRange(1, 3);

                if (randNum == 1) {         // one of these three obstacles will spawn.
                    var obsType = 'rock';
                } else if (randNum == 2) {
                    var obsType = 'bigRock';
                } else if (randNum == 3) {
                    var obsType = 'tree';
                }
                
                let obs = this.physics.add.sprite(game.config.width + tileSize*2, game.config.height - tileSize*4, obsType);

                obs.body.setVelocityX(-game.settings.obsSpeedInPPS); // pixels per second. NEED TO INCREMENT OVER TIME.

                this.physics.add.collider(obs, this.ground);
                
                this.physics.add.collider(obs, this.runner, () => {
                    this.gameOver = true;
                    this.Viking_down();
                });
                
                this.frames = 0; // reset frames counter.
                this.nextRockFrame = Phaser.Math.RND.integerInRange(600/game.settings.speed, 1200/game.settings.speed); // next obs between 100 and 200 frames from prev one. NEEDS TO GET SMALLER OVER TIME.
                //console.log(this.nextRockFrame);  
            }

            /* This jumping section is from Nathan Altice's MovementStudies Variable Jump scene. */
            this.runner.isGrounded = this.runner.body.touching.down;
            if (this.runner.isGrounded) {    // if we are on the ground we should get our jump back 
                this.runner.anims.play('running', true);
                this.isJummping = false;    
                this.jumps = this.MAX_JUMPS;

             } else {
              // play jump frame, first frame of running animation.
              this.runner.anims.pause(this.runner.anims.currentAnim.frames[0]);
            }

            // jump when up key is down.
            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(this.upKey, 170)) {
                this.runner.body.velocity.y = this.JUMP_VELOCITY;
                this.isJummping = true;
            }

            // upon release of up key, start falling back down.
            if(this.isJummping && Phaser.Input.Keyboard.UpDuration(this.upKey)) {
                this.jumps -= 1;
              //  console.log(this.jumps);
                this.isJumping = false;
            }
            /***********************************************************************************/
        }
        
    }

    init() {
        this.JUMP_VELOCITY = -650;
        this.physics.world.gravity.y = 2400;
        this.gameOver = false;
        this.isJumping = false;
        this.MAX_JUMPS = 1;
        game.settings.speed = 6;
        game.settings.obsSpeedInPPS = 360;
        this.frames = 0;              // when to throw out a new obstacle
        this.seconds = 0;             // when to increase speed
        this.incrementSpeed = false;  // to synchronize the increase of speed of obstacles and ground.
        this.nextRockFrame = 1;       // when the next rock should arrive, first is immediatly.
    }

    Viking_down() {
        // starts next scene after 40 milliseconds
        setTimeout(() => {this.scene.start("GameOver")}, 40)
    }
  
    speedIncrease() {
        game.settings.speed += 1;         // so it looks in sync.
        game.settings.obsSpeedInPPS += 60;
        console.log(game.settings.speed);
        this.incrementSpeed = false;
    }
  
    countSeconds() {
        // equals true every 10 seconds. To sync ground and obstacle speed.
        this.seconds += 1;             
        if (this.seconds/60 % 10 == 0) {  // set to true every 10 seconds.
            this.incrementSpeed = true; 
        }
    }
}
