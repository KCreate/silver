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

var Silver = function(name) {
	/*
		Default value for the name, casted to a string
		This is used in several comparisons

		Two silver objects shouldn't have the same name, or they will be treated as equal.
		This may cause unexpected behaviour.

		If the name passed is equal to any of the following:
			- undefined
			- null
			- NaN
			- "" or ''
			- false
			- true
			- 0

		it will be replaced by the current value of Date.now() casted to a string
	*/
	if (name !== undefined &&
		name !== null &&
		name !== NaN &&
		name !== "" &&
		name !== '' &&
		name !== false &&
		name !== true &&
		name !== 0)
	{
		this.name = name;
	} else {
		this.name = Date.now()+"";
	}

	/*
		Subscribing to an event

		subscribeToEvent takes 3 parameters:
			- object
			- eventName
			- callback

		The first is the object that own the event
		The second is the name of the event
		The third is the callback that's called when the event fires

		To send data back to the owner of the event, return it in the callback

		If the event doesn't exist, or the object is already subscribed,
		it will return an error formated as specified in the error handling section in the REDME.md file.
	*/
	this.subscribeToEvent = function (object, eventName, callback) {

		// check if object is a silver object
		if (object._isSilverObject) {

			// check if object owns an event called eventName
			if (object.hasEvent(eventName)) {

				// subscribe to the event, this will overwrite existing subscribtions
				object._events[eventName].subscribers[this.name] = {
					object: this,
					callback: callback
				};

			} else {

				// notify the callback that the event doesn't exist
				callback({
					"error": {
						"message":"An event called myEvent doesn't exist."
					}
				});

			}

		} else {

			// notify the callback that the object is not compatible with silver
			callback({
				"error": {
					"message":"object is not a silver compatible."
				}
			});

		}

		// Chainability
		return this;
	};

	/*
		Unsubscribing from an event

		unsubscribeFromEvent takes 2 parameters
			- object
			- eventName

		The first is the object that owns the event
		The second is the name of the event
	*/
	this.unsubscribeFromEvent = function (object, eventName) {

		// check if the object is a silver object
		if (object._isSilverObject) {

			// check if the object owns an event called eventName
			if (object.hasEvent(eventName)) {

				/*
					The subscription is removed using the delete operator
					It doesn't matter if the subscription didn't exist in the first place.
				*/
				delete object._events[eventName].subscribers[this.name];

			}
		}

		// Chainability
		return this;
	};

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
	this.isSubscribed = function (object, eventName) {

		// check if the object owns an event called eventName
		if (object.hasEvent(eventName)) {
			return (object.subscribersForEvent(eventName)[this.name] !== undefined);
		}
		return false;
	};

	/*
		Adding a new event

		addEvent takes 1 parameter
			- eventName

		The first is the name of the new event

		If you pass anything else than a string, it will return false
		If the event already exists, it will remove all subscribers from the event

		If the name passed is equal to any of the following:
			- undefined
			- null
			- NaN
			- "" or ''
			- false
			- true
			- 0

		it will return false
	*/
	this.addEvent = function (eventName) {
		if (typeof eventName === 'string') {
			if (name !== undefined &&
				name !== null &&
				name !== NaN &&
				name !== "" &&
				name !== '' &&
				name !== false &&
				name !== true &&
				name !== 0)
			{
				this._events[eventName] = {
					subscribers: {}
				};

				// Chainability
				return this;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	/*
		Remove an event

		removeEvent takes 2 parameters
			- eventName
			- reason

		The first is the name of the event you want to remove
		The second is a custom error object that is being passed internally, you may not want to use that

		Removing an event that has active subscribtions, will call the callback of the subscribers.

		Setting a custom reason, may be dangerous as most subscribers expect a error.message value.
	*/
	this.removeEvent = function (eventName, reason) {

		// check if the event exists
		if (this.hasEvent(eventName)) {

			// notify all subscribers, that the event is removed
			var subscribers = this._events[eventName].subscribers;
			for (var key in subscribers) {
				if (subscribers.hasOwnProperty(key)) {

					var errorObject = {
						"error":{
							"message":"Event got removed while still being subscribed."
						}
					}

					// If a reason is given, use that
					if (reason) {
						errorObject.error = reason;
					}

					subscribers[key].callback(errorObject);
				}
			}

			// Remove the event
			delete this._events[eventName];
		}

		// Chainability
		return this;
	};

	/*
		Fire an event

		fireEvent takes 3 parameters
			- eventName
			- params
			- responseCallback

		The first is the name of the event you want to fire
		The second is the object that gets passed to all the subscribers
		The third is a callback that gets all the responses from the subscribers

		If the event doesn't exist this will return false
	*/
	this.fireEvent = function (eventName, params, responseCallback) {

		// check if the event exists
		if (this.hasEvent(eventName)) {

			// run the callbacks and return the responses
			var responses = {};
			var subscribers = this._events[eventName].subscribers;
			for (var key in subscribers) {
				if (subscribers.hasOwnProperty(key)) {
					var subscriberResponse = subscribers[key].callback(params);
					if (subscriberResponse !== undefined) {
						responses[subscribers[key].object.name] = subscriberResponse;
					}
				}
			}

			// if there were any responses, return them
			if (responses !== []) {
				responseCallback(responses);
			}

			// Chainability
			return this;

		} else {
			return false;
		}
	};

	/*
		Get all subscribers for a local event

		subscribersForEvent takes 1 parameter
			- eventName

		The first is the name of the event we want to get the subscribers for

		If the event doesn't exist, this will return an empty object
	*/
	this.subscribersForEvent = function (eventName) {

		// check if the event exists
		if (this.hasEvent(eventName)) {
			return this._events[eventName].subscribers;
		} else {
			return {};
		}
	};

	/*
		Check if an event exists

		hasEvent takes 1 parameter
			- eventName

		The first is the name of the event
	*/
	this.hasEvent = function (eventName) {
		return !!(this._events[eventName]);
	};

	/*
		Transfer an event to another

		transferEvent takes 3 parameters
			- object
			- eventName
			- keepSubscriptions
			- overwriteExisting

		The first is the object the event get's transfered to
		The second is the name of the event that get's transfered
		The third is a boolean, which if true, removes all subscriptions on the event
		The fourth is a boolean, which if true, overwrites existing events with the same name on the new object
	*/
	this.transferEvent = function(object, eventName, keepSubscriptions, overwriteExisting) {

		// Check if the event exists
		if (this.hasEvent(eventName)) {

			// Check if the new object doesn't already have the event
			// Ignored if overwriteExisting is set to true
			if (!object.hasEvent(eventName || overwriteExisting)) {

				// Create the new event on the new object
				object.addEvent(eventName);

				// Transfer all the subscribers
				if (keepSubscriptions) {
					object._events[eventName].subscribers = this.subscribersForEvent(eventName);
				}

				// Remove it from the
				this.removeEvent(eventName, {
					message: "Event got transfered to another object",
					newObject: object
				});

			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	/*
		Internal stuff, don't mess with this directly
	*/
	this._events = {};
	this._isSilverObject = true;
};

// export module
module.exports = Silver;
