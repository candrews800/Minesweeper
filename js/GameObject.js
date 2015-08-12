function GameObject(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

GameObject.prototype.setXVel = function(xVel) {
    this.xVel = xVel;
};

GameObject.prototype.setYVel = function(yVel){
    this.yVel = yVel;
};

GameObject.prototype.updatePos =  function(containerWidth, containerHeight) {
    this.x += this.xVel;
    this.y += this.yVel;

    if (this.x + this.w > containerWidth) {
        this.x = containerWidth - this.w;
        this.xVel *= -1;
    } else if (this.x < 0) {
        this.x = 0;
        this.xVel *= -1;
    }

    if (this.y + this.h > containerHeight) {
        this.y = containerHeight - this.h;
        this.yVel *= -1;
    } else if (this.y < 0) {
        this.y = 0;
        this.yVel *= -1;
    }
};

GameObject.prototype.render = function(ctx) {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.w, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};