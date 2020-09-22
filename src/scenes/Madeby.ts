import Phaser from 'phaser'

export default class Madeby extends Phaser.Scene{

  constructor() {
    super('Madeby');
  }
  preload() {
    this.load.image('laserB', '../../public/GameAssets/laser/laserBlue.png');
    this.load.image('laserR', '../../public/GameAssets/laser/laserRed.png');
    this.load.image('bg', '../../public/GameAssets/bg.png');
  }
  create() {
    this.add.text(250, 200, "Made By :", {font: "32px Arial"});
    this.add.text(300, 250, 'Richard S', { font: "bold 48px Arial" });
    this.load.start();
    this.time.delayedCall(3000, this.Move,[],this);
    
  }

  Move() {
    this.scene.start('Main-Menu')
  }

}