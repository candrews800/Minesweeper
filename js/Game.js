function Game() {

}

Game.getInstance = function () {
    if (!Game.instance) {
        Game.instance = new Game();
    }
    return Game.instance;
};

Game.prototype.init = function(canvasId, title, col, row, tileSize) {
    this.title = title;
    this.width = col*tileSize;
    this.height = row*tileSize;
    this.row = row;
    this.col = col;
    this.tileSize = tileSize;
    this.canvasId = canvasId;

    this.initCanvas();
    this.initEvents();
    this.initStartMenuStart();
};

Game.prototype.initStartMenuStart = function() {
    this.currentState = new StartMenuState(this.canvas, this.canvasId, this.width, this.height);
};

Game.prototype.initMinesweeperState = function(canvas, canvasId, col, row, tileSize) {
    this.currentState = new MinesweeperState();
    this.currentState.init(canvas, canvasId, col, row, tileSize);
};

Game.prototype.initCanvas = function() {
    this.canvas = new Canvas(this.canvasId, this.width, this.height);
};

Game.prototype.initInput = function() {
    this.input = new Input();
    this.input.addWatchers(this.canvasId);
};

Game.prototype.initEvents = function() {
    var that = this;

    this.event = new GameEvent();
    this.event.addListener('bomb-click', function() {
        alert('You clicked a bomb');
    });
    this.event.addListener('start', function(options) {
        that.initMinesweeperState(that.canvas, that.canvasId, options.col, options.row, options.tileSize);
    });
};

Game.prototype.loop = function() {
    this.currentState.processEvents();
    this.currentState.doLogic();

    // Process Global Events
    this.event.process();

    this.currentState.render();
};

Game.fireEvent = function(event_name, options) {
    var game = Game.getInstance();
    game.event.fire(event_name, options);
};