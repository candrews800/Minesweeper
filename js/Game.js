function Game() {

}

Game.getInstance = function () {
    if (!Game.instance) {
        Game.instance = new Game();
    }
    return Game.instance;
};

Game.prototype.init = function(canvasId, title, width, height) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.canvasId = canvasId;
    this.padding = {
        left: 15,
        top: 100,
        right: 15,
        down: 15
    };

    this.initCanvas();
    this.initEvents();
    this.initStartMenuStart();
};

Game.prototype.initStartMenuStart = function() {
    this.currentState = new StartMenuState(this.canvas, this.canvasId, this.width, this.height);
};

Game.prototype.initMinesweeperState = function(options) {
    this.currentState = new MinesweeperState();
    this.currentState.init({
        canvas: this.canvas,
        canvasId: this.canvasId,
        col: options.col,
        row: options.row,
        padding: this.padding,
        bombCount: options.bombCount
    });
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
        that.initMinesweeperState(options);
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

Game.fireStateEvent = function(event_name, options) {
    var game = Game.getInstance();
    game.currentState.event.fire(event_name, options);
};

Game.getDim = function() {
    var game = Game.getInstance();
    return {
        width: game.width,
        height: game.height
    }
};