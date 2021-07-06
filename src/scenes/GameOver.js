class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('gameOver', './Assets/GameOver-01.png');
      }
      

    create() {
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#949494',
            color: 'black', //'#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 170
        }
        this.add.text(game.config.width/5*2, game.config.height/4 *3, 'Score:', this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/5*3, game.config.height/4 *3, Math.floor(score)*10, this.scoreConfig).setOrigin(0.5);
        
        this.GameOver = true;
        
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.scene.start("playScene");
        }
    }
}