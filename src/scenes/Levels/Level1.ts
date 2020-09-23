import Phaser, { GameObjects, Time } from 'phaser'

let status = true;//gameStatus
let cursors;
let player;
let playerSpeed;
let cams;
export default class Level1 extends Phaser.Scene{

  constructor() {
    super('Level1');  
  }
//TODO: - level,BG Music+mobile drag
  preload() {
    //load game assets
    this.load.image('player', 'GameAssets/plane/player.png');
    this.load.image('enemy', 'GameAssets/plane/enemy.png');
    this.load.image('laserB', 'GameAssets/laser/laserBlue.png');
    this.load.image('laserR', 'GameAssets/laser/laserRed.png');
  }

  create() {

    //measure scale
    const width = this.scale.width * 0.7
    const height = this.scale.height * 0.7
    const totalWidth = width * 10
    
    this.createAligned(this, totalWidth, 'bg', 0.5);
    //add player
    this.addPlayer();
    
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
    const lilguide = this.add.text(450, 400, 'Use Arrow Key to Move').setScrollFactor(0);
    const lilguide2 = this.add.text(450, 430, 'Use Space to shoot').setScrollFactor(0);
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
    this.time.delayedCall(2000, () => {
      lilguide.visible = false;
      lilguide2.visible = false;
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
    cams = this.cameras.main;
    const speed = 5;

    if (status) {//keep camera moving
      cams.scrollX += speed;
     
      //input
      if (cursors.left.isDown) {
        player.setVelocityX(-playerSpeed);
      } else if (cursors.right.isDown) {
        player.setVelocityX(playerSpeed);
      } else {
        player.setVelocityX(0);
      }

      if (cursors.up.isDown) {
        player.setVelocityY(-playerSpeed);
      } else if (cursors.down.isDown) {
        player.setVelocityY(playerSpeed);
      } else {
        player.setVelocityY(0);
      }

      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) {
        this.shootLaser();
      } 
      
    }

  }

  shootLaser() {//shoot laser
    let laserGroup = new LaserGroup(this);
    laserGroup.fireLaser(player.x ,player.y - 20);
  }

  addPlayer() {//add player
    cams = this.cameras.main;
    player = this.physics.add.sprite(cams.width/2, cams.height-90, 'player').setScale(0.65).setScrollFactor(0);
    cursors = this.input.keyboard.createCursorKeys();
    player.setCollideWorldBounds(true);
    playerSpeed = 250;
    player.enableBody = true;
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

class LaserGroup extends Phaser.Physics.Arcade.Group{//grouping for laser
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: true,
      key: 'laser'
    })
  }

  fireLaser(x, y) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y);
    }
  }
}

class Laser extends Phaser.Physics.Arcade.Sprite{//laser
  constructor(scene, x, y) {
    super(scene, x, y, 'laserR');
  }

  fire(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-900);
    this.setScrollFactor(0);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}