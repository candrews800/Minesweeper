function Game(title) {
    this.title = title;
};

Game.prototype.init = function(ball) {
    this.ball = ball;
    this.ball.setXVel(3);
    this.ball.setYVel(5);
};

Game.prototype.setCanvas = function(Canvas) {
    this.canvas = Canvas;
};

Game.prototype.loop = function() {
    // Clear Screen
    this.canvas.clear();

    // Get Input

    // Do Updates
    this.ball.updatePos(this.canvas.getWidth(), this.canvas.getHeight());

    // Render
    this.ball.render(this.canvas.getContext());
};