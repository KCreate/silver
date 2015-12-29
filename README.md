### Silver
__Silver__ is a fast, powerful and lightweight __1KB!__ event management library for node. It's written in plain Javascript and has __no dependencies__.

NPM page: [silverjs](https://www.npmjs.com/package/silverjs)

Github page: [kcreate/silver](https://github.com/KCreate/silver)

### How to install

```sh
npm install --save silverjs
```
```javascript
var Silver = require('silverjs');
```
Once you've installed it with npm, you can compress it by just running gulp against the directory and then replacing the index.js with index.min.js. However this is not required.

___

### Creating a new silver object
___new Silver(name = Date.now()+"")___

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

Removing an event that has active subscriptions, will fire the callbacks of the subscribers with the following data:
```json
{
	"error":{
		"Event got removed while still being subscribed."
	}
}
```

___removeEvent___ also takes a second parameter, but it's only used internally.

### Check if an event exists
___hasEvent(eventName)___

```javascript
var abc = new Silver("abc");
abc.addEvent("myEvent");
var hasEvent = abc.hasEvent("myEvent"); // true
```

### Subscribe to an event
___subscribeToEvent(object, eventName, callback)___

To send data back to the caller of the event, return it in the callback
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data) {
        if(data.error){
			// handle error
		}

		return data+" world";
});
```

When you try to subscribe to an event that doesn't exist, the callback will be called immediately with the following content:
```json
{
	"error": {
		"message":"An event called myEvent doesn't exist."
	}
}
```

If the object already has a subscription, it will be __replaced__.

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
___isSubscribed(object, eventName)___

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
___fireEvent(eventName, parameters, callback)___

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

### Transfering an event
___transferEvent(object, eventName, keepSubscriptions, overwriteExisting)___

This transfer an event from the owner to a new object. If __keepSubscriptions__ is set to true, all subscriptions will be transfered over. If they are being removed, all callbacks will receive an error with the following content:
```json
{
	"message":"Event got transfered to another object",
	"newObject":object
}
```

If __overwriteExisting__ is set to true, it will overwrite an existing event with the same name on the new object. If __keepSubscriptions__ and __overwriteExisting__ are both set to true, Silver will try to merge all subscriptions into one event. If an object is subcribed to both events, the subscription to the overwritten event will be removed.

### Chainability

You can also chain most methods with each other. So for example if you'd wanted to add a new event and then immediately check if it really got created, you could write that like this:
```javascript
var abc = new Silver('abc');
var exists = abc.addEvent('test').hasEvent('test');
// -> true
```

Or if you want to fire an event and then immediately remove it afterwards
```javascript
abc.fireEvent('test', "world", function(response) {
	// your code goes here
}).removeEvent('test');
// -> abc does not have the event 'test' anymore
```

### Error handling

Most of the time if an error happens, it will be reported via the callback specified in the subscribeToEvent method.

An error report always looks like this:
```json
{
	"error":{
		"message":"Some error message..."
	}
}
```

You should aways check for a error object inside the callback method like that:
```javascript
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data) {
    if (data.error){
		// check the message here
		console.log(data.error.message);
	}
});
```

### License

This library is licensed under the [MIT License](https://opensource.org/licenses/MIT).
