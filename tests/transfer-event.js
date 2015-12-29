/*
	This tests if event transfering works
*/

var Silver = require('../index.js');

var abc = new Silver('abc');
var def = new Silver('def');
var ghi = new Silver('ghi');

// Create a new event
abc.addEvent('test1');
def.addEvent('test1');

// Subscribe to the event
def.subscribeToEvent(abc, 'test1', function(data) {
	return "hello " + data;
})
def.subscribeToEvent(def, 'test1', function(data) {
	return "goodbye " + data;
})
ghi.subscribeToEvent(abc, 'test1', function(data) {
	return "welcome " + data;
})

// Transfer the event
abc.transferEvent(def, 'test1', true, true);

// Check if def now owns the event
if (def.hasEvent('test1') && !abc.hasEvent('test1')) {
	console.log("# Test 1 passed");
} else {
	console.log("# Test 1 failed");
}

def.fireEvent('test1', "world", function(responses) {
	if (responses.def == "hello world" && responses.ghi == "welcome world") {
		console.log("# Test 2 passed");
	} else {
		console.log("# Test 2 failed");
	}
})
