function Button(options) {
    if (options.renderStyle == "center") {
        this.x = options.x - options.w/2;
    } else {
        this.x = options.x;
    }
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;

    GameObject.call(this, this.x, this.y);

    this.text = options.text;
    this.onClick = options.onClick;
    this.backgroundColor = 'red';
    this.fontColor = 'black';
    this.font = "20px serif";
    this.textBaseLine = "middle";
    this.textAlign = "center";

    /**
     * Check is mouse is hovering a button
     * @param event
     */
    this.isBeingHovered = function(event) {
        var x = event.offsetX;
        var y = event.offsetY;

        var insideX = this.x < x && x <= this.x + this.w;
        var insideY = this.y < y && y <= this.y + this.h;

        return insideX && insideY;
    };

    console.log(this);
};

Button.prototype.update = function() {

};

Button.prototype.render = function(ctx) {
    // Fill BG
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // Write Text
    ctx.fillStyle = this.fontColor;
    ctx.font = this.font;
    ctx.textBaseLine = this.textBaseLine;
    ctx.textAlign = this.textAlign;
    ctx.fillText(this.text, this.x + this.w/2, this.y + this.h/2);
};

Button.prototype.processInput = function(event) {
    if (typeof event === 'undefined') {
        return;
    }

    if (event.constructor.name === 'MouseEvent' && this.isBeingHovered(event)) {
        if (event.type == 'mousemove') {

        }

        if (event.type == 'click') {
            this.onClick();
        }
    }
};