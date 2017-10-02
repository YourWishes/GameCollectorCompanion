Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1
});

Array.prototype.removeObject || (Array.prototype.removeObject = function(o) {
    let i = this.indexOf(o);
    if(i != -1) {
        this.splice(i, 1);
    }
    return this;
});

Array.prototype.randomElement || (Array.prototype.randomElement = function() {
	return this[Math.floor(Math.random()*this.length)];
});

Array.prototype.shuffle || (Array.prototype.shuffle = function() {
	var i = this.length;
	while (i) {
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
    return this;
});

Array.prototype.contains || (Array.prototype.contains = function(data) {
    return this.indexOf(data) !== -1;
});

Array.prototype.find || (Array.prototype.find = function(predicate) {
    // 1. Let O be ? ToObject(this value).
    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    var len = o.length >>> 0;

    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }

    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
    var thisArg = arguments[1];

    // 5. Let k be 0.
    var k = 0;

    // 6. Repeat, while k < len
    while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
        }
        // e. Increase k by 1.
        k++;
    }
    // 7. Return undefined.
    return undefined;
});