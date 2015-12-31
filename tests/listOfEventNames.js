var Silver = require('../index.js');

var abc = new Silver('abc');

abc.addEvent('test1');
abc.addEvent('test2');
abc.addEvent('test3');

var events = abc.events();
console.log(events);
if (events[0] == 'test1' && events[1] == 'test2' && events[2] == 'test3') {
	console.log('# Test 1 passed');
} else {
	console.log('# Test 1 failed');
}
