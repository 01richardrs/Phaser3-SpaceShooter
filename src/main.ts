import Phaser from 'phaser'

import Madeby from './scenes/Madeby'
import Menu from './scenes/Menu'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [Madeby, Menu]
		
	
}

export default new Phaser.Game(config)
