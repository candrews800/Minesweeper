function Game(title) {
    this.title = title;
};

Game.prototype.init = function() {
    var row, col;

    this.tiles = [];

    for(row = 0; row < 8; row++) {
        this.tiles[row] = [];
        for(col = 0; col < 8; col++) {
            this.tiles[row][col] = new Tile(row*75,col*75,75,75);

            if((row*2 + col*13) % 9){
                this.tiles[row][col].setType('BOMB');
            } else {
                this.tiles[row][col].setType('SAFE');
            }
        }
    }
};

Game.prototype.setCanvas = function(Canvas) {
    this.canvas = Canvas;
};

Game.prototype.loop = function() {
    // Clear Screen
    this.canvas.clear();

    // Get Input

    // Do Updates

    // Render
    this.renderObjects();
};

Game.prototype.renderObjects = function() {
    var row, col;

    if(this.tiles !== 'undefined') {
        for(row = 0; row < 8; row++) {
            for(col = 0; col < 8; col++) {
                this.tiles[row][col].render(this.canvas.getContext());
            }
        }
    }
};