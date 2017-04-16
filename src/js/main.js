var RPG = RPG || {};

RPG.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

RPG.game.state.add('Boot', RPG.Boot);
RPG.game.state.add('Preload', RPG.Preload);
RPG.game.state.add('Game', RPG.Game);

RPG.game.state.start('Boot');
