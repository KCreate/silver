/*
	This is a test file for the feature that the removeEvent function,
	notifies all subscribers of an event that the event has been removed.
*/

var Silver = require('../index.js');

var abc = new Silver('abc');
var def = new Silver('def');
var ghi = new Silver('ghi');

abc.addEvent('something');

def.subscribeToEvent(abc, 'something', function (data) {
	if (data.error) {
		console.log("# Test 1 passed.");
	}
});
ghi.subscribeToEvent(abc, 'something', function (data) {
	if (data.error) {
		console.log("# Test 2 passed.");
	}
});

abc.removeEvent('something');

if (!abc.hasEvent('something')) {
	console.log("# Test 3 passed.");
} else {
	console.log("# Test 3 failed.");
}
