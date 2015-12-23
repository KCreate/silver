/*
	This file is for development only.

	This is a test file for the feature that the removeEvent function,
	notifies all subscribers of an event that the event has been removed.
*/

var Silver = require('./index.js');

var abc = new Silver('abc');
var def = new Silver('def');
var ghi = new Silver('ghi');

abc.addEvent('something');

def.subscribeToEvent(abc, 'something', function (data) {
	if (data.error) {
		console.log(data.error);
	}
});
ghi.subscribeToEvent(abc, 'something', function (data) {
	if (data.error) {
		console.log(data.error);
	}
});

abc.removeEvent('something');
