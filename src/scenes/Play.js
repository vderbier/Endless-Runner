class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/Background.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('obstacle', './assets/Obstacle1.png');
        this.load.image('runner', './assets/Runner.png');
      }
    
    create() {

        this.physics.world.gravity.y = 2600;

        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        // So here we have to add this group to have collision for the ground. 
        this.ground = this.add.group();

        // we add the ground sprite  to the group and have settings so its collision box doesn't move.
        // tileSize defined in Main
        let groundTile = this.physics.add.sprite(0, game.config.height - tileSize, 'ground').setOrigin(0);
        groundTile.body.immovable = true;
        groundTile.body.allowGravity = false;
        this.ground.add(groundTile);

        // This is what Nathan did but since our background is one rectangle we can do it in one go
            // for (let i = 0; i < game.config.width; i += tileSize) {
            //     let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setOrigin(0);
            //     groundTile.body.immovable = true;
            //     groundTile.body.allowGravity = false;
            //     this.ground.add(groundTile);
            // }

        // Make the ground group we just made into a tileSprite that scrolls.
        this.scrollingGround = this.add.tileSprite(0, game.config.height - tileSize, game.config.width, tileSize, 'ground').setOrigin(0, 0); 

        // set up runner
        this.runner = this.physics.add.sprite(120, game.config.height/2-tileSize, 'runner').setScale(0.5); // 0.5 is the scale

        this.physics.add.collider(this.runner, this.ground);
    }

    update() {

        // These tiles move constantly - hardcoded '4' to be replaced with incrementing variable over time.
        this.background.tilePositionX += 4;
        this.scrollingGround.tilePositionX += 4;
    }
}
