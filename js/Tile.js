function Tile(col, row, tileSize) {
    GameObject.call(this, col*tileSize, row*tileSize);

    this.row = row;
    this.col = col;
    this.w = tileSize;
    this.h = tileSize;

    this.revealed = false;

    /**
     * Check is mouse is hovering a tile
     * @param event
     */
    this.isBeingHovered = function(event) {
        var x = event.offsetX;
        var y = event.offsetY;

        var insideX = this.x < x && x <= this.x + this.w;
        var insideY = this.y < y && y <= this.y + this.h;

        return insideX && insideY;
    };

    this.setType = function(type) {
        this.type = type;
    };
}

Tile.prototype.update = function() {
    if (this.clicked) {
        this.revealed = true;
        if (this.type == 'BOMB') {
            Game.fireEvent('bomb-click');
        }
    }

    if (this.revealed) {
        if(this.type == 'SAFE') {
            this.color = '#999999';
        } else if (this.type == 'BOMB') {
            this.color = 'red';
        }
    } else {
        if (this.hovered) {
            this.color = '#bbbbbb';
        } else {
            this.color = '#dddddd';
        }
    }

    // Clear Inputs
    this.hovered = false;
    this.clicked = false;
}

Tile.prototype.render = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    if (this.revealed) {
        ctx.fillStyle = 'black';
        ctx.font = "20px serif";
        ctx.textBaseline = "middle";
        ctx.textAlign="center";
        if (typeof this.nearbyBombs === 'undefined') {
            ctx.font = "10px serif";
            ctx.fillText('*boom*', this.x + this.w/2, this.y + this.h/2);
        } else if (this.nearbyBombs) {
            ctx.fillText(this.nearbyBombs, this.x + this.w/2, this.y + this.h/2);
        } else {

        }

    }
};

Tile.prototype.processInput = function(event) {
    if (typeof event === 'undefined') {
        return;
    }

    if (event.constructor.name === 'MouseEvent' && this.isBeingHovered(event)) {
        if (event.type == 'mousemove') {
            this.hovered = true;
        }

        if (event.type == 'click') {
            this.clicked = true;
        }
    }
};

Tile.prototype.getNearbyBombs = function (allTiles) {
    var i, tile;
    this.nearbyBombs = 0;

    for(i = 0; i < allTiles.length; i++) {
        tile = allTiles[i];

        if (tile.type == 'BOMB') {
            if (tile.row == this.row && tile.col - 1 == this.col) {
                // Up
                this.nearbyBombs++;
            } else if (tile.row - 1 == this.row && tile.col - 1 == this.col) {
                // Up Right
                this.nearbyBombs++;
            } else if (tile.row - 1 == this.row && tile.col == this.col) {
                // Right
                this.nearbyBombs++;
            } else if (tile.row - 1 == this.row && tile.col + 1 == this.col) {
                // Down Right
                this.nearbyBombs++;
            } else if (tile.row == this.row && tile.col + 1 == this.col) {
                // Down
                this.nearbyBombs++;
            } else if (tile.row + 1 == this.row && tile.col + 1 == this.col) {
                // Down Left
                this.nearbyBombs++;
            } else if (tile.row + 1== this.row && tile.col == this.col) {
                // Left
                this.nearbyBombs++;
            } else if (tile.row + 1 == this.row && tile.col - 1 == this.col) {
                // Up Left
                this.nearbyBombs++;
            }
        }
    }
};