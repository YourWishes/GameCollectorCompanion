String.prototype.isEmail || (String.prototype.isEmail = function() {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this);
});

String.prototype.replaceAll || (String.prototype.replaceAll = function(search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
});

String.prototype.startsWith || (String.prototype.startsWith = function(prefix) {
	return this.slice(0, prefix.length) == prefix;
});

String.prototype.isBlank || (String.prototype.isBlank = function() {
    let str_clone = "" + this;
    str_clone = str_clone.replaceAll(" ", "").replaceAll("\n", "").replaceAll("\r", "");
    return str_clone === "";
});

String.prototype.contains  || (String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
});