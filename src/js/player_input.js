function PlayerInput() { };

PlayerInput.isEnabled = false;

PlayerInput.prototype = {
    onMove: function(pointer, x, y) {
        if (PlayerInput.isEnabled) {
            this.movePlayer(pointer.worldX, pointer.worldY, true);
        }
    },
    onStart: function(pointer, event) {
        PlayerInput.isEnabled = true;
        this.movePlayer(pointer.worldX, pointer.worldY, true);
    },
    onEnd: function(pointer, event) {
        if (PlayerInput.isEnabled) {
            PlayerInput.isEnabled = false;
            this.movePlayer(pointer.worldX, pointer.worldY, false);
        }
    }
};
