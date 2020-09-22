import Phaser from 'phaser'

let status = true;//gameStatus
export default class Level1 extends Phaser.Scene{

  constructor() {
    super('Level1');
  }
//TODO: - TUts,level,BG Music
  preload() {
    //load game assets
    this.load.image('laserB', 'GameAssets/laser/laserBlue.png');
    this.load.image('laserR', 'GameAssets/laser/laserRed.png');
  }

  create() {
    //measure scale
    const width = this.scale.width * 0.7
    const height = this.scale.height * 0.7
    const totalWidth = width * 10
    
    this.createAligned(this, totalWidth, 'bg', 0.5);

    //textStyle
    let topText = {fill: '#fff', fontSize: '35px'};
    let buttonText = {fill: '#fff', fontSize: '30px'};
    let openingText = { fill: '#fff', fontSize: '65px' };
    let subOpeningText = {fill: '#fff', fontSize: '45px'};

    //text
    const pause = this.add.text(20, 20, '||',buttonText).setScrollFactor(0).setInteractive();
    const currLevel = this.add.text(80, 20, 'Level - 1',topText).setScrollFactor(0);
    let playerHealth = this.add.text(550, 20, 'Life : 3', topText).setScrollFactor(0);
    
    const stageLevel = this.add.text(270, 150, 'Level 1',openingText).setScrollFactor(0);
    const ready = this.add.text(340, 230, 'Ready',subOpeningText).setScrollFactor(0);
    const go = this.add.text(340, 230, 'Go!!!', subOpeningText).setScrollFactor(0);
    
    //hideText
    go.visible = false;

    //openingText
    this.time.delayedCall(500, () => {
      ready.visible = false;
      go.visible = true;
    }, [], this);
    this.time.delayedCall(1000, () => {
      ready.visible = false;
      go.visible = false;
      stageLevel.visible = false;
    }, [], this);

    //buttons
    pause.on('pointerdown', () => {
      this.scene.launch('pause',{ level: 1});
      this.scene.pause();
    });
    pause.on('pointerover', () => {
      pause.setStyle({ fill: '#ff0' })
    });
    pause.on('pointerout', () => {
      pause.setStyle({ fill: '#fff' })
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