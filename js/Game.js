function Game(canvasId, title, row, col, tileSize) {
    this.title = title;
    this.row = row;
    this.col = col;
    this.tileSize = tileSize;
    this.width = row*tileSize;
    this.height = col*tileSize;
    this.canvasId = canvasId;

    this.init();
};

Game.prototype.init = function() {
    this.initCanvas();
    this.initInput();
    this.initTiles();
};

Game.prototype.initCanvas = function() {
    this.canvas = new Canvas(this.canvasId, this.width, this.height);
};

Game.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

Game.prototype.initTiles = function() {
    var row, col;

    this.tiles = [];

    for(row = 0; row < this.row; row++) {
        this.tiles[row] = [];
        for(col = 0; col < this.col; col++) {
            this.tiles[row][col] = new Tile(row*this.tileSize,col*this.tileSize,this.tileSize);

            if((row*2 + col*13) % 9){
                this.tiles[row][col].setType('BOMB');
            } else {
                this.tiles[row][col].setType('SAFE');
            }
        }
    }
};

Game.prototype.loop = function() {
    // Clear Screen
    this.canvas.clear();

    // Get Input
    var events = this.input.getEvents();

    // Process Input
    while (events.length > 0) {
        var event = events.pop();
        console.log(event.type);
    }

    // Do Updates


    // Render
    this.renderObjects();
};

Game.prototype.renderObjects = function() {
    var row, col;

    if(this.tiles !== 'undefined') {
        for(row = 0; row < this.row; row++) {
            for(col = 0; col < this.col; col++) {
                this.tiles[row][col].render(this.canvas.getContext());
            }
        }
    }
};