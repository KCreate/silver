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
	console.log("# Subscriber 1 called.");
	if (data.error) {
		console.log("# First error passed.");
	}
});
ghi.subscribeToEvent(abc, 'something', function (data) {
	console.log("# Subscriber 2 called.");
	if (data.error) {
		console.log("# Second error passed.");
	}
});

abc.removeEvent('something');
