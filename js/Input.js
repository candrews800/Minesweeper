function Input(){
    this.events = [];
}

Input.prototype.addWatchers = function(elementId) {
    var that = this;
    var element = document.getElementById(elementId);
    element.addEventListener('click', function(e) {
        that.registerEvent(e);
    });

    element.addEventListener('mousemove', function(e) {
        that.registerHover(e);
    });
};

Input.prototype.registerHover = function(event) {
    this.hover = event;
};

Input.prototype.registerEvent = function(event) {
    this.events.push(event);
};

Input.prototype.getEvents = function() {
    // Get last hover position and add to begin
    this.events.unshift(this.hover);

    return this.events;
};