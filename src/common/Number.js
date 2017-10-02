Number.prototype.pad || (Number.prototype.pad = function(size) {
	let s = "" + this;
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
});