import Phaser from 'phaser'

import Madeby from './scenes/Madeby'
import Menu from './scenes/Menu'
import Level1 from './scenes/Levels/Level1'
//import Level2 from './scenes/Levels/Level2'
//import Level3 from './scenes/Levels/Level3'
import Pause from './scenes/Levels/Pause'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {  }
		}
	},
	scene: [Madeby, Menu, Level1, /*Level2, Level3,*/ Pause]
		
}

export default new Phaser.Game(config)
