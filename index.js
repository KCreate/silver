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

/*
	For documentation, look at the example.js file included in this package
*/

module.exports = function(objectName) {
	// Default value for the objectName
	if (objectName===undefined) {
		objectName = Date.now();
	}

	return {
		subscribeToEvent: function(object, eventName, callback){
			if (object._isSilverObject) {
				if (object._events[eventName]) {
					object._events[eventName].subscribers.push({
						object: this,
						name: this.name,
						callback: callback
					});
				} else {
					callback({
						"error": {
							"message":"An event called myEvent doesn't exist."
						}
					});
				}
			}
		},
		unsubscribeFromEvent: function(object, eventName){
			if (object._isSilverObject) {
				if (object.hasEvent(eventName)) {
					object._events[eventName].subscribers.forEach(function(subscriber){
						if (subscriber.name == this.name) {
							var index = object._events[eventName].subscribers.indexOf(subscriber);
							delete object._events[eventName].subscribers[index];
							return true;
						}
					});
					return false;
				} else {
					return false;
				}
			}
		},
		isSubscribed: function(object, eventName){
			if (object.hasEvent(eventName)) {
				var match = false;
				object._events[eventName].subscribers.forEach(function(subscriber) {
					if (subscriber.name == this.name) {
						match = true;
					}
				}.bind(this));
				return match;
			}
			return false;
		},
		addEvent: function(eventName){
			if (!this._events[eventName]) {
				this._events[eventName] = {
					subscribers: []
				};
			} else {
				return false;
			}
		},
		removeEvent: function(eventName){
			if (this._events[eventName]) {
				delete this._events[eventName];
			}
		},
		fireEvent: function(eventName, params, responseCallback){
			if (this._isSilverObject) {
				if (this._events[eventName]) {
					var responses = [];
					this._events[eventName].subscribers.forEach(function(subscriber) {
						var subscriberResponse = subscriber.callback(params);
						if (subscriberResponse !== undefined) {
							responses.push(subscriberResponse);
						}
					});
					responseCallback(responses);
				} else {
					return false;
				}
			}
		},
		subscribersForEvent: function(eventName){
			if (this.hasEvent(eventName)) {
				return this._events[eventName].subscribers;
			}
			return {};
		},
		_events: {},
		hasEvent: function(eventName){
			if (this._events[eventName]) {
				return true;
			}
			return false;
		},
		name: objectName,
		_isSilverObject: true
	};
};
