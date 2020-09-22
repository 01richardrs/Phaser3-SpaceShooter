import Phaser from 'phaser'
import Level1 from './Level1';

let level;
export default class Pause extends Phaser.Scene{
  
  init(data) {
    level = data.level;
  }
  //+bg transparent
  constructor() {
    super('pause')
  }
  create() {
    //textStyle
    let buttonText = {fill: '#fff', fontSize: '30px'};
    let openingText = { fill: '#fff', fontSize: '65px' };
    let subOpeningText = {fill: '#fff', fontSize: '45px'};

    //text
    const paused = this.add.text(270, 150, 'PAUSED',openingText).setScrollFactor(0);
    const play = this.add.text(180, 280, 'Play', subOpeningText).setScrollFactor(0).setInteractive();
    const back = this.add.text(20,20, 'Back Main Menu',buttonText).setScrollFactor(0).setInteractive();
    const quit = this.add.text(350,280, 'Exit Game',subOpeningText).setScrollFactor(0).setInteractive();
    
    //button
    play.on('pointerdown', () => {
      if (level == 1) {
        this.scene.resume('Level1')
        this.scene.stop();
      } else if (level == 2) {
        this.scene.resume('Level2')
        this.scene.stop();
      } else {
        this.scene.resume('Level3')
        this.scene.stop();
      }
      
    });
    play.on('pointerover', () => {
      play.setStyle({ fill: '#ff0' })
    });
    play.on('pointerout', () => {
      play.setStyle({ fill: '#fff' })
    });

    back.on('pointerdown', () => {
      if (level == 1) {
        this.scene.stop('Level1')
      } else if (level == 2) {
        this.scene.stop('Level2')
      } else {
        this.scene.stop('Level3')
      }
      this.scene.launch('Main-Menu');
      this.scene.stop();
    });
    back.on('pointerover', () => {
      back.setStyle({ fill: '#ff0' })
    });
    back.on('pointerout', () => {
      back.setStyle({ fill: '#fff' })
    });

    quit.on('pointerdown', () => {
      this.game.destroy(true);
    });
    quit.on('pointerover', () => {
      quit.setStyle({ fill: '#ff0' })
    });
    quit.on('pointerout', () => {
      quit.setStyle({ fill: '#fff' })
    });

  }
}