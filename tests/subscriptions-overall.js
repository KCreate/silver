/*
	This is a test file for to test if all the basic subsription methods work
*/

var Silver = require('../index.min.js');

var abc = new Silver('abc');
var def = new Silver('def');
var ghi = new Silver('ghi');

abc.addEvent('test');

def.subscribeToEvent(abc, 'test', function (data) {
	if (data.error) {
		console.log(data.error);
	}

	return "hello " + data + "!";
});

ghi.subscribeToEvent(abc, 'test', function (data) {
	if (data.error) {
		console.log(data.error);
	}

	return "goodbye " + data + "!";
});

abc.fireEvent('test', "world", function (responses) {
	var expexted = {
		def: 'hello world!',
		ghi: 'goodbye world!'
	};

	if (responses.def == expexted.def && responses.ghi == expexted.ghi) {
		console.log("# Test 1 passed");
	} else {
		console.log("# Test 1 failed");
	}
});

abc.removeEvent('something');
