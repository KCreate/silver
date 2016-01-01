var Silver = require('../index.js');

var abc = new Silver('abc');
var def = new Silver('def');
var ghi = new Silver('ghi');

abc.addEvent('test1');
abc.addEvent('test2');

def.subscribeToEvent(abc, 'test1', function(data) {})
def.subscribeToEvent(abc, 'test2', function(data) {})
ghi.subscribeToEvent(abc, 'test2', function(data) {})

console.log(abc.subscribersForEvent('test1'));
console.log(abc.subscribersForEvent('test2'));

if (0 == 0) {
	console.log('# Test 1 passed');
} else {
	console.log('# Test 1 failed');
}
