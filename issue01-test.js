var Silver = require('./index.js');

// create some objects
var abc = new Silver('abc');
var def = new Silver('def');

// register a new event
abc.addEvent('test');

// subscribe to that event
def.subscribeToEvent(abc, 'test', function (data) {
	return "hello " + data;
});

// get all subscribers for the event
var subscribers = abc.subscribersForEvent('test');
if (subscribers.length == 1) {
	console.log("# Test 1 passed!");
} else {
	console.log("# Test 1 failed!");
}

// try to overwrite the last subscription
def.subscribeToEvent(abc, 'test', function (data) {
	return "goodbye " + data;
});

// get all subscribers for the event
subscribers = abc.subscribersForEvent('test');
if (subscribers.length == 1) {
	console.log("# Test 2 passed!");
} else {
	console.log("# Test 2 failed!");
}
