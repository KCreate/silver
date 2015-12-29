/*
	This tests if event transfering works
*/

var Silver = require('../index.js');

var abc = new Silver('abc');
var def = new Silver('def');

// Create a new event
abc.addEvent('test1');

// Subscribe to the event
def.subscribeToEvent(abc, 'test1', function(data) {
	return "hello " + data;
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
	if (responses.def == "hello world") {
		console.log("# Test 2 passed");
	} else {
		console.log("# Test 2 failed");
	}
})
