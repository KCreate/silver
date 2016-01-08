console.log([
    '',
    '# chainability.js',
    '\t- Testing if chainability works.',
    '\t- 3 Tests'
].join('\n'));

var Silver = require('../index.js');

var abc = new Silver('abc');
var def = new Silver('def');

// Add a new event and check if it exists
var test1 = abc.addEvent('test').hasEvent('test');
if (test1) {
	console.log("# Test 1 passed");
} else {
	console.log("# Test 1 failed");
}

// Subscribe to an event and check if the object is subscribed
var test2 = def.subscribeToEvent(abc, 'test', function(data) {
	return "hello " + data;
}).isSubscribed(abc, 'test');
if (test2) {
	console.log("# Test 2 passed");
} else {
	console.log("# Test 2 failed");
}

// Fire an event and delete it afterwards
abc.fireEvent('test', "world", function(response) {
	if (response.def == "hello world") {
		console.log("# Test 3 passed");
	} else {
		console.log("# Test 3 failed");
	}
}).removeEvent('test');
