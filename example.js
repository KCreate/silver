/*
Copyright (c) <2015> <Leonard Schuetz>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var Silver = require("./index.js");

/*
	Initializing a new Silver object
	new Silver() takes 1 parameter
		- objectName
	The first is the name of the new object.
	It's good practice to just enter the same name the variable has.
*/

var abc = new Silver("abc");



/*
	Adding a new event to an object
*/
var abc = new Silver("abc");
abc.addEvent("myEvent");



/*
	Remove an event

	removeEvent takes 1 parameter
		- eventName
	The first is the name of the event you want to remove
*/
var abc = new Silver("abc");

abc.addEvent("myEvent");
abc.removeEvent("myEvent");



/*
	Check if an object has an event

	hasEvent takes 1 parameter
		- eventName
	The first is the name of the event you want to check for
*/
var abc = new Silver("abc");
abc.addEvent("myEvent");
var hasEvent = abc.hasEvent("myEvent"); // true



/*
	Subscribing to an event from another object

	subscribeToEvent takes 3 parameters:
		- object
		- eventName
		- callback
	The first is the object that fires the event
	The second is the name of the event you want to subscribe to
	The third is a method that gets called when the event is fired

	To send data back to the caller of the event, return it in the callback
*/

/*
	If the object already has a subscription, it will be replaced.
*/
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data) {
	// do something with data
});



/*
	Unsubscribing from an event

	unsubscribeFromEvent takes 2 parameters
		- object
		- eventName
	The first is the object that fires the event
	The second is the name of the event you want to unsubscribe from
*/

var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){
	// do something with data
});
def.unsubscribeFromEvent(abc, "myEvent");



/*
	When you try to subscribe to an event that doesn't exist,
	the callback will be called immediately with the following content

	{
		"error": {
			"message":"An event called myEvent doesn't exist."
		}
	}
*/
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("randomName");
def.subscribeToEvent(abc, "myEvent", function(data) {
	if (data.error) {
		// an error happened
	}
});



/*
	Get all subscribers for a local event

	subscribersForEvent takes 1 parameter
		- eventName
	The first is the name of the event we want to get the subscribers for
*/

var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){

});
var subscribers = abc.subscribersForEvent("myEvent");
/*
	Output:

	[
	   {
	      object:[SilverObject],
	      name:'abc',
	      callback:[
	         Function
	      ]
	   }
	]
*/



/*
	Checking if an object is subscribed to another

	isSubscribed takes 2 parameters
		- object
		- eventName
	The first is the object that fires the event
	The second is the name of the event that has to be checked

	This returns false if the object is not subscribed
	or if the event doesn't exist.
*/

var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){
	// do stuff with data
});
var subscribed = def.isSubscribed(abc, "myEvent"); // true



/*
	Fire an event

	fireEvent takes 3 parameters
		- eventName
		- params
		- responseCallback
	The first is the name of the event you want to fire
	The second is the object that gets passed to all the subscribers
	The third is a callback that gets all the responses from the subscribers

	This is the value you return in the callback in the subscribeToEvent method
*/
var abc = new Silver("abc");
var def = new Silver("def");

abc.addEvent("myEvent");
def.subscribeToEvent(abc, "myEvent", function(data){
	return data + " world";
});
abc.fireEvent("myEvent", "hello", function(responses) {
	// [ 'hello world' ]
});
