class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  
  preload() {
    this.load.image('title', './assets/TitleScene-01.png');
    // Snif by KWils found at https://www.looperman.com/loops/detail/257797/acoustic-guitar-sniff-by-kwils-free-130bpm-acoustic-acoustic-guitar-loop
    this.load.audio('music', 'assets/BackgroundMusic.wav');
  }
  
  create() {


    this.sound.play('music', {volume: 0.5, loop: true});  // adjusted volume.



    this.add.image(0, 0, 'title').setOrigin(0, 0);
      
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  }
  
  update(){
    if (Phaser.Input.Keyboard.JustDown(this.upKey)){
      this.scene.start('playScene');
    }
  }
}
