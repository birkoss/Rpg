var RPG = RPG || {};

RPG.Preload = function() {};

RPG.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.set(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.tilemap('level1', 'tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('gameTiles', 'images/floor.png');
        this.load.image('gameTrees', 'images/tree0.png');

        this.load.image('door', 'images/door.png');
        this.load.image('item', 'images/item.png');
        this.load.spritesheet('player', 'images/player.png', 16, 16);
        this.load.image('move', 'images/move.png');
    },
    create: function() {
        this.state.start('Game');
    }
};
