console.log([
    '',
    '# subscribtions-overall.js',
    '\t- Testing overall subscription methods',
    '\t- 4 Tests'
].join('\n'));

var Silver = require('../index.js');

var abc = new Silver('abc');
var def = new Silver('def');
var ghi = new Silver('ghi');

abc.addEvent('test');

def.subscribeToEvent(abc, 'test', function (data) {
	return "hello " + data + "!";
});

if (def.isSubscribed(abc, 'test')) {
	console.log("# Test 1 passed");
} else {
	console.log("# Test 1 failed");
}

ghi.subscribeToEvent(abc, 'test', function (data) {
	return "goodbye " + data + "!";
});

abc.fireEvent('test', "world", function (responses) {
	var expexted = {
		def: 'hello world!',
		ghi: 'goodbye world!'
	};

	if (responses.def == expexted.def && responses.ghi == expexted.ghi) {
		console.log("# Test 2 passed");
	} else {
		console.log("# Test 2 failed");
	}
});

abc.removeEvent('test');
if (!abc.hasEvent('test')) {
	console.log('# Test 3 passed');
} else {
	console.log('# Test 3 failed');
}

abc.addEvent('test1');
abc.addEvent('test2');

abc.removeAllEvents();

if (!abc.hasEvent('test1') && !abc.hasEvent('test2')) {
	console.log('# Test 4 passed');
} else {
	console.log('# Test 4 failed');
}
