import Phaser from 'phaser'


let status = true;
export default class Menu extends Phaser.Scene{

  constructor()
	{
    super('Main-Menu');
  }

  
  create() { 
    //measure scale
    const width = this.scale.width*0.7
	  const height = this.scale.height*0.7
    const totalWidth = width * 10
    
    this.createAligned(this, totalWidth, 'bg', 0.5);

    //below init text
    const logo = this.add.image(400, 150, 'logo').setScale(0.5).setScrollFactor(0);
    const start = this.add.text(340, 280, 'Start', { fill: '#fff', fontSize: '38px' }).setScrollFactor(0).setInteractive();
    const credit = this.add.text(310, 350, 'Credits', { fill: '#fff', fontSize: '38px' }).setScrollFactor(0).setInteractive();
    const exit = this.add.text(350, 420, 'Exit', { fill: '#fff', fontSize: '38px' }).setScrollFactor(0).setInteractive();
    const programby = this.add.text(250, 280, 'Programmed by: ', { fill: '#fff', fontSize: '38px' }).setScrollFactor(0);
    const programer = this.add.text(300, 340, 'Richard S ', { fill: '#fff', fontSize: '38px' }).setScrollFactor(0);
    const exits = this.add.text(180, 280, '<--').setScrollFactor(0).setInteractive();
    exits.visible = false;
    programby.visible = false;
    programer.visible = false;

    start.on('pointerdown', () => {//start button
      
    });
    start.on('pointerover', () => {
      start.setStyle({ fill: '#ff0' })
    });
    start.on('pointerout', () => {
      start.setStyle({ fill: '#fff' })
    });

    credit.on('pointerdown', () => {//credits button
      start.visible = false;
      credit.visible = false;
      exit.visible = false;
      exits.visible = true;
      programby.visible = true;
      programer.visible = true;
    });
    credit.on('pointerover', () => {
      credit.setStyle({ fill: '#ff0' })
    });
    credit.on('pointerout', () => {
      credit.setStyle({ fill: '#fff' })
    });

    exit.on('pointerdown', () => {//exit buttons
      this.game.destroy(true);
    });
    exit.on('pointerover', () => {
      exit.setStyle({ fill: '#ff0' })
    });
    exit.on('pointerout', () => {
      exit.setStyle({ fill: '#fff' })
    });
    
    exits.on('pointerdown', () => {//back buttons
      start.visible = true;
      credit.visible = true;
      exit.visible = true;
      exits.visible = false;
      programby.visible = false;
      programer.visible = false;
    });
    exits.on('pointerover', () => {
      exits.setStyle({ fill: '#ff0' })
    });
    exits.on('pointerout', () => {
      exits.setStyle({ fill: '#fff' })
    });
    
  
  }

  update() {
    const cam = this.cameras.main;
    const speed = 5;

    if (status) {//keep camera moving
      cam.scrollX += speed;
    }
  }

  //paralax functions for adding new bg next to it to prevent blank
  createAligned = (scene, totalWidth, texture, scrollFactor) => {
    const w = scene.textures.get(texture).getSourceImage().width
    const count = Math.ceil(totalWidth / w) * scrollFactor
  
    let x = 0
    for (let i = 0; i < count; ++i)
    {
      const m = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1)
        .setScrollFactor(scrollFactor)
  
      x += m.width
    }
  }


}