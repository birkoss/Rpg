function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.spriteSize = this.width;

    this.anchor.set(0.5, 0.5);
    this.x += this.width/2;
    this.y += this.height/2;

    this.animations.add('moving', [0, 1], 2, true);
    this.animations.play('moving');
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function() {
    if (this.path.length > 0) {
        let single_path = this.path.shift();

        let newX = (single_path.x * this.spriteSize) + (this.spriteSize/2);
        let newY = (single_path.y * this.spriteSize) + (this.spriteSize/2);

        if (newX < this.x) {
            this.scale.x = 1;
        } else if (newX > this.x) {
            this.scale.x = -1;
        }
        console.log('scale:' + this.scale.x);

        let tween = this.game.add.tween(this).to({x:newX, y:newY}, 130).start();
        tween.onComplete.add(this.move, this);
    } else {
        console.log('.....DONE.....');
    }
};

Player.prototype.follow = function(path) {
    this.path = path;
    this.move();
};

Player.prototype.getGridXY = function(what) {
    let grid = (what == "y" ? this.y : this.x);

    grid -= (this.spriteSize/2);

    return grid / this.spriteSize;
};

Player.prototype.onMoveCompleted = function() {
    console.log('moved...');
};
