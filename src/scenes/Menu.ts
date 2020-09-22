import Phaser from 'phaser'


let status = true;//gameStatus
export default class Menu extends Phaser.Scene{

  constructor()
	{
    super('Main-Menu');
  }

  
  create() {
    //measure scale
    const width = this.scale.width * 0.7
    const height = this.scale.height * 0.7
    const totalWidth = width * 10
    
    this.createAligned(this, totalWidth, 'bg', 0.5);

    //style
    let menuStyle = { fill: '#fff', fontSize: '38px' };
    let levelStyle = {fill: '#fff', fontSize: '45px'}

    //below init text
    const logo = this.add.image(400, 150, 'logo').setScale(0.5).setScrollFactor(0);
    const start = this.add.text(340, 280, 'Start', menuStyle).setScrollFactor(0).setInteractive();
    const credit = this.add.text(310, 350, 'Credits', menuStyle).setScrollFactor(0).setInteractive();
    const exit = this.add.text(350, 420, 'Exit', menuStyle).setScrollFactor(0).setInteractive();
    const programby = this.add.text(250, 280, 'Programmed by: ', menuStyle).setScrollFactor(0);
    const programer = this.add.text(300, 340, 'Richard S ', menuStyle).setScrollFactor(0);
    const exits = this.add.text(180, 280, '<--').setScrollFactor(0).setInteractive();
    const chooseLevel = this.add.text(230, 280, 'Choose Level :', menuStyle).setScrollFactor(0);
    const level1 = this.add.text(280, 340, '1', levelStyle).setScrollFactor(0).setInteractive();
    const level2 = this.add.text(380, 340, '2', levelStyle).setScrollFactor(0).setInteractive();
    const level3 = this.add.text(480, 340, '3', levelStyle).setScrollFactor(0).setInteractive();
    
    //make other text invisible
    exits.visible = false;
    programby.visible = false;
    programer.visible = false;
    chooseLevel.visible = false;
    level1.visible = false;
    level2.visible = false;
    level3.visible = false;

    //button
    start.on('pointerdown', () => {
      chooseLevel.visible = true;
      level1.visible = true;
      level2.visible = true;
      level3.visible = true;
      exits.visible = true;
      start.visible = false;
      credit.visible = false;
      exit.visible = false;
    });
    start.on('pointerover', () => {
      start.setStyle({ fill: '#ff0' })
    });
    start.on('pointerout', () => {
      start.setStyle({ fill: '#fff' })
    });

    credit.on('pointerdown', () => {
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
      chooseLevel.visible = false;
      level1.visible = false;
      level2.visible = false;
      level3.visible = false;
    });
    exits.on('pointerover', () => {
      exits.setStyle({ fill: '#ff0' })
    });
    exits.on('pointerout', () => {
      exits.setStyle({ fill: '#fff' })
    });
    
    level1.on('pointerdown', () => {
      this.scene.launch('Level1');
      this.scene.stop();
    });
    level1.on('pointerover', () => {
      level1.setStyle({ fill: '#ff0' })
    });
    level1.on('pointerout', () => {
      level1.setStyle({ fill: '#fff' })
    });

    level2.on('pointerdown', () => {
      this.scene.launch('Level2');
      this.scene.stop();
    });
    level2.on('pointerover', () => {
      level2.setStyle({ fill: '#ff0' })
    });
    level2.on('pointerout', () => {
      level2.setStyle({ fill: '#fff' })
    });

    level3.on('pointerdown', () => {
      this.scene.launch('Level3');
      this.scene.stop();
    });
    level3.on('pointerover', () => {
      level3.setStyle({ fill: '#ff0' })
    });
    level3.on('pointerout', () => {
      level3.setStyle({ fill: '#fff' })
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
    for (let i = 0; i < count+100; ++i)
    {
      const m = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1)
        .setScrollFactor(scrollFactor)
  
      x += m.width
    }
  }


}