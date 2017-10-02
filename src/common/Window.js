Window.prototype.getScrollX || (Window.prototype.getScrollX = function() {
	let doc = document.documentElement;
	return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
});

Window.prototype.getScrollY || (Window.prototype.getScrollY = function() {
	let doc = document.documentElement;
	return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
});