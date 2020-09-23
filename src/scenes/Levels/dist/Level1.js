"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var phaser_1 = require("phaser");
var status = true; //gameStatus
var cursors;
var player;
var Level1 = /** @class */ (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        var _this = _super.call(this, 'Level1') || this;
        //paralax functions for adding new bg next to it to prevent blank
        _this.createAligned = function (scene, totalWidth, texture, scrollFactor) {
            var w = scene.textures.get(texture).getSourceImage().width;
            var count = Math.ceil(totalWidth / w) * scrollFactor;
            var x = 0;
            for (var i = 0; i < count + 100; ++i) {
                var m = scene.add.image(x, scene.scale.height, texture)
                    .setOrigin(0, 1)
                    .setScrollFactor(scrollFactor);
                x += m.width;
            }
        };
        return _this;
    }
    //TODO: - TUts,level,BG Music
    Level1.prototype.preload = function () {
        //load game assets
        this.load.image('player', 'GameAssets/plane/player.png');
        this.load.image('enemy', 'GameAssets/plane/enemy.png');
        this.load.image('laserB', 'GameAssets/laser/laserBlue.png');
        this.load.image('laserR', 'GameAssets/laser/laserRed.png');
    };
    Level1.prototype.create = function () {
        var _this = this;
        //measure scale
        var width = this.scale.width * 0.7;
        var height = this.scale.height * 0.7;
        var totalWidth = width * 10;
        this.createAligned(this, totalWidth, 'bg', 0.5);
        //textStyle
        var topText = { fill: '#fff', fontSize: '35px' };
        var buttonText = { fill: '#fff', fontSize: '30px' };
        var openingText = { fill: '#fff', fontSize: '65px' };
        var subOpeningText = { fill: '#fff', fontSize: '45px' };
        //text
        var pause = this.add.text(20, 20, '||', buttonText).setScrollFactor(0).setInteractive();
        var currLevel = this.add.text(80, 20, 'Level - 1', topText).setScrollFactor(0);
        var playerHealth = this.add.text(550, 20, 'Life : 3', topText).setScrollFactor(0);
        var stageLevel = this.add.text(270, 150, 'Level 1', openingText).setScrollFactor(0);
        var ready = this.add.text(340, 230, 'Ready', subOpeningText).setScrollFactor(0);
        var go = this.add.text(340, 230, 'Go!!!', subOpeningText).setScrollFactor(0);
        //hideText
        go.visible = false;
        //openingText
        this.time.delayedCall(500, function () {
            ready.visible = false;
            go.visible = true;
        }, [], this);
        this.time.delayedCall(1000, function () {
            ready.visible = false;
            go.visible = false;
            stageLevel.visible = false;
        }, [], this);
        //buttons
        pause.on('pointerdown', function () {
            _this.scene.launch('pause', { level: 1 });
            _this.scene.pause();
        });
        pause.on('pointerover', function () {
            pause.setStyle({ fill: '#ff0' });
        });
        pause.on('pointerout', function () {
            pause.setStyle({ fill: '#fff' });
        });
        //add player
        player = this.add.sprite(400, 450, 'player').setScale(0.65).setScrollFactor(0);
        //this.input.enable(player);
        //let drag = this.input.setDraggable(player, true);
        cursors = this.input.keyboard.createCursorKeys();
    };
    Level1.prototype.update = function () {
        var cam = this.cameras.main;
        var speed = 5;
        if (status) { //keep camera moving
            cam.scrollX += speed;
            if (cursors.left.isDown) {
                player;
            }
            else if (cursors.right.isDown) {
            }
        }
    };
    Level1.prototype.onDown = function (sprite, pointer) {
        console.log("FY");
    };
    return Level1;
}(phaser_1["default"].Scene));
exports["default"] = Level1;
