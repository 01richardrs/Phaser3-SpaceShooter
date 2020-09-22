import Phaser from 'phaser'

export default class Madeby extends Phaser.Scene{

  constructor() {
    super('Madeby');
  }
  preload() {
    //load assets (menu)
    this.load.image('bg', 'GameAssets/bg.jpg');
    this.load.image('logo', 'GameAssets/logo.png');
  }
  create() {
    //text
    this.add.text(250, 200, "Made By :", {font: "32px Arial"});
    this.add.text(300, 250, 'Richard S', { font: "bold 48px Arial" });
    //cutscene before move to main
    this.time.delayedCall(1000, this.Move,[],this);
    
  }

  Move() {
    this.scene.start('Main-Menu');
    this.scene.stop();
  }

}