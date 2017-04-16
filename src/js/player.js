function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    /*
    this.anchor.set(0.5, 0.5);

    this.x += this.width/2;
    this.y += this.height/2;
    */

    this.animations.add('moving', [0, 1], 2, true);

    this.animations.play('moving');

    //this.scale.x = -1;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function() {
    if (this.path.length > 0) {
        let single_path = this.path.shift();

        /*
        if (single_path.x*this.width < this.x) {
            this.scale.x = 1;
        } else {
            this.scale.x = -1;
        }
        */

        let tween = this.game.add.tween(this).to({x: single_path.x*this.width, y: single_path.y*this.height}, 130).start();
        tween.onComplete.add(this.move, this);
    } else {
        console.log('.....DONE.....');
    }
};

Player.prototype.follow = function(path) {
    this.path = path;
    this.move();
};

Player.prototype.onMoveCompleted = function() {
    console.log('moved...');
};
