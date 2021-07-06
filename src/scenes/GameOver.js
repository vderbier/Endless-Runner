class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('gameOver', './Assets/GameOver-01.png');
      }
      

    create() {
        this.add.image(0, 0, 'gameOver').setOrigin(0, 0);
        /*this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#Fb3141',
            color: 'white', //'#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 170
        }
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        */
        this.GameOver = true;

        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.scene.start("playScene");
        }
    }
}