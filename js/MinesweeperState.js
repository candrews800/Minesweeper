function MinesweeperState() {
    GameState.call(this);
};

MinesweeperState.prototype.init = function(canvas, canvasId, col, row, tileSize) {
    this.row = row;
    this.col = col;
    this.tileSize = tileSize;
    this.width = col*tileSize;
    this.height = row*tileSize;
    this.canvas = canvas;
    this.canvasId = canvasId;
    this.objects = [];

    this.initInput();
    this.initTiles();

};

MinesweeperState.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

MinesweeperState.prototype.initTiles = function() {
    var row, col;

    // Set Initial Tiles
    for(col = 0; col < this.col; col++) {
        for(row = 0; row < this.row; row++) {
            this.objects.push(new Tile(col,row,this.tileSize));

            if((row*2 + col*13) % 9 == 7){
                this.objects[this.objects.length - 1].setType('BOMB');
            } else {
                this.objects[this.objects.length - 1].setType('SAFE');
            }
        }
    }

    for (var i=0; i<this.objects.length; i++) {
        if (this.objects[i].type == 'SAFE') {
            this.objects[i].getNearbyBombs(this.objects);
        }
        this.objects[i].update();
    }
};

MinesweeperState.prototype.processEvents = function() {
    // Get Input Events
    var events = this.input.getEvents();

    // Process Input
    var e;
    while (e = events.pop()) {
        this.processInputEvents(e);
    }
};

MinesweeperState.prototype.doLogic = function() {
    this.updateObjects();
};

MinesweeperState.prototype.render = function() {
    this.canvas.clear();
    this.renderObjects();
};

MinesweeperState.prototype.processInputEvents = function(event) {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].processInput(event);
    }
};

MinesweeperState.prototype.updateObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].update();
    }
};

MinesweeperState.prototype.renderObjects = function() {
    for (var i=0; i<this.objects.length; i++) {
        this.objects[i].render(this.canvas.getContext());
    }
};