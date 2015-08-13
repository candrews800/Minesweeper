function Tile(x, y, tileSize) {
    GameObject.call(this, x, y);

    this.w = tileSize;
    this.h = tileSize;
}

Tile.prototype.setType = function(type) {
    this.type = type;
};

Tile.prototype.render = function(ctx) {
    if (this.type == 'SAFE') {
        ctx.fillStyle = '#cccccc';
    } else if (this.type == 'BOMB') {
        ctx.fillStyle = 'blue';
    } else {
        ctx.fillStyle = '#000000';
    }
    ctx.fillRect(this.x, this.y, this.w, this.h);
};