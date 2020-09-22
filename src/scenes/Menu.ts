import Phaser from 'phaser'


export default class Menu extends Phaser.Scene{

  constructor()
	{
    super('Main-Menu');
  }
  
  
  create () {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.add.image(200, 0, "laserB");
    this.add.image(0, 200, "laserR");
    this.add.text(0, 0, 'test');
    
  }
}