var RPG = RPG || {};

RPG.Boot = function() {};

RPG.Boot.prototype = {
    preload: function() {
        this.load.image('preloadbar', 'images/preloader-bar.png');
    },
    create: function() {
        this.game.backgroundColor = '#fff';

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.renderer.renderSession.roundPixels = true;  
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};
