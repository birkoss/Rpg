var RPG = RPG || {};

RPG.Game = function() {};

RPG.Game.prototype = {
    /* Phaser */
    create: function() {
        this.map = this.game.add.tilemap('level1');

        this.map.addTilesetImage('Floor', 'gameTiles');
        this.map.addTilesetImage('Tree0', 'gameTrees');

        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        this.map.setCollisionBetween(1, 1000, true, 'blockedLayer');
        this.backgroundLayer.resizeWorld();

        this.createItems();
        this.createDoors();

        this.createPlayer();

        this.indications = this.game.add.group();
        
        let player_input = new PlayerInput();

        this.game.input.onDown.add(player_input.onStart, this);
        this.game.input.addMoveCallback(player_input.onMove, this);
        this.game.input.onUp.add(player_input.onEnd, this);
    },
    update: function() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= 50;
        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += 50;
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
        }

        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
    },

    movePlayer: function(x, y, onlyPreview) {

        var x = this.backgroundLayer.getTileX(Math.floor(x));
        var y = this.backgroundLayer.getTileY(Math.floor(y));

        let PF = new PathFinding(this.blockedLayer.layer.data, this.blockedLayer.layer.width, this.blockedLayer.layer.width, this.blockedLayer.layer.height);
        let path = PF.find({x:this.player.x/this.player.width, y:this.player.y/this.player.height}, {x:x, y:y});

        this.indications.removeAll();

        if (onlyPreview) {
            let lastPosition = {x:this.player.x/this.player.width, y:this.player.y/this.player.height};
            path.forEach(function(item) {
                let sprite = this.indications.create(item.x * 16, item.y * 16, 'move');
                sprite.x += sprite.width/2;
                sprite.y += sprite.height/2;
                sprite.anchor.set(0.5, 0.5);

                let diffX = item.x - lastPosition.x;
                let diffY = item.y - lastPosition.y;

                if (diffX == 1 && diffY == 0) {
                    sprite.angle = 90;
                } else if (diffX == -1 && diffY == 0) {
                    sprite.angle = 270;
                } else if (diffX == 0 && diffY == 1) {
                    sprite.angle = 180;
                }

                lastPosition = {x: item.x, y: item.y};
            }, this);
        } else {
            this.player.follow(path);
        }
    },
    collect: function(player, item) {
        item.kill();
    },
    enterDoor: function(player, door) {
        door.body.enable= false;
        console.log('Goto : ' + door.targetTilemap);
    },
    createPlayer: function() {
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

        this.player = new Player(this.game, result[0].x, result[0].y);
        this.game.add.existing(this.player);
        this.game.physics.arcade.enable(this.player);

        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    createDoors: function() {
        this.doors = this.game.add.group();
        this.doors.enableBody = true;

        this.findObjectsByType('door', this.map, 'objectsLayer').forEach(function(element) {
            this.createFromTiledObject(element, this.doors);
        }, this);
    },
    createItems: function() {
        this.items = this.game.add.group();
        this.items.enableBody = true;

        this.findObjectsByType('item', this.map, 'objectsLayer').forEach(function(element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    createFromTiledObject: function(element, group) {
        let sprite = group.create(element.x, element.y, element.properties.sprite);

        /* Copy all properties from the tilemap */
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
    findObjectsByType: function(type, map, layer) {
        var result = new Array();

        map.objects[layer].forEach(function(element) {
            if (element.properties.type == type) {
                result.push(element);
            }
        });

        return result;
    }
};
