function Canvas(canvasId, width, height){
    this.width = width;
    this.height = height;

    var canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");

    this.clearScreen = function() {
        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.fillRect(0,0,canvas.width,canvas.height);
    };
};

Canvas.prototype.clear = function() {
    this.clearScreen();
};

Canvas.prototype.getContext = function() {
    return this.ctx;
};

Canvas.prototype.getWidth = function() {
    return this.width;
};

Canvas.prototype.getHeight = function() {
    return this.height;
}