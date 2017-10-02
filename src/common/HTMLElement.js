HTMLElement.prototype.removeClass || (HTMLElement.prototype.removeClass = function(remove) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== remove) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName;
});

HTMLElement.prototype.hasClass || (HTMLElement.prototype.hasClass = function(cls) {
    return (' ' + this.className + ' ').indexOf(' ' + cls + ' ') > -1;
});

HTMLElement.prototype.addClass || (HTMLElement.prototype.addClass = function(add) {
    if(this.hasClass(add)) return;
    this.className += ' ' + add;
});

HTMLElement.prototype.remove || (HTMLElement.prototype.remove = function() {
    this.parentElement.removeChild(this);
});