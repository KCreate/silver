# Silver
__Silver__ is a fast, powerful and lightweight __1KB!__ event management library for node. It's written in plain Javascript, has __no dependencies__ and great documentation. Check out the example.js file included in this repository.

# How to install
```
npm install silverjs
```
Once you've installed it with npm, you can compress it with gulp-uglify by just running gulp against the directory. However this is not required.

# Usage
Below are some examples on how to use silver.

### Import
```javascript
var Silver = require('silverjs');
```

### Creating a new silver object
You should always pass the same name you took for your variable into the Silver initializer. If you don't pass anything, Silver will just use the current ```Date.now()``` value.
```javascript
var abc = new Silver("abc");
```

### Add a new event
___addEvent(eventName)___
```javascript
var abc = new Silver("abc");
abc.addEvent("myEvent");
```

### Remove an event
___removeEvent(eventName)___
```javascript
var abc = new Silver("abc");
abc.addEvent("myEvent");
abc.removeEvent("myEvent");
```

### Check if an event exists
___hasEvent(eventName)___
```javascript
var abc = new Silver("abc");
abc.addEvent("myEvent");
var hasEvent = abc.hasEvent("myEvent"); // true
```

### Subscribe to an event
___subscribeToEvent(object, eventName, callback)___
When you try to subscribe to an event that doesn't exist, the callback will be called immediately with the following content:
```json
{
	"error": {
		"message":"An event called myEvent doesn't exist."
	}
}
```

To send data back to the caller of the event, return it in the callback
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data) {
        if(data.err){
			// handle error
		}

		return data+" world";
});
```

### Unsubscribing from an event
___unsubscribeFromEvent(object, eventName)___
Unsubscribing from an event that doesn't exist, or you're not subscribed to in the first place, will return __false__. On success it will return __true__;
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){
        if(data.error){
			// handle error
		}

		return data+" world";
});
def.unsubscribeFromEvent(abc, "myEvent");
```

### Get all subscribers for an event
___subscribersForEvent(eventName)___
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){

});
var subscribers = abc.subscribersForEvent("myEvent");
```
The content of subscribers will be:
```javascript
[
	{
		object:[Silver],
		name:'abc',
		callback:[
			Function
		]
	}
]
```

### Check if an object is subscribed to another
#### isSubscribed(object, eventName)
This returns false if the object is not subscribed or if the event doesn't exist.
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){
        // do stuff with data
});
var subscribed = def.isSubscribed(abc, "myEvent"); // true
```

### Fire an event
#### fireEvent(eventName, parameters, callback)
The responses variable in the callback contains the responses that get returned in the ```subscribeToEvent``` method.
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){
        return data + " world";
});
abc.fireEvent("myEvent", "hello", function(responses) {
        // [ 'hello world' ]
});
```