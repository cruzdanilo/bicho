/*! eth-connect {
  "date": "2021-03-21T16:32:57.841Z",
  "commit": "HEAD",
  "ref": "?"
} */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('eth-connect', ['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ethconnect = {}));
}(this, (function (exports) { 'use strict';

  function toRPC(message) {
      message.jsonrpc = '2.0';
      if (!message.id || typeof message.id !== 'number' || Math.floor(message.id) !== message.id) {
          throw new Error(`Invalid RPC message(invalid id) message: ${JSON.stringify(message)}`);
      }
      if (!message.method || typeof message.method !== 'string' || message.method.trim().length === 0) {
          throw new Error(`Invalid RPC message(invalid method) message: ${JSON.stringify(message)}`);
      }
      if (!message.params || typeof message.params !== 'object') {
          throw new Error(`Invalid RPC message(invalid params) message: ${JSON.stringify(message)}`);
      }
      return message;
  }

  /**
   * @public
   *
   * HttpProvider should be used to send rpc calls over http
   */
  class HTTPProvider {
      constructor(host, options = {}) {
          this.host = host;
          this.options = options;
          this.debug = false;
          this.host = host || 'http://localhost:8545';
      }
      /* istanbul ignore next */
      // tslint:disable-next-line:prefer-function-over-method
      send() {
          /* istanbul ignore next */
          throw new Error('Sync requests are deprecated');
      }
      /**
       * Should be used to make async request
       */
      sendAsync(payload, callback) {
          try {
              let toSend = null;
              if (payload instanceof Array) {
                  toSend = payload.map($ => toRPC($));
              }
              else {
                  toSend = toRPC(payload);
              }
              /* istanbul ignore if */
              if (typeof fetch === 'undefined') {
                  throw new Error('There is no global fetch object. Please install and import isomorphic-fetch');
              }
              const params = {
                  body: JSON.stringify(toSend),
                  method: 'POST',
                  // mode: 'cors',
                  headers: Object.assign(Object.assign({}, this.options.headers), { 'Content-Type': 'application/json' })
              };
              /* istanbul ignore if */
              // tslint:disable-next-line:no-console
              if (this.debug)
                  console.log('SEND >> ' + params.body);
              fetch(this.host, params).then(async ($) => {
                  if (!$.ok) {
                      /* istanbul ignore if */
                      // tslint:disable-next-line:no-console
                      if (this.debug)
                          console.log('ERR << ' + JSON.stringify($));
                      callback(new Error('External error. response code: ' + $.status));
                  }
                  else {
                      const json = await $.json();
                      /* istanbul ignore if */
                      // tslint:disable-next-line:no-console
                      if (this.debug)
                          console.log('RECV << ' + JSON.stringify(json));
                      if (json.error) {
                          callback(Object.assign(new Error(json.error.json || json.error), json.error));
                      }
                      else {
                          callback(null, json);
                      }
                  }
              }, err => {
                  /* istanbul ignore if */
                  // tslint:disable-next-line:no-console
                  if (this.debug)
                      console.log('ERR << ' + JSON.stringify(err));
                  callback(err);
              });
          }
          catch (e) {
              /* istanbul ignore if */
              // tslint:disable-next-line:no-console
              if (this.debug)
                  console.log('ERR << ' + JSON.stringify(e));
              callback(e);
          }
      }
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var fpFuture = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function future() {
      let resolver;
      let rejecter;
      const promise = new Promise((ok, err) => {
          resolver = (x) => {
              ok(x);
              promise.isPending = false;
          };
          rejecter = (x) => {
              err(x);
              promise.isPending = false;
          };
      }).catch(e => Promise.reject(e));
      promise.resolve = resolver;
      promise.reject = rejecter;
      if (!("finally" in promise)) {
          promise.finally = fn => {
              promise.then(fn);
              promise.catch(fn);
          };
      }
      promise.isPending = true;
      return promise;
  }
  exports.future = future;
  exports.default = future;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLFNBQWdCLE1BQU07SUFDcEIsSUFBSSxRQUF3QixDQUFDO0lBQzdCLElBQUksUUFBNEIsQ0FBQztJQUVqQyxNQUFNLE9BQU8sR0FBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMzQyxRQUFRLEdBQUcsQ0FBQyxDQUFJLEVBQUUsRUFBRTtZQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDLENBQUM7UUFDRixRQUFRLEdBQUcsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakMsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDM0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFFMUIsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQztLQUNIO0lBRUQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFekIsT0FBTyxPQUFxQixDQUFDO0FBQy9CLENBQUM7QUE1QkQsd0JBNEJDO0FBRUQsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgSUZ1dHVyZTxUPiA9IFByb21pc2U8VD4gJiB7XG4gIHJlc29sdmU6ICh4OiBUKSA9PiB2b2lkO1xuICByZWplY3Q6ICh4OiBFcnJvcikgPT4gdm9pZDtcbiAgZmluYWxseTogKGZuOiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xuICBpc1BlbmRpbmc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZnV0dXJlPFQgPSBhbnk+KCk6IElGdXR1cmU8VD4ge1xuICBsZXQgcmVzb2x2ZXI6ICh4OiBUKSA9PiB2b2lkO1xuICBsZXQgcmVqZWN0ZXI6ICh4OiBFcnJvcikgPT4gdm9pZDtcblxuICBjb25zdCBwcm9taXNlOiBhbnkgPSBuZXcgUHJvbWlzZSgob2ssIGVycikgPT4ge1xuICAgIHJlc29sdmVyID0gKHg6IFQpID0+IHtcbiAgICAgIG9rKHgpO1xuICAgICAgcHJvbWlzZS5pc1BlbmRpbmcgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJlamVjdGVyID0gKHg6IEVycm9yKSA9PiB7XG4gICAgICBlcnIoeCk7XG4gICAgICBwcm9taXNlLmlzUGVuZGluZyA9IGZhbHNlO1xuICAgIH07XG4gIH0pLmNhdGNoKGUgPT4gUHJvbWlzZS5yZWplY3QoZSkpO1xuXG4gIHByb21pc2UucmVzb2x2ZSA9IHJlc29sdmVyO1xuICBwcm9taXNlLnJlamVjdCA9IHJlamVjdGVyO1xuXG4gIGlmICghKFwiZmluYWxseVwiIGluIHByb21pc2UpKSB7XG4gICAgcHJvbWlzZS5maW5hbGx5ID0gZm4gPT4ge1xuICAgICAgcHJvbWlzZS50aGVuKGZuKTtcbiAgICAgIHByb21pc2UuY2F0Y2goZm4pO1xuICAgIH07XG4gIH1cblxuICBwcm9taXNlLmlzUGVuZGluZyA9IHRydWU7XG5cbiAgcmV0dXJuIHByb21pc2UgYXMgSUZ1dHVyZTxUPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnV0dXJlO1xuIl19
  });

  unwrapExports(fpFuture);
  var fpFuture_1 = fpFuture.future;

  /**
   * @public
   */
  class WebSocketProvider {
      constructor(url, options = {}) {
          this.url = url;
          this.options = options;
          this.isDisposed = false;
          // @internal
          this.responseCallbacks = new Map();
          // @internal
          this.notificationCallbacks = new Set();
          this.debug = false;
          this.lastChunk = '';
          this.connect();
      }
      dispose() {
          this.isDisposed = true;
          const connection = this.connection;
          this.timeout(new Error('Provider disposed.'));
          // tslint:disable-next-line:no-floating-promises
          connection.then(($) => $.close());
      }
      /* istanbul ignore next */
      // tslint:disable-next-line:prefer-function-over-method
      send() {
          /* istanbul ignore next */
          throw new Error('Sync requests are deprecated');
      }
      sendAsync(payload, callback) {
          const toSend = [];
          let didFinish;
          if (payload instanceof Array) {
              didFinish = Promise.all(payload.map(($) => {
                  const defer = fpFuture_1();
                  try {
                      const message = toRPC($);
                      toSend.push(message);
                      this.responseCallbacks.set(message.id, defer);
                  }
                  catch (e) {
                      defer.reject(e);
                  }
                  return defer;
              }));
          }
          else {
              const defer = fpFuture_1();
              try {
                  const message = toRPC(payload);
                  toSend.push(message);
                  this.responseCallbacks.set(message.id, defer);
              }
              catch (e) {
                  defer.reject(e);
              }
              didFinish = defer;
          }
          didFinish.then(($) => callback(null, $), (err) => callback(err));
          this.connection.then((ws) => {
              toSend.forEach(($) => {
                  const s = JSON.stringify($);
                  /* istanbul ignore if */
                  // tslint:disable-next-line:no-console
                  if (this.debug)
                      console.log('SEND >> ' + s);
                  ws.send(s);
              });
          }, (err) => {
              callback(err);
          });
      }
      /**
       * Will parse the response and make an array out of it.
       */
      parseResponse(data) {
          let returnValues = [];
          // DE-CHUNKER
          let dechunkedData = data
              .replace(/\}[\n\r]?\{/g, '}|--|{') // }{
              .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{') // }][{
              .replace(/\}[\n\r]?\[\{/g, '}|--|[{') // }[{
              .replace(/\}\][\n\r]?\{/g, '}]|--|{') // }]{
              .split('|--|');
          dechunkedData.forEach((chunk) => {
              let data = chunk;
              // prepend the last chunk
              if (this.lastChunk) {
                  data = this.lastChunk + data;
              }
              let result = null;
              try {
                  result = JSON.parse(data);
              }
              catch (e) {
                  this.lastChunk = data;
                  // start timeout to cancel all requests
                  clearTimeout(this.lastChunkTimeout);
                  this.lastChunkTimeout = setTimeout(() => {
                      this.timeout();
                  }, 1000 * 15);
                  return;
              }
              // cancel timeout and set chunk to null
              clearTimeout(this.lastChunkTimeout);
              this.lastChunk = '';
              if (result)
                  returnValues.push(result);
          });
          return returnValues;
      }
      processMessage(message) {
          if ('id' in message) {
              const id = message.id;
              const defer = this.responseCallbacks.get(id);
              if (!defer) {
                  // tslint:disable-next-line:no-console
                  console.error('Error: Received a response for an unknown request', message);
                  return;
              }
              this.responseCallbacks.delete(id);
              if ('error' in message) {
                  defer.reject(Object.assign(new Error(message.error.message || message.error), message.error));
              }
              else if ('result' in message) {
                  defer.resolve(message);
              }
          }
          else {
              this.notificationCallbacks.forEach(($) => $(null, message));
          }
      }
      /**
       * Timeout all requests when the end/error event is fired
       */
      timeout(error) {
          if (!this.connection || !this.connection.isPending) {
              this.connection = fpFuture_1();
          }
          const timeoutError = error || new Error('Connection timeout');
          this.responseCallbacks.forEach(($) => $.reject(timeoutError));
          this.responseCallbacks.clear();
          // reset all requests and callbacks
          if (!this.isDisposed) {
              this.connect();
          }
      }
      connect() {
          if (this.connection && !this.connection.isPending) {
              // tslint:disable-next-line
              this.connection.then(($) => $.close());
          }
          if (!this.connection || !this.connection.isPending) {
              this.connection = fpFuture_1();
          }
          this.lastChunk = '';
          let ctor = this.options.WebSocketConstructor || (typeof WebSocket !== 'undefined' ? WebSocket : void 0);
          if (!ctor) {
              throw new Error('Please provide a WebSocketConstructor');
          }
          const connection = new ctor(this.url, this.options.protocol);
          connection.onopen = () => {
              this.connection.resolve(connection);
          };
          connection.onerror = (error) => {
              const theError = new Error('Error in web socket');
              theError.data = error;
              this.timeout(theError);
          };
          connection.onclose = (event) => {
              this.timeout(new Error(`Connection closed (${(event && event.reason) || 'Unknown reason'})`));
          };
          // LISTEN FOR CONNECTION RESPONSES
          connection.onmessage = (e) => {
              let data = typeof e.data === 'string' ? e.data : '';
              /* istanbul ignore if */
              // tslint:disable-next-line:no-console
              if (this.debug)
                  console.log('RECV << ' + e.data);
              this.parseResponse(data).forEach((result) => {
                  // get the id which matches the returned id
                  if (result instanceof Array) {
                      result.forEach(($) => this.processMessage($));
                  }
                  else {
                      this.processMessage(result);
                  }
              });
          };
      }
  }

  var utf8 = createCommonjsModule(function (module, exports) {
  (function(root) {

  	var stringFromCharCode = String.fromCharCode;

  	// Taken from https://mths.be/punycode
  	function ucs2decode(string) {
  		var output = [];
  		var counter = 0;
  		var length = string.length;
  		var value;
  		var extra;
  		while (counter < length) {
  			value = string.charCodeAt(counter++);
  			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  				// high surrogate, and there is a next character
  				extra = string.charCodeAt(counter++);
  				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  				} else {
  					// unmatched surrogate; only append this code unit, in case the next
  					// code unit is the high surrogate of a surrogate pair
  					output.push(value);
  					counter--;
  				}
  			} else {
  				output.push(value);
  			}
  		}
  		return output;
  	}

  	// Taken from https://mths.be/punycode
  	function ucs2encode(array) {
  		var length = array.length;
  		var index = -1;
  		var value;
  		var output = '';
  		while (++index < length) {
  			value = array[index];
  			if (value > 0xFFFF) {
  				value -= 0x10000;
  				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  				value = 0xDC00 | value & 0x3FF;
  			}
  			output += stringFromCharCode(value);
  		}
  		return output;
  	}

  	function checkScalarValue(codePoint) {
  		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
  			throw Error(
  				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
  				' is not a scalar value'
  			);
  		}
  	}
  	/*--------------------------------------------------------------------------*/

  	function createByte(codePoint, shift) {
  		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
  	}

  	function encodeCodePoint(codePoint) {
  		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
  			return stringFromCharCode(codePoint);
  		}
  		var symbol = '';
  		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
  			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
  		}
  		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
  			checkScalarValue(codePoint);
  			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
  			symbol += createByte(codePoint, 6);
  		}
  		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
  			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
  			symbol += createByte(codePoint, 12);
  			symbol += createByte(codePoint, 6);
  		}
  		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
  		return symbol;
  	}

  	function utf8encode(string) {
  		var codePoints = ucs2decode(string);
  		var length = codePoints.length;
  		var index = -1;
  		var codePoint;
  		var byteString = '';
  		while (++index < length) {
  			codePoint = codePoints[index];
  			byteString += encodeCodePoint(codePoint);
  		}
  		return byteString;
  	}

  	/*--------------------------------------------------------------------------*/

  	function readContinuationByte() {
  		if (byteIndex >= byteCount) {
  			throw Error('Invalid byte index');
  		}

  		var continuationByte = byteArray[byteIndex] & 0xFF;
  		byteIndex++;

  		if ((continuationByte & 0xC0) == 0x80) {
  			return continuationByte & 0x3F;
  		}

  		// If we end up here, it’s not a continuation byte
  		throw Error('Invalid continuation byte');
  	}

  	function decodeSymbol() {
  		var byte1;
  		var byte2;
  		var byte3;
  		var byte4;
  		var codePoint;

  		if (byteIndex > byteCount) {
  			throw Error('Invalid byte index');
  		}

  		if (byteIndex == byteCount) {
  			return false;
  		}

  		// Read first byte
  		byte1 = byteArray[byteIndex] & 0xFF;
  		byteIndex++;

  		// 1-byte sequence (no continuation bytes)
  		if ((byte1 & 0x80) == 0) {
  			return byte1;
  		}

  		// 2-byte sequence
  		if ((byte1 & 0xE0) == 0xC0) {
  			byte2 = readContinuationByte();
  			codePoint = ((byte1 & 0x1F) << 6) | byte2;
  			if (codePoint >= 0x80) {
  				return codePoint;
  			} else {
  				throw Error('Invalid continuation byte');
  			}
  		}

  		// 3-byte sequence (may include unpaired surrogates)
  		if ((byte1 & 0xF0) == 0xE0) {
  			byte2 = readContinuationByte();
  			byte3 = readContinuationByte();
  			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
  			if (codePoint >= 0x0800) {
  				checkScalarValue(codePoint);
  				return codePoint;
  			} else {
  				throw Error('Invalid continuation byte');
  			}
  		}

  		// 4-byte sequence
  		if ((byte1 & 0xF8) == 0xF0) {
  			byte2 = readContinuationByte();
  			byte3 = readContinuationByte();
  			byte4 = readContinuationByte();
  			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
  				(byte3 << 0x06) | byte4;
  			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
  				return codePoint;
  			}
  		}

  		throw Error('Invalid UTF-8 detected');
  	}

  	var byteArray;
  	var byteCount;
  	var byteIndex;
  	function utf8decode(byteString) {
  		byteArray = ucs2decode(byteString);
  		byteCount = byteArray.length;
  		byteIndex = 0;
  		var codePoints = [];
  		var tmp;
  		while ((tmp = decodeSymbol()) !== false) {
  			codePoints.push(tmp);
  		}
  		return ucs2encode(codePoints);
  	}

  	/*--------------------------------------------------------------------------*/

  	root.version = '3.0.0';
  	root.encode = utf8encode;
  	root.decode = utf8decode;

  }(exports));
  });
  var utf8_1 = utf8.encode;
  var utf8_2 = utf8.decode;

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  var sha3$1 = createCommonjsModule(function (module) {
  /**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   */
  /*jslint bitwise: true */
  (function () {

    var INPUT_ERROR = 'input is invalid type';
    var FINALIZE_ERROR = 'finalize already called';
    var WINDOW = typeof window === 'object';
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
      root = global$1;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && 'object' === 'object' && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
      0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
      2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
      2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
      2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
    var CSHAKE_BYTEPAD = {
      '128': 168,
      '256': 136
    };

    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      };
    }

    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function (obj) {
        return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }

    var createOutputMethod = function (bits, padding, outputType) {
      return function (message) {
        return new Keccak(bits, padding, bits).update(message)[outputType]();
      };
    };

    var createShakeOutputMethod = function (bits, padding, outputType) {
      return function (message, outputBits) {
        return new Keccak(bits, padding, outputBits).update(message)[outputType]();
      };
    };

    var createCshakeOutputMethod = function (bits, padding, outputType) {
      return function (message, outputBits, n, s) {
        return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
      };
    };

    var createKmacOutputMethod = function (bits, padding, outputType) {
      return function (key, message, outputBits, s) {
        return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
      };
    };

    var createOutputMethods = function (method, createMethod, bits, padding) {
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        method[type] = createMethod(bits, padding, type);
      }
      return method;
    };

    var createMethod = function (bits, padding) {
      var method = createOutputMethod(bits, padding, 'hex');
      method.create = function () {
        return new Keccak(bits, padding, bits);
      };
      method.update = function (message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits, padding);
    };

    var createShakeMethod = function (bits, padding) {
      var method = createShakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits) {
        return new Keccak(bits, padding, outputBits);
      };
      method.update = function (message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits, padding);
    };

    var createCshakeMethod = function (bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createCshakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits, n, s) {
        if (!n && !s) {
          return methods['shake' + bits].create(outputBits);
        } else {
          return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
        }
      };
      method.update = function (message, outputBits, n, s) {
        return method.create(outputBits, n, s).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
    };

    var createKmacMethod = function (bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createKmacOutputMethod(bits, padding, 'hex');
      method.create = function (key, outputBits, s) {
        return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
      };
      method.update = function (key, message, outputBits, s) {
        return method.create(key, outputBits, s).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits, padding);
    };

    var algorithms = [
      { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
      { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
      { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
      { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
      { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
    ];

    var methods = {}, methodNames = [];

    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits = algorithm.bits;
      for (var j = 0; j < bits.length; ++j) {
        var methodName = algorithm.name + '_' + bits[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
        if (algorithm.name !== 'sha3') {
          var newMethodName = algorithm.name + bits[j];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }

    function Keccak(bits, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = (1600 - (bits << 1)) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;

      for (var i = 0; i < 50; ++i) {
        this.s[i] = 0;
      }
    }

    Keccak.prototype.update = function (message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type = typeof message;
      if (type !== 'string') {
        if (type === 'object') {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
        blockCount = this.blockCount, index = 0, s = this.s, i, code;

      while (index < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i = 1; i < blockCount + 1; ++i) {
            blocks[i] = 0;
          }
        }
        if (notString) {
          for (i = this.start; index < length && i < byteCount; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        } else {
          for (i = this.start; index < length && i < byteCount; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
        this.lastByteIndex = i;
        if (i >= byteCount) {
          this.start = i - byteCount;
          this.block = blocks[blockCount];
          for (i = 0; i < blockCount; ++i) {
            s[i] ^= blocks[i];
          }
          f(s);
          this.reset = true;
        } else {
          this.start = i;
        }
      }
      return this;
    };

    Keccak.prototype.encode = function (x, right) {
      var o = x & 255, n = 1;
      var bytes = [o];
      x = x >> 8;
      o = x & 255;
      while (o > 0) {
        bytes.unshift(o);
        x = x >> 8;
        o = x & 255;
        ++n;
      }
      if (right) {
        bytes.push(n);
      } else {
        bytes.unshift(n);
      }
      this.update(bytes);
      return bytes.length;
    };

    Keccak.prototype.encodeString = function (str) {
      var notString, type = typeof str;
      if (type !== 'string') {
        if (type === 'object') {
          if (str === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
            str = new Uint8Array(str);
          } else if (!Array.isArray(str)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var bytes = 0, length = str.length;
      if (notString) {
        bytes = length;
      } else {
        for (var i = 0; i < str.length; ++i) {
          var code = str.charCodeAt(i);
          if (code < 0x80) {
            bytes += 1;
          } else if (code < 0x800) {
            bytes += 2;
          } else if (code < 0xd800 || code >= 0xe000) {
            bytes += 3;
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
            bytes += 4;
          }
        }
      }
      bytes += this.encode(bytes * 8);
      this.update(str);
      return bytes;
    };

    Keccak.prototype.bytepad = function (strs, w) {
      var bytes = this.encode(w);
      for (var i = 0; i < strs.length; ++i) {
        bytes += this.encodeString(strs[i]);
      }
      var paddingBytes = w - bytes % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };

    Keccak.prototype.finalize = function () {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
      blocks[i >> 2] |= this.padding[i & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      blocks[blockCount - 1] |= 0x80000000;
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
    };

    Keccak.prototype.toString = Keccak.prototype.hex = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var hex = '', block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          block = s[i];
          hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
            HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
            HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
            HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
        }
        if (j % blockCount === 0) {
          f(s);
          i = 0;
        }
      }
      if (extraBytes) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
        if (extraBytes > 1) {
          hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
        }
      }
      return hex;
    };

    Keccak.prototype.arrayBuffer = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var bytes = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer((outputBlocks + 1) << 2);
      } else {
        buffer = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer);
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          array[j] = s[i];
        }
        if (j % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        array[i] = s[i];
        buffer = buffer.slice(0, bytes);
      }
      return buffer;
    };

    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

    Keccak.prototype.digest = Keccak.prototype.array = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var array = [], offset, block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          offset = j << 2;
          block = s[i];
          array[offset] = block & 0xFF;
          array[offset + 1] = (block >> 8) & 0xFF;
          array[offset + 2] = (block >> 16) & 0xFF;
          array[offset + 3] = (block >> 24) & 0xFF;
        }
        if (j % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        if (extraBytes > 1) {
          array[offset + 1] = (block >> 8) & 0xFF;
        }
        if (extraBytes > 2) {
          array[offset + 2] = (block >> 16) & 0xFF;
        }
      }
      return array;
    };

    function Kmac(bits, padding, outputBits) {
      Keccak.call(this, bits, padding, outputBits);
    }

    Kmac.prototype = new Keccak();

    Kmac.prototype.finalize = function () {
      this.encode(this.outputBits, true);
      return Keccak.prototype.finalize.call(this);
    };

    var f = function (s) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
        b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
        b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
        b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
        c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
        c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
        c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
        c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
        c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
        c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
        c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
        c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
        c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

        h = c8 ^ ((c2 << 1) | (c3 >>> 31));
        l = c9 ^ ((c3 << 1) | (c2 >>> 31));
        s[0] ^= h;
        s[1] ^= l;
        s[10] ^= h;
        s[11] ^= l;
        s[20] ^= h;
        s[21] ^= l;
        s[30] ^= h;
        s[31] ^= l;
        s[40] ^= h;
        s[41] ^= l;
        h = c0 ^ ((c4 << 1) | (c5 >>> 31));
        l = c1 ^ ((c5 << 1) | (c4 >>> 31));
        s[2] ^= h;
        s[3] ^= l;
        s[12] ^= h;
        s[13] ^= l;
        s[22] ^= h;
        s[23] ^= l;
        s[32] ^= h;
        s[33] ^= l;
        s[42] ^= h;
        s[43] ^= l;
        h = c2 ^ ((c6 << 1) | (c7 >>> 31));
        l = c3 ^ ((c7 << 1) | (c6 >>> 31));
        s[4] ^= h;
        s[5] ^= l;
        s[14] ^= h;
        s[15] ^= l;
        s[24] ^= h;
        s[25] ^= l;
        s[34] ^= h;
        s[35] ^= l;
        s[44] ^= h;
        s[45] ^= l;
        h = c4 ^ ((c8 << 1) | (c9 >>> 31));
        l = c5 ^ ((c9 << 1) | (c8 >>> 31));
        s[6] ^= h;
        s[7] ^= l;
        s[16] ^= h;
        s[17] ^= l;
        s[26] ^= h;
        s[27] ^= l;
        s[36] ^= h;
        s[37] ^= l;
        s[46] ^= h;
        s[47] ^= l;
        h = c6 ^ ((c0 << 1) | (c1 >>> 31));
        l = c7 ^ ((c1 << 1) | (c0 >>> 31));
        s[8] ^= h;
        s[9] ^= l;
        s[18] ^= h;
        s[19] ^= l;
        s[28] ^= h;
        s[29] ^= l;
        s[38] ^= h;
        s[39] ^= l;
        s[48] ^= h;
        s[49] ^= l;

        b0 = s[0];
        b1 = s[1];
        b32 = (s[11] << 4) | (s[10] >>> 28);
        b33 = (s[10] << 4) | (s[11] >>> 28);
        b14 = (s[20] << 3) | (s[21] >>> 29);
        b15 = (s[21] << 3) | (s[20] >>> 29);
        b46 = (s[31] << 9) | (s[30] >>> 23);
        b47 = (s[30] << 9) | (s[31] >>> 23);
        b28 = (s[40] << 18) | (s[41] >>> 14);
        b29 = (s[41] << 18) | (s[40] >>> 14);
        b20 = (s[2] << 1) | (s[3] >>> 31);
        b21 = (s[3] << 1) | (s[2] >>> 31);
        b2 = (s[13] << 12) | (s[12] >>> 20);
        b3 = (s[12] << 12) | (s[13] >>> 20);
        b34 = (s[22] << 10) | (s[23] >>> 22);
        b35 = (s[23] << 10) | (s[22] >>> 22);
        b16 = (s[33] << 13) | (s[32] >>> 19);
        b17 = (s[32] << 13) | (s[33] >>> 19);
        b48 = (s[42] << 2) | (s[43] >>> 30);
        b49 = (s[43] << 2) | (s[42] >>> 30);
        b40 = (s[5] << 30) | (s[4] >>> 2);
        b41 = (s[4] << 30) | (s[5] >>> 2);
        b22 = (s[14] << 6) | (s[15] >>> 26);
        b23 = (s[15] << 6) | (s[14] >>> 26);
        b4 = (s[25] << 11) | (s[24] >>> 21);
        b5 = (s[24] << 11) | (s[25] >>> 21);
        b36 = (s[34] << 15) | (s[35] >>> 17);
        b37 = (s[35] << 15) | (s[34] >>> 17);
        b18 = (s[45] << 29) | (s[44] >>> 3);
        b19 = (s[44] << 29) | (s[45] >>> 3);
        b10 = (s[6] << 28) | (s[7] >>> 4);
        b11 = (s[7] << 28) | (s[6] >>> 4);
        b42 = (s[17] << 23) | (s[16] >>> 9);
        b43 = (s[16] << 23) | (s[17] >>> 9);
        b24 = (s[26] << 25) | (s[27] >>> 7);
        b25 = (s[27] << 25) | (s[26] >>> 7);
        b6 = (s[36] << 21) | (s[37] >>> 11);
        b7 = (s[37] << 21) | (s[36] >>> 11);
        b38 = (s[47] << 24) | (s[46] >>> 8);
        b39 = (s[46] << 24) | (s[47] >>> 8);
        b30 = (s[8] << 27) | (s[9] >>> 5);
        b31 = (s[9] << 27) | (s[8] >>> 5);
        b12 = (s[18] << 20) | (s[19] >>> 12);
        b13 = (s[19] << 20) | (s[18] >>> 12);
        b44 = (s[29] << 7) | (s[28] >>> 25);
        b45 = (s[28] << 7) | (s[29] >>> 25);
        b26 = (s[38] << 8) | (s[39] >>> 24);
        b27 = (s[39] << 8) | (s[38] >>> 24);
        b8 = (s[48] << 14) | (s[49] >>> 18);
        b9 = (s[49] << 14) | (s[48] >>> 18);

        s[0] = b0 ^ (~b2 & b4);
        s[1] = b1 ^ (~b3 & b5);
        s[10] = b10 ^ (~b12 & b14);
        s[11] = b11 ^ (~b13 & b15);
        s[20] = b20 ^ (~b22 & b24);
        s[21] = b21 ^ (~b23 & b25);
        s[30] = b30 ^ (~b32 & b34);
        s[31] = b31 ^ (~b33 & b35);
        s[40] = b40 ^ (~b42 & b44);
        s[41] = b41 ^ (~b43 & b45);
        s[2] = b2 ^ (~b4 & b6);
        s[3] = b3 ^ (~b5 & b7);
        s[12] = b12 ^ (~b14 & b16);
        s[13] = b13 ^ (~b15 & b17);
        s[22] = b22 ^ (~b24 & b26);
        s[23] = b23 ^ (~b25 & b27);
        s[32] = b32 ^ (~b34 & b36);
        s[33] = b33 ^ (~b35 & b37);
        s[42] = b42 ^ (~b44 & b46);
        s[43] = b43 ^ (~b45 & b47);
        s[4] = b4 ^ (~b6 & b8);
        s[5] = b5 ^ (~b7 & b9);
        s[14] = b14 ^ (~b16 & b18);
        s[15] = b15 ^ (~b17 & b19);
        s[24] = b24 ^ (~b26 & b28);
        s[25] = b25 ^ (~b27 & b29);
        s[34] = b34 ^ (~b36 & b38);
        s[35] = b35 ^ (~b37 & b39);
        s[44] = b44 ^ (~b46 & b48);
        s[45] = b45 ^ (~b47 & b49);
        s[6] = b6 ^ (~b8 & b0);
        s[7] = b7 ^ (~b9 & b1);
        s[16] = b16 ^ (~b18 & b10);
        s[17] = b17 ^ (~b19 & b11);
        s[26] = b26 ^ (~b28 & b20);
        s[27] = b27 ^ (~b29 & b21);
        s[36] = b36 ^ (~b38 & b30);
        s[37] = b37 ^ (~b39 & b31);
        s[46] = b46 ^ (~b48 & b40);
        s[47] = b47 ^ (~b49 & b41);
        s[8] = b8 ^ (~b0 & b2);
        s[9] = b9 ^ (~b1 & b3);
        s[18] = b18 ^ (~b10 & b12);
        s[19] = b19 ^ (~b11 & b13);
        s[28] = b28 ^ (~b20 & b22);
        s[29] = b29 ^ (~b21 & b23);
        s[38] = b38 ^ (~b30 & b32);
        s[39] = b39 ^ (~b31 & b33);
        s[48] = b48 ^ (~b40 & b42);
        s[49] = b49 ^ (~b41 & b43);

        s[0] ^= RC[n];
        s[1] ^= RC[n + 1];
      }
    };

    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
    }
  })();
  });
  sha3$1.keccak_224;
  sha3$1.keccak224;
  sha3$1.keccak_256;
  var sha3_4 = sha3$1.keccak256;
  sha3$1.keccak_384;
  sha3$1.keccak384;
  sha3$1.keccak_512;
  sha3$1.keccak512;
  sha3$1.sha3_224;
  sha3$1.sha3_256;
  sha3$1.sha3_384;
  sha3$1.sha3_512;
  sha3$1.shake_128;
  sha3$1.shake128;
  sha3$1.shake_256;
  sha3$1.shake256;
  sha3$1.cshake_128;
  sha3$1.cshake128;
  sha3$1.cshake_256;
  sha3$1.cshake256;
  sha3$1.kmac_128;
  sha3$1.kmac128;
  sha3$1.kmac_256;
  sha3$1.kmac256;

  var bignumber = createCommonjsModule(function (module) {
  (function (globalObject) {

  /*
   *      bignumber.js v9.0.1
   *      A JavaScript library for arbitrary-precision arithmetic.
   *      https://github.com/MikeMcl/bignumber.js
   *      Copyright (c) 2020 Michael Mclaughlin <M8ch88l@gmail.com>
   *      MIT Licensed.
   *
   *      BigNumber.prototype methods     |  BigNumber methods
   *                                      |
   *      absoluteValue            abs    |  clone
   *      comparedTo                      |  config               set
   *      decimalPlaces            dp     |      DECIMAL_PLACES
   *      dividedBy                div    |      ROUNDING_MODE
   *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
   *      exponentiatedBy          pow    |      RANGE
   *      integerValue                    |      CRYPTO
   *      isEqualTo                eq     |      MODULO_MODE
   *      isFinite                        |      POW_PRECISION
   *      isGreaterThan            gt     |      FORMAT
   *      isGreaterThanOrEqualTo   gte    |      ALPHABET
   *      isInteger                       |  isBigNumber
   *      isLessThan               lt     |  maximum              max
   *      isLessThanOrEqualTo      lte    |  minimum              min
   *      isNaN                           |  random
   *      isNegative                      |  sum
   *      isPositive                      |
   *      isZero                          |
   *      minus                           |
   *      modulo                   mod    |
   *      multipliedBy             times  |
   *      negated                         |
   *      plus                            |
   *      precision                sd     |
   *      shiftedBy                       |
   *      squareRoot               sqrt   |
   *      toExponential                   |
   *      toFixed                         |
   *      toFormat                        |
   *      toFraction                      |
   *      toJSON                          |
   *      toNumber                        |
   *      toPrecision                     |
   *      toString                        |
   *      valueOf                         |
   *
   */


    var BigNumber,
      isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      mathceil = Math.ceil,
      mathfloor = Math.floor,

      bignumberError = '[BigNumber Error] ',
      tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

      BASE = 1e14,
      LOG_BASE = 14,
      MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
      // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
      POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
      SQRT_BASE = 1e7,

      // EDITABLE
      // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
      // the arguments to toExponential, toFixed, toFormat, and toPrecision.
      MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function clone(configObject) {
      var div, convertBase, parseNumeric,
        P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
        ONE = new BigNumber(1),


        //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


        // The default values below must be integers within the inclusive ranges stated.
        // The values can also be changed at run-time using BigNumber.set.

        // The maximum number of decimal places for operations involving division.
        DECIMAL_PLACES = 20,                     // 0 to MAX

        // The rounding mode used when rounding to the above decimal places, and when using
        // toExponential, toFixed, toFormat and toPrecision, and round (default value).
        // UP         0 Away from zero.
        // DOWN       1 Towards zero.
        // CEIL       2 Towards +Infinity.
        // FLOOR      3 Towards -Infinity.
        // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
        // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
        // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
        // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
        // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
        ROUNDING_MODE = 4,                       // 0 to 8

        // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

        // The exponent value at and beneath which toString returns exponential notation.
        // Number type: -7
        TO_EXP_NEG = -7,                         // 0 to -MAX

        // The exponent value at and above which toString returns exponential notation.
        // Number type: 21
        TO_EXP_POS = 21,                         // 0 to MAX

        // RANGE : [MIN_EXP, MAX_EXP]

        // The minimum exponent value, beneath which underflow to zero occurs.
        // Number type: -324  (5e-324)
        MIN_EXP = -1e7,                          // -1 to -MAX

        // The maximum exponent value, above which overflow to Infinity occurs.
        // Number type:  308  (1.7976931348623157e+308)
        // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
        MAX_EXP = 1e7,                           // 1 to MAX

        // Whether to use cryptographically-secure random number generation, if available.
        CRYPTO = false,                          // true or false

        // The modulo mode used when calculating the modulus: a mod n.
        // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
        // The remainder (r) is calculated as: r = a - n * q.
        //
        // UP        0 The remainder is positive if the dividend is negative, else is negative.
        // DOWN      1 The remainder has the same sign as the dividend.
        //             This modulo mode is commonly known as 'truncated division' and is
        //             equivalent to (a % n) in JavaScript.
        // FLOOR     3 The remainder has the same sign as the divisor (Python %).
        // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
        // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
        //             The remainder is always positive.
        //
        // The truncated division, floored division, Euclidian division and IEEE 754 remainder
        // modes are commonly used for the modulus operation.
        // Although the other rounding modes can also be used, they may not give useful results.
        MODULO_MODE = 1,                         // 0 to 9

        // The maximum number of significant digits of the result of the exponentiatedBy operation.
        // If POW_PRECISION is 0, there will be unlimited significant digits.
        POW_PRECISION = 0,                    // 0 to MAX

        // The format specification used by the BigNumber.prototype.toFormat method.
        FORMAT = {
          prefix: '',
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ',',
          decimalSeparator: '.',
          fractionGroupSize: 0,
          fractionGroupSeparator: '\xA0',      // non-breaking space
          suffix: ''
        },

        // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
        // '-', '.', whitespace, or repeated character.
        // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


      //------------------------------------------------------------------------------------------


      // CONSTRUCTOR


      /*
       * The BigNumber constructor and exported function.
       * Create and return a new instance of a BigNumber object.
       *
       * v {number|string|BigNumber} A numeric value.
       * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
       */
      function BigNumber(v, b) {
        var alphabet, c, caseChanged, e, i, isNum, len, str,
          x = this;

        // Enable constructor call without `new`.
        if (!(x instanceof BigNumber)) return new BigNumber(v, b);

        if (b == null) {

          if (v && v._isBigNumber === true) {
            x.s = v.s;

            if (!v.c || v.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (v.e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = v.e;
              x.c = v.c.slice();
            }

            return;
          }

          if ((isNum = typeof v == 'number') && v * 0 == 0) {

            // Use `1 / n` to handle minus zero also.
            x.s = 1 / v < 0 ? (v = -v, -1) : 1;

            // Fast path for integers, where n < 2147483648 (2**31).
            if (v === ~~v) {
              for (e = 0, i = v; i >= 10; i /= 10, e++);

              if (e > MAX_EXP) {
                x.c = x.e = null;
              } else {
                x.e = e;
                x.c = [v];
              }

              return;
            }

            str = String(v);
          } else {

            if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

            x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
          }

          // Decimal point?
          if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

          // Exponential form?
          if ((i = str.search(/e/i)) > 0) {

            // Determine exponent.
            if (e < 0) e = i;
            e += +str.slice(i + 1);
            str = str.substring(0, i);
          } else if (e < 0) {

            // Integer.
            e = str.length;
          }

        } else {

          // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
          intCheck(b, 2, ALPHABET.length, 'Base');

          // Allow exponential notation to be used with base 10 argument, while
          // also rounding to DECIMAL_PLACES as with other bases.
          if (b == 10) {
            x = new BigNumber(v);
            return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
          }

          str = String(v);

          if (isNum = typeof v == 'number') {

            // Avoid potential interpretation of Infinity and NaN as base 44+ values.
            if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

            x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

            // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
            if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
              throw Error
               (tooManyDigits + v);
            }
          } else {
            x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
          }

          alphabet = ALPHABET.slice(0, b);
          e = i = 0;

          // Check that str is a valid base b number.
          // Don't use RegExp, so alphabet can contain special characters.
          for (len = str.length; i < len; i++) {
            if (alphabet.indexOf(c = str.charAt(i)) < 0) {
              if (c == '.') {

                // If '.' is not the first character and it has not be found before.
                if (i > e) {
                  e = len;
                  continue;
                }
              } else if (!caseChanged) {

                // Allow e.g. hexadecimal 'FF' as well as 'ff'.
                if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                    str == str.toLowerCase() && (str = str.toUpperCase())) {
                  caseChanged = true;
                  i = -1;
                  e = 0;
                  continue;
                }
              }

              return parseNumeric(x, String(v), isNum, b);
            }
          }

          // Prevent later check for length on converted number.
          isNum = false;
          str = convertBase(str, b, 10, x.s);

          // Decimal point?
          if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
          else e = str.length;
        }

        // Determine leading zeros.
        for (i = 0; str.charCodeAt(i) === 48; i++);

        // Determine trailing zeros.
        for (len = str.length; str.charCodeAt(--len) === 48;);

        if (str = str.slice(i, ++len)) {
          len -= i;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (isNum && BigNumber.DEBUG &&
            len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
              throw Error
               (tooManyDigits + (x.s * v));
          }

           // Overflow?
          if ((e = e - i - 1) > MAX_EXP) {

            // Infinity.
            x.c = x.e = null;

          // Underflow?
          } else if (e < MIN_EXP) {

            // Zero.
            x.c = [x.e = 0];
          } else {
            x.e = e;
            x.c = [];

            // Transform base

            // e is the base 10 exponent.
            // i is where to slice str to get the first element of the coefficient array.
            i = (e + 1) % LOG_BASE;
            if (e < 0) i += LOG_BASE;  // i < 1

            if (i < len) {
              if (i) x.c.push(+str.slice(0, i));

              for (len -= LOG_BASE; i < len;) {
                x.c.push(+str.slice(i, i += LOG_BASE));
              }

              i = LOG_BASE - (str = str.slice(i)).length;
            } else {
              i -= len;
            }

            for (; i--; str += '0');
            x.c.push(+str);
          }
        } else {

          // Zero.
          x.c = [x.e = 0];
        }
      }


      // CONSTRUCTOR PROPERTIES


      BigNumber.clone = clone;

      BigNumber.ROUND_UP = 0;
      BigNumber.ROUND_DOWN = 1;
      BigNumber.ROUND_CEIL = 2;
      BigNumber.ROUND_FLOOR = 3;
      BigNumber.ROUND_HALF_UP = 4;
      BigNumber.ROUND_HALF_DOWN = 5;
      BigNumber.ROUND_HALF_EVEN = 6;
      BigNumber.ROUND_HALF_CEIL = 7;
      BigNumber.ROUND_HALF_FLOOR = 8;
      BigNumber.EUCLID = 9;


      /*
       * Configure infrequently-changing library-wide settings.
       *
       * Accept an object with the following optional properties (if the value of a property is
       * a number, it must be an integer within the inclusive range stated):
       *
       *   DECIMAL_PLACES   {number}           0 to MAX
       *   ROUNDING_MODE    {number}           0 to 8
       *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
       *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
       *   CRYPTO           {boolean}          true or false
       *   MODULO_MODE      {number}           0 to 9
       *   POW_PRECISION       {number}           0 to MAX
       *   ALPHABET         {string}           A string of two or more unique characters which does
       *                                       not contain '.'.
       *   FORMAT           {object}           An object with some of the following properties:
       *     prefix                 {string}
       *     groupSize              {number}
       *     secondaryGroupSize     {number}
       *     groupSeparator         {string}
       *     decimalSeparator       {string}
       *     fractionGroupSize      {number}
       *     fractionGroupSeparator {string}
       *     suffix                 {string}
       *
       * (The values assigned to the above FORMAT object properties are not checked for validity.)
       *
       * E.g.
       * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
       *
       * Ignore properties/parameters set to null or undefined, except for ALPHABET.
       *
       * Return an object with the properties current values.
       */
      BigNumber.config = BigNumber.set = function (obj) {
        var p, v;

        if (obj != null) {

          if (typeof obj == 'object') {

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
            if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
              v = obj[p];
              intCheck(v, 0, MAX, p);
              DECIMAL_PLACES = v;
            }

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
            if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
              v = obj[p];
              intCheck(v, 0, 8, p);
              ROUNDING_MODE = v;
            }

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or
            // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
            if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
              v = obj[p];
              if (v && v.pop) {
                intCheck(v[0], -MAX, 0, p);
                intCheck(v[1], 0, MAX, p);
                TO_EXP_NEG = v[0];
                TO_EXP_POS = v[1];
              } else {
                intCheck(v, -MAX, MAX, p);
                TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
              }
            }

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
            if (obj.hasOwnProperty(p = 'RANGE')) {
              v = obj[p];
              if (v && v.pop) {
                intCheck(v[0], -MAX, -1, p);
                intCheck(v[1], 1, MAX, p);
                MIN_EXP = v[0];
                MAX_EXP = v[1];
              } else {
                intCheck(v, -MAX, MAX, p);
                if (v) {
                  MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                } else {
                  throw Error
                   (bignumberError + p + ' cannot be zero: ' + v);
                }
              }
            }

            // CRYPTO {boolean} true or false.
            // '[BigNumber Error] CRYPTO not true or false: {v}'
            // '[BigNumber Error] crypto unavailable'
            if (obj.hasOwnProperty(p = 'CRYPTO')) {
              v = obj[p];
              if (v === !!v) {
                if (v) {
                  if (typeof crypto != 'undefined' && crypto &&
                   (crypto.getRandomValues || crypto.randomBytes)) {
                    CRYPTO = v;
                  } else {
                    CRYPTO = !v;
                    throw Error
                     (bignumberError + 'crypto unavailable');
                  }
                } else {
                  CRYPTO = v;
                }
              } else {
                throw Error
                 (bignumberError + p + ' not true or false: ' + v);
              }
            }

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
            if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
              v = obj[p];
              intCheck(v, 0, 9, p);
              MODULO_MODE = v;
            }

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
            if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
              v = obj[p];
              intCheck(v, 0, MAX, p);
              POW_PRECISION = v;
            }

            // FORMAT {object}
            // '[BigNumber Error] FORMAT not an object: {v}'
            if (obj.hasOwnProperty(p = 'FORMAT')) {
              v = obj[p];
              if (typeof v == 'object') FORMAT = v;
              else throw Error
               (bignumberError + p + ' not an object: ' + v);
            }

            // ALPHABET {string}
            // '[BigNumber Error] ALPHABET invalid: {v}'
            if (obj.hasOwnProperty(p = 'ALPHABET')) {
              v = obj[p];

              // Disallow if less than two characters,
              // or if it contains '+', '-', '.', whitespace, or a repeated character.
              if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                ALPHABET = v;
              } else {
                throw Error
                 (bignumberError + p + ' invalid: ' + v);
              }
            }

          } else {

            // '[BigNumber Error] Object expected: {v}'
            throw Error
             (bignumberError + 'Object expected: ' + obj);
          }
        }

        return {
          DECIMAL_PLACES: DECIMAL_PLACES,
          ROUNDING_MODE: ROUNDING_MODE,
          EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
          RANGE: [MIN_EXP, MAX_EXP],
          CRYPTO: CRYPTO,
          MODULO_MODE: MODULO_MODE,
          POW_PRECISION: POW_PRECISION,
          FORMAT: FORMAT,
          ALPHABET: ALPHABET
        };
      };


      /*
       * Return true if v is a BigNumber instance, otherwise return false.
       *
       * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
       *
       * v {any}
       *
       * '[BigNumber Error] Invalid BigNumber: {v}'
       */
      BigNumber.isBigNumber = function (v) {
        if (!v || v._isBigNumber !== true) return false;
        if (!BigNumber.DEBUG) return true;

        var i, n,
          c = v.c,
          e = v.e,
          s = v.s;

        out: if ({}.toString.call(c) == '[object Array]') {

          if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

            // If the first element is zero, the BigNumber value must be zero.
            if (c[0] === 0) {
              if (e === 0 && c.length === 1) return true;
              break out;
            }

            // Calculate number of digits that c[0] should have, based on the exponent.
            i = (e + 1) % LOG_BASE;
            if (i < 1) i += LOG_BASE;

            // Calculate number of digits of c[0].
            //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
            if (String(c[0]).length == i) {

              for (i = 0; i < c.length; i++) {
                n = c[i];
                if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
              }

              // Last element cannot be zero, unless it is the only element.
              if (n !== 0) return true;
            }
          }

        // Infinity/NaN
        } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
          return true;
        }

        throw Error
          (bignumberError + 'Invalid BigNumber: ' + v);
      };


      /*
       * Return a new BigNumber whose value is the maximum of the arguments.
       *
       * arguments {number|string|BigNumber}
       */
      BigNumber.maximum = BigNumber.max = function () {
        return maxOrMin(arguments, P.lt);
      };


      /*
       * Return a new BigNumber whose value is the minimum of the arguments.
       *
       * arguments {number|string|BigNumber}
       */
      BigNumber.minimum = BigNumber.min = function () {
        return maxOrMin(arguments, P.gt);
      };


      /*
       * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
       * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
       * zeros are produced).
       *
       * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
       * '[BigNumber Error] crypto unavailable'
       */
      BigNumber.random = (function () {
        var pow2_53 = 0x20000000000000;

        // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
        // Check if Math.random() produces more than 32 bits of randomness.
        // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
        // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
        var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
         ? function () { return mathfloor(Math.random() * pow2_53); }
         : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
           (Math.random() * 0x800000 | 0); };

        return function (dp) {
          var a, b, e, k, v,
            i = 0,
            c = [],
            rand = new BigNumber(ONE);

          if (dp == null) dp = DECIMAL_PLACES;
          else intCheck(dp, 0, MAX);

          k = mathceil(dp / LOG_BASE);

          if (CRYPTO) {

            // Browsers supporting crypto.getRandomValues.
            if (crypto.getRandomValues) {

              a = crypto.getRandomValues(new Uint32Array(k *= 2));

              for (; i < k;) {

                // 53 bits:
                // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                //                                     11111 11111111 11111111
                // 0x20000 is 2^21.
                v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                // Rejection sampling:
                // 0 <= v < 9007199254740992
                // Probability that v >= 9e15, is
                // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                if (v >= 9e15) {
                  b = crypto.getRandomValues(new Uint32Array(2));
                  a[i] = b[0];
                  a[i + 1] = b[1];
                } else {

                  // 0 <= v <= 8999999999999999
                  // 0 <= (v % 1e14) <= 99999999999999
                  c.push(v % 1e14);
                  i += 2;
                }
              }
              i = k / 2;

            // Node.js supporting crypto.randomBytes.
            } else if (crypto.randomBytes) {

              // buffer
              a = crypto.randomBytes(k *= 7);

              for (; i < k;) {

                // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                // 0x100000000 is 2^32, 0x1000000 is 2^24
                // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                // 0 <= v < 9007199254740992
                v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                   (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                   (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

                if (v >= 9e15) {
                  crypto.randomBytes(7).copy(a, i);
                } else {

                  // 0 <= (v % 1e14) <= 99999999999999
                  c.push(v % 1e14);
                  i += 7;
                }
              }
              i = k / 7;
            } else {
              CRYPTO = false;
              throw Error
               (bignumberError + 'crypto unavailable');
            }
          }

          // Use Math.random.
          if (!CRYPTO) {

            for (; i < k;) {
              v = random53bitInt();
              if (v < 9e15) c[i++] = v % 1e14;
            }
          }

          k = c[--i];
          dp %= LOG_BASE;

          // Convert trailing digits to zeros according to dp.
          if (k && dp) {
            v = POWS_TEN[LOG_BASE - dp];
            c[i] = mathfloor(k / v) * v;
          }

          // Remove trailing elements which are zero.
          for (; c[i] === 0; c.pop(), i--);

          // Zero?
          if (i < 0) {
            c = [e = 0];
          } else {

            // Remove leading elements which are zero and adjust exponent accordingly.
            for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

            // Count the digits of the first element of c to determine leading zeros, and...
            for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

            // adjust the exponent accordingly.
            if (i < LOG_BASE) e -= LOG_BASE - i;
          }

          rand.e = e;
          rand.c = c;
          return rand;
        };
      })();


      /*
       * Return a BigNumber whose value is the sum of the arguments.
       *
       * arguments {number|string|BigNumber}
       */
      BigNumber.sum = function () {
        var i = 1,
          args = arguments,
          sum = new BigNumber(args[0]);
        for (; i < args.length;) sum = sum.plus(args[i++]);
        return sum;
      };


      // PRIVATE FUNCTIONS


      // Called by BigNumber and BigNumber.prototype.toString.
      convertBase = (function () {
        var decimal = '0123456789';

        /*
         * Convert string of baseIn to an array of numbers of baseOut.
         * Eg. toBaseOut('255', 10, 16) returns [15, 15].
         * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
         */
        function toBaseOut(str, baseIn, baseOut, alphabet) {
          var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

          for (; i < len;) {
            for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

            arr[0] += alphabet.indexOf(str.charAt(i++));

            for (j = 0; j < arr.length; j++) {

              if (arr[j] > baseOut - 1) {
                if (arr[j + 1] == null) arr[j + 1] = 0;
                arr[j + 1] += arr[j] / baseOut | 0;
                arr[j] %= baseOut;
              }
            }
          }

          return arr.reverse();
        }

        // Convert a numeric string of baseIn to a numeric string of baseOut.
        // If the caller is toString, we are converting from base 10 to baseOut.
        // If the caller is BigNumber, we are converting from baseIn to base 10.
        return function (str, baseIn, baseOut, sign, callerIsToString) {
          var alphabet, d, e, k, r, x, xc, y,
            i = str.indexOf('.'),
            dp = DECIMAL_PLACES,
            rm = ROUNDING_MODE;

          // Non-integer.
          if (i >= 0) {
            k = POW_PRECISION;

            // Unlimited precision.
            POW_PRECISION = 0;
            str = str.replace('.', '');
            y = new BigNumber(baseIn);
            x = y.pow(str.length - i);
            POW_PRECISION = k;

            // Convert str as if an integer, then restore the fraction part by dividing the
            // result by its base raised to a power.

            y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
             10, baseOut, decimal);
            y.e = y.c.length;
          }

          // Convert the number as integer.

          xc = toBaseOut(str, baseIn, baseOut, callerIsToString
           ? (alphabet = ALPHABET, decimal)
           : (alphabet = decimal, ALPHABET));

          // xc now represents str as an integer and converted to baseOut. e is the exponent.
          e = k = xc.length;

          // Remove trailing zeros.
          for (; xc[--k] == 0; xc.pop());

          // Zero?
          if (!xc[0]) return alphabet.charAt(0);

          // Does str represent an integer? If so, no need for the division.
          if (i < 0) {
            --e;
          } else {
            x.c = xc;
            x.e = e;

            // The sign is needed for correct rounding.
            x.s = sign;
            x = div(x, y, dp, rm, baseOut);
            xc = x.c;
            r = x.r;
            e = x.e;
          }

          // xc now represents str converted to baseOut.

          // THe index of the rounding digit.
          d = e + dp + 1;

          // The rounding digit: the digit to the right of the digit that may be rounded up.
          i = xc[d];

          // Look at the rounding digits and mode to determine whether to round up.

          k = baseOut / 2;
          r = r || d < 0 || xc[d + 1] != null;

          r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
                : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                 rm == (x.s < 0 ? 8 : 7));

          // If the index of the rounding digit is not greater than zero, or xc represents
          // zero, then the result of the base conversion is zero or, if rounding up, a value
          // such as 0.00001.
          if (d < 1 || !xc[0]) {

            // 1^-dp or 0
            str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
          } else {

            // Truncate xc to the required number of decimal places.
            xc.length = d;

            // Round up?
            if (r) {

              // Rounding up may mean the previous digit has to be rounded up and so on.
              for (--baseOut; ++xc[--d] > baseOut;) {
                xc[d] = 0;

                if (!d) {
                  ++e;
                  xc = [1].concat(xc);
                }
              }
            }

            // Determine trailing zeros.
            for (k = xc.length; !xc[--k];);

            // E.g. [4, 11, 15] becomes 4bf.
            for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

            // Add leading zeros, decimal point and trailing zeros as required.
            str = toFixedPoint(str, e, alphabet.charAt(0));
          }

          // The caller will add the sign.
          return str;
        };
      })();


      // Perform division in the specified base. Called by div and convertBase.
      div = (function () {

        // Assume non-zero x and k.
        function multiply(x, k, base) {
          var m, temp, xlo, xhi,
            carry = 0,
            i = x.length,
            klo = k % SQRT_BASE,
            khi = k / SQRT_BASE | 0;

          for (x = x.slice(); i--;) {
            xlo = x[i] % SQRT_BASE;
            xhi = x[i] / SQRT_BASE | 0;
            m = khi * xlo + xhi * klo;
            temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
            carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
            x[i] = temp % base;
          }

          if (carry) x = [carry].concat(x);

          return x;
        }

        function compare(a, b, aL, bL) {
          var i, cmp;

          if (aL != bL) {
            cmp = aL > bL ? 1 : -1;
          } else {

            for (i = cmp = 0; i < aL; i++) {

              if (a[i] != b[i]) {
                cmp = a[i] > b[i] ? 1 : -1;
                break;
              }
            }
          }

          return cmp;
        }

        function subtract(a, b, aL, base) {
          var i = 0;

          // Subtract b from a.
          for (; aL--;) {
            a[aL] -= i;
            i = a[aL] < b[aL] ? 1 : 0;
            a[aL] = i * base + a[aL] - b[aL];
          }

          // Remove leading zeros.
          for (; !a[0] && a.length > 1; a.splice(0, 1));
        }

        // x: dividend, y: divisor.
        return function (x, y, dp, rm, base) {
          var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
            yL, yz,
            s = x.s == y.s ? 1 : -1,
            xc = x.c,
            yc = y.c;

          // Either NaN, Infinity or 0?
          if (!xc || !xc[0] || !yc || !yc[0]) {

            return new BigNumber(

             // Return NaN if either NaN, or both Infinity or 0.
             !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

              // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
              xc && xc[0] == 0 || !yc ? s * 0 : s / 0
           );
          }

          q = new BigNumber(s);
          qc = q.c = [];
          e = x.e - y.e;
          s = dp + e + 1;

          if (!base) {
            base = BASE;
            e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
            s = s / LOG_BASE | 0;
          }

          // Result exponent may be one less then the current value of e.
          // The coefficients of the BigNumbers from convertBase may have trailing zeros.
          for (i = 0; yc[i] == (xc[i] || 0); i++);

          if (yc[i] > (xc[i] || 0)) e--;

          if (s < 0) {
            qc.push(1);
            more = true;
          } else {
            xL = xc.length;
            yL = yc.length;
            i = 0;
            s += 2;

            // Normalise xc and yc so highest order digit of yc is >= base / 2.

            n = mathfloor(base / (yc[0] + 1));

            // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
            // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
            if (n > 1) {
              yc = multiply(yc, n, base);
              xc = multiply(xc, n, base);
              yL = yc.length;
              xL = xc.length;
            }

            xi = yL;
            rem = xc.slice(0, yL);
            remL = rem.length;

            // Add zeros to make remainder as long as divisor.
            for (; remL < yL; rem[remL++] = 0);
            yz = yc.slice();
            yz = [0].concat(yz);
            yc0 = yc[0];
            if (yc[1] >= base / 2) yc0++;
            // Not necessary, but to prevent trial digit n > base, when using base 3.
            // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

            do {
              n = 0;

              // Compare divisor and remainder.
              cmp = compare(yc, rem, yL, remL);

              // If divisor < remainder.
              if (cmp < 0) {

                // Calculate trial digit, n.

                rem0 = rem[0];
                if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

                // n is how many times the divisor goes into the current remainder.
                n = mathfloor(rem0 / yc0);

                //  Algorithm:
                //  product = divisor multiplied by trial digit (n).
                //  Compare product and remainder.
                //  If product is greater than remainder:
                //    Subtract divisor from product, decrement trial digit.
                //  Subtract product from remainder.
                //  If product was less than remainder at the last compare:
                //    Compare new remainder and divisor.
                //    If remainder is greater than divisor:
                //      Subtract divisor from remainder, increment trial digit.

                if (n > 1) {

                  // n may be > base only when base is 3.
                  if (n >= base) n = base - 1;

                  // product = divisor * trial digit.
                  prod = multiply(yc, n, base);
                  prodL = prod.length;
                  remL = rem.length;

                  // Compare product and remainder.
                  // If product > remainder then trial digit n too high.
                  // n is 1 too high about 5% of the time, and is not known to have
                  // ever been more than 1 too high.
                  while (compare(prod, rem, prodL, remL) == 1) {
                    n--;

                    // Subtract divisor from product.
                    subtract(prod, yL < prodL ? yz : yc, prodL, base);
                    prodL = prod.length;
                    cmp = 1;
                  }
                } else {

                  // n is 0 or 1, cmp is -1.
                  // If n is 0, there is no need to compare yc and rem again below,
                  // so change cmp to 1 to avoid it.
                  // If n is 1, leave cmp as -1, so yc and rem are compared again.
                  if (n == 0) {

                    // divisor < remainder, so n must be at least 1.
                    cmp = n = 1;
                  }

                  // product = divisor
                  prod = yc.slice();
                  prodL = prod.length;
                }

                if (prodL < remL) prod = [0].concat(prod);

                // Subtract product from remainder.
                subtract(rem, prod, remL, base);
                remL = rem.length;

                 // If product was < remainder.
                if (cmp == -1) {

                  // Compare divisor and new remainder.
                  // If divisor < new remainder, subtract divisor from remainder.
                  // Trial digit n too low.
                  // n is 1 too low about 5% of the time, and very rarely 2 too low.
                  while (compare(yc, rem, yL, remL) < 1) {
                    n++;

                    // Subtract divisor from remainder.
                    subtract(rem, yL < remL ? yz : yc, remL, base);
                    remL = rem.length;
                  }
                }
              } else if (cmp === 0) {
                n++;
                rem = [0];
              } // else cmp === 1 and n will be 0

              // Add the next digit, n, to the result array.
              qc[i++] = n;

              // Update the remainder.
              if (rem[0]) {
                rem[remL++] = xc[xi] || 0;
              } else {
                rem = [xc[xi]];
                remL = 1;
              }
            } while ((xi++ < xL || rem[0] != null) && s--);

            more = rem[0] != null;

            // Leading zero?
            if (!qc[0]) qc.splice(0, 1);
          }

          if (base == BASE) {

            // To calculate q.e, first get the number of digits of qc[0].
            for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

            round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

          // Caller is convertBase.
          } else {
            q.e = e;
            q.r = +more;
          }

          return q;
        };
      })();


      /*
       * Return a string representing the value of BigNumber n in fixed-point or exponential
       * notation rounded to the specified decimal places or significant digits.
       *
       * n: a BigNumber.
       * i: the index of the last digit required (i.e. the digit that may be rounded up).
       * rm: the rounding mode.
       * id: 1 (toExponential) or 2 (toPrecision).
       */
      function format(n, i, rm, id) {
        var c0, e, ne, len, str;

        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        if (!n.c) return n.toString();

        c0 = n.c[0];
        ne = n.e;

        if (i == null) {
          str = coeffToString(n.c);
          str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
           ? toExponential(str, ne)
           : toFixedPoint(str, ne, '0');
        } else {
          n = round(new BigNumber(n), i, rm);

          // n.e may have changed if the value was rounded up.
          e = n.e;

          str = coeffToString(n.c);
          len = str.length;

          // toPrecision returns exponential notation if the number of significant digits
          // specified is less than the number of digits necessary to represent the integer
          // part of the value in fixed-point notation.

          // Exponential notation.
          if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

            // Append zeros?
            for (; len < i; str += '0', len++);
            str = toExponential(str, e);

          // Fixed-point notation.
          } else {
            i -= ne;
            str = toFixedPoint(str, e, '0');

            // Append zeros?
            if (e + 1 > len) {
              if (--i > 0) for (str += '.'; i--; str += '0');
            } else {
              i += e - len;
              if (i > 0) {
                if (e + 1 == len) str += '.';
                for (; i--; str += '0');
              }
            }
          }
        }

        return n.s < 0 && c0 ? '-' + str : str;
      }


      // Handle BigNumber.max and BigNumber.min.
      function maxOrMin(args, method) {
        var n,
          i = 1,
          m = new BigNumber(args[0]);

        for (; i < args.length; i++) {
          n = new BigNumber(args[i]);

          // If any number is NaN, return NaN.
          if (!n.s) {
            m = n;
            break;
          } else if (method.call(m, n)) {
            m = n;
          }
        }

        return m;
      }


      /*
       * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
       * Called by minus, plus and times.
       */
      function normalise(n, c, e) {
        var i = 1,
          j = c.length;

         // Remove trailing zeros.
        for (; !c[--j]; c.pop());

        // Calculate the base 10 exponent. First get the number of digits of c[0].
        for (j = c[0]; j >= 10; j /= 10, i++);

        // Overflow?
        if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

          // Infinity.
          n.c = n.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          n.c = [n.e = 0];
        } else {
          n.e = e;
          n.c = c;
        }

        return n;
      }


      // Handle values that fail the validity test in BigNumber.
      parseNumeric = (function () {
        var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          dotAfter = /^([^.]+)\.$/,
          dotBefore = /^\.([^.]+)$/,
          isInfinityOrNaN = /^-?(Infinity|NaN)$/,
          whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

        return function (x, str, isNum, b) {
          var base,
            s = isNum ? str : str.replace(whitespaceOrPlus, '');

          // No exception on ±Infinity or NaN.
          if (isInfinityOrNaN.test(s)) {
            x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
          } else {
            if (!isNum) {

              // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
              s = s.replace(basePrefix, function (m, p1, p2) {
                base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                return !b || b == base ? p1 : m;
              });

              if (b) {
                base = b;

                // E.g. '1.' to '1', '.1' to '0.1'
                s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
              }

              if (str != s) return new BigNumber(s, base);
            }

            // '[BigNumber Error] Not a number: {n}'
            // '[BigNumber Error] Not a base {b} number: {n}'
            if (BigNumber.DEBUG) {
              throw Error
                (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
            }

            // NaN
            x.s = null;
          }

          x.c = x.e = null;
        }
      })();


      /*
       * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
       * If r is truthy, it is known that there are more digits after the rounding digit.
       */
      function round(x, sd, rm, r) {
        var d, i, j, k, n, ni, rd,
          xc = x.c,
          pows10 = POWS_TEN;

        // if x is not Infinity or NaN...
        if (xc) {

          // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
          // n is a base 1e14 number, the value of the element of array x.c containing rd.
          // ni is the index of n within x.c.
          // d is the number of digits of n.
          // i is the index of rd within n including leading zeros.
          // j is the actual index of rd within n (if < 0, rd is a leading zero).
          out: {

            // Get the number of digits of the first element of xc.
            for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
            i = sd - d;

            // If the rounding digit is in the first element of xc...
            if (i < 0) {
              i += LOG_BASE;
              j = sd;
              n = xc[ni = 0];

              // Get the rounding digit at index j of n.
              rd = n / pows10[d - j - 1] % 10 | 0;
            } else {
              ni = mathceil((i + 1) / LOG_BASE);

              if (ni >= xc.length) {

                if (r) {

                  // Needed by sqrt.
                  for (; xc.length <= ni; xc.push(0));
                  n = rd = 0;
                  d = 1;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + 1;
                } else {
                  break out;
                }
              } else {
                n = k = xc[ni];

                // Get the number of digits of n.
                for (d = 1; k >= 10; k /= 10, d++);

                // Get the index of rd within n.
                i %= LOG_BASE;

                // Get the index of rd within n, adjusted for leading zeros.
                // The number of leading zeros of n is given by LOG_BASE - d.
                j = i - LOG_BASE + d;

                // Get the rounding digit at index j of n.
                rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
              }
            }

            r = r || sd < 0 ||

            // Are there any non-zero digits after the rounding digit?
            // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
            // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
             xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

            r = rm < 4
             ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
             : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

              // Check whether the digit to the left of the rounding digit is odd.
              ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
               rm == (x.s < 0 ? 8 : 7));

            if (sd < 1 || !xc[0]) {
              xc.length = 0;

              if (r) {

                // Convert sd to decimal places.
                sd -= x.e + 1;

                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                x.e = -sd || 0;
              } else {

                // Zero.
                xc[0] = x.e = 0;
              }

              return x;
            }

            // Remove excess digits.
            if (i == 0) {
              xc.length = ni;
              k = 1;
              ni--;
            } else {
              xc.length = ni + 1;
              k = pows10[LOG_BASE - i];

              // E.g. 56700 becomes 56000 if 7 is the rounding digit.
              // j > 0 means i > number of leading zeros of n.
              xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
            }

            // Round up?
            if (r) {

              for (; ;) {

                // If the digit to be rounded up is in the first element of xc...
                if (ni == 0) {

                  // i will be the length of xc[0] before k is added.
                  for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                  j = xc[0] += k;
                  for (k = 1; j >= 10; j /= 10, k++);

                  // if i != k the length has increased.
                  if (i != k) {
                    x.e++;
                    if (xc[0] == BASE) xc[0] = 1;
                  }

                  break;
                } else {
                  xc[ni] += k;
                  if (xc[ni] != BASE) break;
                  xc[ni--] = 0;
                  k = 1;
                }
              }
            }

            // Remove trailing zeros.
            for (i = xc.length; xc[--i] === 0; xc.pop());
          }

          // Overflow? Infinity.
          if (x.e > MAX_EXP) {
            x.c = x.e = null;

          // Underflow? Zero.
          } else if (x.e < MIN_EXP) {
            x.c = [x.e = 0];
          }
        }

        return x;
      }


      function valueOf(n) {
        var str,
          e = n.e;

        if (e === null) return n.toString();

        str = coeffToString(n.c);

        str = e <= TO_EXP_NEG || e >= TO_EXP_POS
          ? toExponential(str, e)
          : toFixedPoint(str, e, '0');

        return n.s < 0 ? '-' + str : str;
      }


      // PROTOTYPE/INSTANCE METHODS


      /*
       * Return a new BigNumber whose value is the absolute value of this BigNumber.
       */
      P.absoluteValue = P.abs = function () {
        var x = new BigNumber(this);
        if (x.s < 0) x.s = 1;
        return x;
      };


      /*
       * Return
       *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
       *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
       *   0 if they have the same value,
       *   or null if the value of either is NaN.
       */
      P.comparedTo = function (y, b) {
        return compare(this, new BigNumber(y, b));
      };


      /*
       * If dp is undefined or null or true or false, return the number of decimal places of the
       * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
       *
       * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
       * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
       * ROUNDING_MODE if rm is omitted.
       *
       * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
       */
      P.decimalPlaces = P.dp = function (dp, rm) {
        var c, n, v,
          x = this;

        if (dp != null) {
          intCheck(dp, 0, MAX);
          if (rm == null) rm = ROUNDING_MODE;
          else intCheck(rm, 0, 8);

          return round(new BigNumber(x), dp + x.e + 1, rm);
        }

        if (!(c = x.c)) return null;
        n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

        // Subtract the number of trailing zeros of the last number.
        if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
        if (n < 0) n = 0;

        return n;
      };


      /*
       *  n / 0 = I
       *  n / N = N
       *  n / I = 0
       *  0 / n = 0
       *  0 / 0 = N
       *  0 / N = N
       *  0 / I = 0
       *  N / n = N
       *  N / 0 = N
       *  N / N = N
       *  N / I = N
       *  I / n = I
       *  I / 0 = I
       *  I / N = N
       *  I / I = N
       *
       * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
       * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
       */
      P.dividedBy = P.div = function (y, b) {
        return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
      };


      /*
       * Return a new BigNumber whose value is the integer part of dividing the value of this
       * BigNumber by the value of BigNumber(y, b).
       */
      P.dividedToIntegerBy = P.idiv = function (y, b) {
        return div(this, new BigNumber(y, b), 0, 1);
      };


      /*
       * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
       *
       * If m is present, return the result modulo m.
       * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
       * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
       *
       * The modular power operation works efficiently when x, n, and m are integers, otherwise it
       * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
       *
       * n {number|string|BigNumber} The exponent. An integer.
       * [m] {number|string|BigNumber} The modulus.
       *
       * '[BigNumber Error] Exponent not an integer: {n}'
       */
      P.exponentiatedBy = P.pow = function (n, m) {
        var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
          x = this;

        n = new BigNumber(n);

        // Allow NaN and ±Infinity, but not other non-integers.
        if (n.c && !n.isInteger()) {
          throw Error
            (bignumberError + 'Exponent not an integer: ' + valueOf(n));
        }

        if (m != null) m = new BigNumber(m);

        // Exponent of MAX_SAFE_INTEGER is 15.
        nIsBig = n.e > 14;

        // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
        if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

          // The sign of the result of pow when x is negative depends on the evenness of n.
          // If +n overflows to ±Infinity, the evenness of n would be not be known.
          y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
          return m ? y.mod(m) : y;
        }

        nIsNeg = n.s < 0;

        if (m) {

          // x % m returns NaN if abs(m) is zero, or m is NaN.
          if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

          isModExp = !nIsNeg && x.isInteger() && m.isInteger();

          if (isModExp) x = x.mod(m);

        // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
        // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
        } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
          // [1, 240000000]
          ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
          // [80000000000000]  [99999750000000]
          : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

          // If x is negative and n is odd, k = -0, else k = 0.
          k = x.s < 0 && isOdd(n) ? -0 : 0;

          // If x >= 1, k = ±Infinity.
          if (x.e > -1) k = 1 / k;

          // If n is negative return ±0, else return ±Infinity.
          return new BigNumber(nIsNeg ? 1 / k : k);

        } else if (POW_PRECISION) {

          // Truncating each coefficient array to a length of k after each multiplication
          // equates to truncating significant digits to POW_PRECISION + [28, 41],
          // i.e. there will be a minimum of 28 guard digits retained.
          k = mathceil(POW_PRECISION / LOG_BASE + 2);
        }

        if (nIsBig) {
          half = new BigNumber(0.5);
          if (nIsNeg) n.s = 1;
          nIsOdd = isOdd(n);
        } else {
          i = Math.abs(+valueOf(n));
          nIsOdd = i % 2;
        }

        y = new BigNumber(ONE);

        // Performs 54 loop iterations for n of 9007199254740991.
        for (; ;) {

          if (nIsOdd) {
            y = y.times(x);
            if (!y.c) break;

            if (k) {
              if (y.c.length > k) y.c.length = k;
            } else if (isModExp) {
              y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
            }
          }

          if (i) {
            i = mathfloor(i / 2);
            if (i === 0) break;
            nIsOdd = i % 2;
          } else {
            n = n.times(half);
            round(n, n.e + 1, 1);

            if (n.e > 14) {
              nIsOdd = isOdd(n);
            } else {
              i = +valueOf(n);
              if (i === 0) break;
              nIsOdd = i % 2;
            }
          }

          x = x.times(x);

          if (k) {
            if (x.c && x.c.length > k) x.c.length = k;
          } else if (isModExp) {
            x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
          }
        }

        if (isModExp) return y;
        if (nIsNeg) y = ONE.div(y);

        return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
      };


      /*
       * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
       * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
       *
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
       */
      P.integerValue = function (rm) {
        var n = new BigNumber(this);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);
        return round(n, n.e + 1, rm);
      };


      /*
       * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
       * otherwise return false.
       */
      P.isEqualTo = P.eq = function (y, b) {
        return compare(this, new BigNumber(y, b)) === 0;
      };


      /*
       * Return true if the value of this BigNumber is a finite number, otherwise return false.
       */
      P.isFinite = function () {
        return !!this.c;
      };


      /*
       * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
       * otherwise return false.
       */
      P.isGreaterThan = P.gt = function (y, b) {
        return compare(this, new BigNumber(y, b)) > 0;
      };


      /*
       * Return true if the value of this BigNumber is greater than or equal to the value of
       * BigNumber(y, b), otherwise return false.
       */
      P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
        return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

      };


      /*
       * Return true if the value of this BigNumber is an integer, otherwise return false.
       */
      P.isInteger = function () {
        return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
      };


      /*
       * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
       * otherwise return false.
       */
      P.isLessThan = P.lt = function (y, b) {
        return compare(this, new BigNumber(y, b)) < 0;
      };


      /*
       * Return true if the value of this BigNumber is less than or equal to the value of
       * BigNumber(y, b), otherwise return false.
       */
      P.isLessThanOrEqualTo = P.lte = function (y, b) {
        return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
      };


      /*
       * Return true if the value of this BigNumber is NaN, otherwise return false.
       */
      P.isNaN = function () {
        return !this.s;
      };


      /*
       * Return true if the value of this BigNumber is negative, otherwise return false.
       */
      P.isNegative = function () {
        return this.s < 0;
      };


      /*
       * Return true if the value of this BigNumber is positive, otherwise return false.
       */
      P.isPositive = function () {
        return this.s > 0;
      };


      /*
       * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
       */
      P.isZero = function () {
        return !!this.c && this.c[0] == 0;
      };


      /*
       *  n - 0 = n
       *  n - N = N
       *  n - I = -I
       *  0 - n = -n
       *  0 - 0 = 0
       *  0 - N = N
       *  0 - I = -I
       *  N - n = N
       *  N - 0 = N
       *  N - N = N
       *  N - I = N
       *  I - n = I
       *  I - 0 = I
       *  I - N = N
       *  I - I = N
       *
       * Return a new BigNumber whose value is the value of this BigNumber minus the value of
       * BigNumber(y, b).
       */
      P.minus = function (y, b) {
        var i, j, t, xLTy,
          x = this,
          a = x.s;

        y = new BigNumber(y, b);
        b = y.s;

        // Either NaN?
        if (!a || !b) return new BigNumber(NaN);

        // Signs differ?
        if (a != b) {
          y.s = -b;
          return x.plus(y);
        }

        var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

        if (!xe || !ye) {

          // Either Infinity?
          if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

          // Either zero?
          if (!xc[0] || !yc[0]) {

            // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
            return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

             // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
             ROUNDING_MODE == 3 ? -0 : 0);
          }
        }

        xe = bitFloor(xe);
        ye = bitFloor(ye);
        xc = xc.slice();

        // Determine which is the bigger number.
        if (a = xe - ye) {

          if (xLTy = a < 0) {
            a = -a;
            t = xc;
          } else {
            ye = xe;
            t = yc;
          }

          t.reverse();

          // Prepend zeros to equalise exponents.
          for (b = a; b--; t.push(0));
          t.reverse();
        } else {

          // Exponents equal. Check digit by digit.
          j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

          for (a = b = 0; b < j; b++) {

            if (xc[b] != yc[b]) {
              xLTy = xc[b] < yc[b];
              break;
            }
          }
        }

        // x < y? Point xc to the array of the bigger number.
        if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

        b = (j = yc.length) - (i = xc.length);

        // Append zeros to xc if shorter.
        // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
        if (b > 0) for (; b--; xc[i++] = 0);
        b = BASE - 1;

        // Subtract yc from xc.
        for (; j > a;) {

          if (xc[--j] < yc[j]) {
            for (i = j; i && !xc[--i]; xc[i] = b);
            --xc[i];
            xc[j] += BASE;
          }

          xc[j] -= yc[j];
        }

        // Remove leading zeros and adjust exponent accordingly.
        for (; xc[0] == 0; xc.splice(0, 1), --ye);

        // Zero?
        if (!xc[0]) {

          // Following IEEE 754 (2008) 6.3,
          // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
          y.s = ROUNDING_MODE == 3 ? -1 : 1;
          y.c = [y.e = 0];
          return y;
        }

        // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
        // for finite x and y.
        return normalise(y, xc, ye);
      };


      /*
       *   n % 0 =  N
       *   n % N =  N
       *   n % I =  n
       *   0 % n =  0
       *  -0 % n = -0
       *   0 % 0 =  N
       *   0 % N =  N
       *   0 % I =  0
       *   N % n =  N
       *   N % 0 =  N
       *   N % N =  N
       *   N % I =  N
       *   I % n =  N
       *   I % 0 =  N
       *   I % N =  N
       *   I % I =  N
       *
       * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
       * BigNumber(y, b). The result depends on the value of MODULO_MODE.
       */
      P.modulo = P.mod = function (y, b) {
        var q, s,
          x = this;

        y = new BigNumber(y, b);

        // Return NaN if x is Infinity or NaN, or y is NaN or zero.
        if (!x.c || !y.s || y.c && !y.c[0]) {
          return new BigNumber(NaN);

        // Return x if y is Infinity or x is zero.
        } else if (!y.c || x.c && !x.c[0]) {
          return new BigNumber(x);
        }

        if (MODULO_MODE == 9) {

          // Euclidian division: q = sign(y) * floor(x / abs(y))
          // r = x - qy    where  0 <= r < abs(y)
          s = y.s;
          y.s = 1;
          q = div(x, y, 0, 3);
          y.s = s;
          q.s *= s;
        } else {
          q = div(x, y, 0, MODULO_MODE);
        }

        y = x.minus(q.times(y));

        // To match JavaScript %, ensure sign of zero is sign of dividend.
        if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

        return y;
      };


      /*
       *  n * 0 = 0
       *  n * N = N
       *  n * I = I
       *  0 * n = 0
       *  0 * 0 = 0
       *  0 * N = N
       *  0 * I = N
       *  N * n = N
       *  N * 0 = N
       *  N * N = N
       *  N * I = N
       *  I * n = I
       *  I * 0 = N
       *  I * N = N
       *  I * I = I
       *
       * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
       * of BigNumber(y, b).
       */
      P.multipliedBy = P.times = function (y, b) {
        var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
          base, sqrtBase,
          x = this,
          xc = x.c,
          yc = (y = new BigNumber(y, b)).c;

        // Either NaN, ±Infinity or ±0?
        if (!xc || !yc || !xc[0] || !yc[0]) {

          // Return NaN if either is NaN, or one is 0 and the other is Infinity.
          if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
            y.c = y.e = y.s = null;
          } else {
            y.s *= x.s;

            // Return ±Infinity if either is ±Infinity.
            if (!xc || !yc) {
              y.c = y.e = null;

            // Return ±0 if either is ±0.
            } else {
              y.c = [0];
              y.e = 0;
            }
          }

          return y;
        }

        e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
        y.s *= x.s;
        xcL = xc.length;
        ycL = yc.length;

        // Ensure xc points to longer array and xcL to its length.
        if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

        // Initialise the result array with zeros.
        for (i = xcL + ycL, zc = []; i--; zc.push(0));

        base = BASE;
        sqrtBase = SQRT_BASE;

        for (i = ycL; --i >= 0;) {
          c = 0;
          ylo = yc[i] % sqrtBase;
          yhi = yc[i] / sqrtBase | 0;

          for (k = xcL, j = i + k; j > i;) {
            xlo = xc[--k] % sqrtBase;
            xhi = xc[k] / sqrtBase | 0;
            m = yhi * xlo + xhi * ylo;
            xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
            c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
            zc[j--] = xlo % base;
          }

          zc[j] = c;
        }

        if (c) {
          ++e;
        } else {
          zc.splice(0, 1);
        }

        return normalise(y, zc, e);
      };


      /*
       * Return a new BigNumber whose value is the value of this BigNumber negated,
       * i.e. multiplied by -1.
       */
      P.negated = function () {
        var x = new BigNumber(this);
        x.s = -x.s || null;
        return x;
      };


      /*
       *  n + 0 = n
       *  n + N = N
       *  n + I = I
       *  0 + n = n
       *  0 + 0 = 0
       *  0 + N = N
       *  0 + I = I
       *  N + n = N
       *  N + 0 = N
       *  N + N = N
       *  N + I = N
       *  I + n = I
       *  I + 0 = I
       *  I + N = N
       *  I + I = I
       *
       * Return a new BigNumber whose value is the value of this BigNumber plus the value of
       * BigNumber(y, b).
       */
      P.plus = function (y, b) {
        var t,
          x = this,
          a = x.s;

        y = new BigNumber(y, b);
        b = y.s;

        // Either NaN?
        if (!a || !b) return new BigNumber(NaN);

        // Signs differ?
         if (a != b) {
          y.s = -b;
          return x.minus(y);
        }

        var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

        if (!xe || !ye) {

          // Return ±Infinity if either ±Infinity.
          if (!xc || !yc) return new BigNumber(a / 0);

          // Either zero?
          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
        }

        xe = bitFloor(xe);
        ye = bitFloor(ye);
        xc = xc.slice();

        // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
        if (a = xe - ye) {
          if (a > 0) {
            ye = xe;
            t = yc;
          } else {
            a = -a;
            t = xc;
          }

          t.reverse();
          for (; a--; t.push(0));
          t.reverse();
        }

        a = xc.length;
        b = yc.length;

        // Point xc to the longer array, and b to the shorter length.
        if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

        // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
        for (a = 0; b;) {
          a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
          xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
        }

        if (a) {
          xc = [a].concat(xc);
          ++ye;
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0
        // ye = MAX_EXP + 1 possible
        return normalise(y, xc, ye);
      };


      /*
       * If sd is undefined or null or true or false, return the number of significant digits of
       * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
       * If sd is true include integer-part trailing zeros in the count.
       *
       * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
       * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
       * ROUNDING_MODE if rm is omitted.
       *
       * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
       *                     boolean: whether to count integer-part trailing zeros: true or false.
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
       */
      P.precision = P.sd = function (sd, rm) {
        var c, n, v,
          x = this;

        if (sd != null && sd !== !!sd) {
          intCheck(sd, 1, MAX);
          if (rm == null) rm = ROUNDING_MODE;
          else intCheck(rm, 0, 8);

          return round(new BigNumber(x), sd, rm);
        }

        if (!(c = x.c)) return null;
        v = c.length - 1;
        n = v * LOG_BASE + 1;

        if (v = c[v]) {

          // Subtract the number of trailing zeros of the last element.
          for (; v % 10 == 0; v /= 10, n--);

          // Add the number of digits of the first element.
          for (v = c[0]; v >= 10; v /= 10, n++);
        }

        if (sd && x.e + 1 > n) n = x.e + 1;

        return n;
      };


      /*
       * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
       * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
       *
       * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
       */
      P.shiftedBy = function (k) {
        intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
        return this.times('1e' + k);
      };


      /*
       *  sqrt(-n) =  N
       *  sqrt(N) =  N
       *  sqrt(-I) =  N
       *  sqrt(I) =  I
       *  sqrt(0) =  0
       *  sqrt(-0) = -0
       *
       * Return a new BigNumber whose value is the square root of the value of this BigNumber,
       * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
       */
      P.squareRoot = P.sqrt = function () {
        var m, n, r, rep, t,
          x = this,
          c = x.c,
          s = x.s,
          e = x.e,
          dp = DECIMAL_PLACES + 4,
          half = new BigNumber('0.5');

        // Negative/NaN/Infinity/zero?
        if (s !== 1 || !c || !c[0]) {
          return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
        }

        // Initial estimate.
        s = Math.sqrt(+valueOf(x));

        // Math.sqrt underflow/overflow?
        // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
        if (s == 0 || s == 1 / 0) {
          n = coeffToString(c);
          if ((n.length + e) % 2 == 0) n += '0';
          s = Math.sqrt(+n);
          e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

          if (s == 1 / 0) {
            n = '5e' + e;
          } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf('e') + 1) + e;
          }

          r = new BigNumber(n);
        } else {
          r = new BigNumber(s + '');
        }

        // Check for zero.
        // r could be zero if MIN_EXP is changed after the this value was created.
        // This would cause a division by zero (x/t) and hence Infinity below, which would cause
        // coeffToString to throw.
        if (r.c[0]) {
          e = r.e;
          s = e + dp;
          if (s < 3) s = 0;

          // Newton-Raphson iteration.
          for (; ;) {
            t = r;
            r = half.times(t.plus(div(x, t, dp, 1)));

            if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

              // The exponent of r may here be one less than the final result exponent,
              // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
              // are indexed correctly.
              if (r.e < e) --s;
              n = n.slice(s - 3, s + 1);

              // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
              // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
              // iteration.
              if (n == '9999' || !rep && n == '4999') {

                // On the first iteration only, check to see if rounding up gives the
                // exact result as the nines may infinitely repeat.
                if (!rep) {
                  round(t, t.e + DECIMAL_PLACES + 2, 0);

                  if (t.times(t).eq(x)) {
                    r = t;
                    break;
                  }
                }

                dp += 4;
                s += 4;
                rep = 1;
              } else {

                // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                // result. If not, then there are further digits and m will be truthy.
                if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                  // Truncate to the first rounding digit.
                  round(r, r.e + DECIMAL_PLACES + 2, 1);
                  m = !r.times(r).eq(x);
                }

                break;
              }
            }
          }
        }

        return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
      };


      /*
       * Return a string representing the value of this BigNumber in exponential notation and
       * rounded using ROUNDING_MODE to dp fixed decimal places.
       *
       * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
       */
      P.toExponential = function (dp, rm) {
        if (dp != null) {
          intCheck(dp, 0, MAX);
          dp++;
        }
        return format(this, dp, rm, 1);
      };


      /*
       * Return a string representing the value of this BigNumber in fixed-point notation rounding
       * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
       *
       * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
       * but e.g. (-0.00001).toFixed(0) is '-0'.
       *
       * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
       */
      P.toFixed = function (dp, rm) {
        if (dp != null) {
          intCheck(dp, 0, MAX);
          dp = dp + this.e + 1;
        }
        return format(this, dp, rm);
      };


      /*
       * Return a string representing the value of this BigNumber in fixed-point notation rounded
       * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
       * of the format or FORMAT object (see BigNumber.set).
       *
       * The formatting object may contain some or all of the properties shown below.
       *
       * FORMAT = {
       *   prefix: '',
       *   groupSize: 3,
       *   secondaryGroupSize: 0,
       *   groupSeparator: ',',
       *   decimalSeparator: '.',
       *   fractionGroupSize: 0,
       *   fractionGroupSeparator: '\xA0',      // non-breaking space
       *   suffix: ''
       * };
       *
       * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       * [format] {object} Formatting options. See FORMAT pbject above.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
       * '[BigNumber Error] Argument not an object: {format}'
       */
      P.toFormat = function (dp, rm, format) {
        var str,
          x = this;

        if (format == null) {
          if (dp != null && rm && typeof rm == 'object') {
            format = rm;
            rm = null;
          } else if (dp && typeof dp == 'object') {
            format = dp;
            dp = rm = null;
          } else {
            format = FORMAT;
          }
        } else if (typeof format != 'object') {
          throw Error
            (bignumberError + 'Argument not an object: ' + format);
        }

        str = x.toFixed(dp, rm);

        if (x.c) {
          var i,
            arr = str.split('.'),
            g1 = +format.groupSize,
            g2 = +format.secondaryGroupSize,
            groupSeparator = format.groupSeparator || '',
            intPart = arr[0],
            fractionPart = arr[1],
            isNeg = x.s < 0,
            intDigits = isNeg ? intPart.slice(1) : intPart,
            len = intDigits.length;

          if (g2) i = g1, g1 = g2, g2 = i, len -= i;

          if (g1 > 0 && len > 0) {
            i = len % g1 || g1;
            intPart = intDigits.substr(0, i);
            for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
            if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
            if (isNeg) intPart = '-' + intPart;
          }

          str = fractionPart
           ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
            ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
             '$&' + (format.fractionGroupSeparator || ''))
            : fractionPart)
           : intPart;
        }

        return (format.prefix || '') + str + (format.suffix || '');
      };


      /*
       * Return an array of two BigNumbers representing the value of this BigNumber as a simple
       * fraction with an integer numerator and an integer denominator.
       * The denominator will be a positive non-zero value less than or equal to the specified
       * maximum denominator. If a maximum denominator is not specified, the denominator will be
       * the lowest value necessary to represent the number exactly.
       *
       * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
       *
       * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
       */
      P.toFraction = function (md) {
        var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
          x = this,
          xc = x.c;

        if (md != null) {
          n = new BigNumber(md);

          // Throw if md is less than one or is not an integer, unless it is Infinity.
          if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
            throw Error
              (bignumberError + 'Argument ' +
                (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
          }
        }

        if (!xc) return new BigNumber(x);

        d = new BigNumber(ONE);
        n1 = d0 = new BigNumber(ONE);
        d1 = n0 = new BigNumber(ONE);
        s = coeffToString(xc);

        // Determine initial denominator.
        // d is a power of 10 and the minimum max denominator that specifies the value exactly.
        e = d.e = s.length - x.e - 1;
        d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
        md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

        exp = MAX_EXP;
        MAX_EXP = 1 / 0;
        n = new BigNumber(s);

        // n0 = d1 = 0
        n0.c[0] = 0;

        for (; ;)  {
          q = div(n, d, 0, 1);
          d2 = d0.plus(q.times(d1));
          if (d2.comparedTo(md) == 1) break;
          d0 = d1;
          d1 = d2;
          n1 = n0.plus(q.times(d2 = n1));
          n0 = d2;
          d = n.minus(q.times(d2 = d));
          n = d2;
        }

        d2 = div(md.minus(d0), d1, 0, 1);
        n0 = n0.plus(d2.times(n1));
        d0 = d0.plus(d2.times(d1));
        n0.s = n1.s = x.s;
        e = e * 2;

        // Determine which fraction is closer to x, n0/d0 or n1/d1
        r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
            div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

        MAX_EXP = exp;

        return r;
      };


      /*
       * Return the value of this BigNumber converted to a number primitive.
       */
      P.toNumber = function () {
        return +valueOf(this);
      };


      /*
       * Return a string representing the value of this BigNumber rounded to sd significant digits
       * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
       * necessary to represent the integer part of the value in fixed-point notation, then use
       * exponential notation.
       *
       * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
       * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
       *
       * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
       */
      P.toPrecision = function (sd, rm) {
        if (sd != null) intCheck(sd, 1, MAX);
        return format(this, sd, rm, 2);
      };


      /*
       * Return a string representing the value of this BigNumber in base b, or base 10 if b is
       * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
       * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
       * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
       * TO_EXP_NEG, return exponential notation.
       *
       * [b] {number} Integer, 2 to ALPHABET.length inclusive.
       *
       * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
       */
      P.toString = function (b) {
        var str,
          n = this,
          s = n.s,
          e = n.e;

        // Infinity or NaN?
        if (e === null) {
          if (s) {
            str = 'Infinity';
            if (s < 0) str = '-' + str;
          } else {
            str = 'NaN';
          }
        } else {
          if (b == null) {
            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
             ? toExponential(coeffToString(n.c), e)
             : toFixedPoint(coeffToString(n.c), e, '0');
          } else if (b === 10) {
            n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
            str = toFixedPoint(coeffToString(n.c), n.e, '0');
          } else {
            intCheck(b, 2, ALPHABET.length, 'Base');
            str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
          }

          if (s < 0 && n.c[0]) str = '-' + str;
        }

        return str;
      };


      /*
       * Return as toString, but do not accept a base argument, and include the minus sign for
       * negative zero.
       */
      P.valueOf = P.toJSON = function () {
        return valueOf(this);
      };


      P._isBigNumber = true;

      if (configObject != null) BigNumber.set(configObject);

      return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS

    // These functions don't need access to variables,
    // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


    function bitFloor(n) {
      var i = n | 0;
      return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
      var s, z,
        i = 1,
        j = a.length,
        r = a[0] + '';

      for (; i < j;) {
        s = a[i++] + '';
        z = LOG_BASE - s.length;
        for (; z--; s = '0' + s);
        r += s;
      }

      // Determine trailing zeros.
      for (j = r.length; r.charCodeAt(--j) === 48;);

      return r.slice(0, j + 1 || 1);
    }


    // Compare the value of BigNumbers x and y.
    function compare(x, y) {
      var a, b,
        xc = x.c,
        yc = y.c,
        i = x.s,
        j = y.s,
        k = x.e,
        l = y.e;

      // Either NaN?
      if (!i || !j) return null;

      a = xc && !xc[0];
      b = yc && !yc[0];

      // Either zero?
      if (a || b) return a ? b ? 0 : -j : i;

      // Signs differ?
      if (i != j) return i;

      a = i < 0;
      b = k == l;

      // Either Infinity?
      if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

      // Compare exponents.
      if (!b) return k > l ^ a ? 1 : -1;

      j = (k = xc.length) < (l = yc.length) ? k : l;

      // Compare digit by digit.
      for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

      // Compare lengths.
      return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Check that n is a primitive number, an integer, and in range, otherwise throw.
     */
    function intCheck(n, min, max, name) {
      if (n < min || n > max || n !== mathfloor(n)) {
        throw Error
         (bignumberError + (name || 'Argument') + (typeof n == 'number'
           ? n < min || n > max ? ' out of range: ' : ' not an integer: '
           : ' not a primitive number: ') + String(n));
      }
    }


    // Assumes finite n.
    function isOdd(n) {
      var k = n.c.length - 1;
      return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
    }


    function toExponential(str, e) {
      return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
       (e < 0 ? 'e' : 'e+') + e;
    }


    function toFixedPoint(str, e, z) {
      var len, zs;

      // Negative exponent?
      if (e < 0) {

        // Prepend zeros.
        for (zs = z + '.'; ++e; zs += z);
        str = zs + str;

      // Positive exponent
      } else {
        len = str.length;

        // Append zeros.
        if (++e > len) {
          for (zs = z, e -= len; --e; zs += z);
          str += zs;
        } else if (e < len) {
          str = str.slice(0, e) + '.' + str.slice(e);
        }
      }

      return str;
    }


    // EXPORT


    BigNumber = clone();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;

    // AMD.
    if (module.exports) {
      module.exports = BigNumber;

    // Browser.
    } else {
      if (!globalObject) {
        globalObject = typeof self != 'undefined' && self ? self : window;
      }

      globalObject.BigNumber = BigNumber;
    }
  })(this);
  });
  var bignumber_1 = bignumber.BigNumber;

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * @public
   */
  function hexToBytes(hex) {
      if (typeof hex != 'string')
          throw new Error('hexToBytes only accept strings, got: ' + typeof hex);
      if (hex.substr(0, 2) === '0x') {
          return hexToBytes(hex.substr(2));
      }
      const result = new Uint8Array(Math.ceil(hex.length / 2));
      let i = 0;
      for (let char = 0; char < hex.length; char += 2) {
          const n = parseInt(hex.substr(char, 2), 16);
          if (isNaN(n))
              throw new Error('Cannot read hex string:' + JSON.stringify(hex));
          result[i] = parseInt(hex.substr(char, 2), 16);
          i++;
      }
      return result;
  }
  /**
   * @public
   */
  function sha3(value, options) {
      if (typeof value == 'string') {
          if (options && options.encoding === 'hex' && typeof value == 'string') {
              let mutValue = value;
              if (mutValue.length > 2 && mutValue.substr(0, 2) === '0x') {
                  mutValue = mutValue.substr(2);
              }
              const t = hexToBytes(mutValue);
              return sha3_4(t);
          }
          else {
              return sha3_4(utf8_1(value));
          }
      }
      return sha3_4(value);
  }
  let unitMap = {
      noether: '0',
      wei: '1',
      kwei: '1000',
      Kwei: '1000',
      babbage: '1000',
      femtoether: '1000',
      mwei: '1000000',
      Mwei: '1000000',
      lovelace: '1000000',
      picoether: '1000000',
      gwei: '1000000000',
      Gwei: '1000000000',
      shannon: '1000000000',
      nanoether: '1000000000',
      nano: '1000000000',
      szabo: '1000000000000',
      microether: '1000000000000',
      micro: '1000000000000',
      finney: '1000000000000000',
      milliether: '1000000000000000',
      milli: '1000000000000000',
      ether: '1000000000000000000',
      kether: '1000000000000000000000',
      grand: '1000000000000000000000',
      mether: '1000000000000000000000000',
      gether: '1000000000000000000000000000',
      tether: '1000000000000000000000000000000'
  };
  /**
   * @public
   * Should be called to pad string to expected length
   */
  function padLeft(str, chars, sign) {
      return new Array(chars - str.length + 1).join(sign ? sign : '0') + str;
  }
  /**
   * @public
   * Should be called to pad string to expected length
   */
  function padRight(str, chars, sign) {
      return str + new Array(chars - str.length + 1).join(sign ? sign : '0');
  }
  /**
   * @public
   * Should be called to get utf8 from it's hex representation
   */
  function toUtf8(hex) {
      // Find termination
      let str = '';
      let i = 0;
      let l = hex.length;
      if (hex.substring(0, 2) === '0x') {
          i = 2;
      }
      for (; i < l; i += 2) {
          let code = parseInt(hex.substr(i, 2), 16);
          if (code === 0)
              break;
          str += String.fromCharCode(code);
      }
      return utf8_2(str);
  }
  /**
   * @public
   * Should be called to get ascii from it's hex representation
   */
  function toAscii(hex) {
      // Find termination
      let str = '';
      let i = 0;
      let l = hex.length;
      if (hex.substring(0, 2) === '0x') {
          i = 2;
      }
      for (; i < l; i += 2) {
          let code = parseInt(hex.substr(i, 2), 16);
          str += String.fromCharCode(code);
      }
      return str;
  }
  /**
   * @public
   * Should be called to get hex representation (prefixed by 0x) of utf8 string
   */
  function fromUtf8(_str, allowZero = false) {
      let str = utf8_1(_str);
      let hex = '';
      for (let i = 0; i < str.length; i++) {
          let code = str.charCodeAt(i);
          if (code === 0) {
              if (allowZero) {
                  hex += '00';
              }
              else {
                  break;
              }
          }
          else {
              let n = code.toString(16);
              hex += n.length < 2 ? '0' + n : n;
          }
      }
      return '0x' + hex;
  }
  /**
   * @public
   * Should be called to get hex representation (prefixed by 0x) of ascii string
   */
  function fromAscii(str, num = 0) {
      let hex = '';
      for (let i = 0; i < str.length; i++) {
          let code = str.charCodeAt(i);
          let n = code.toString(16);
          hex += n.length < 2 ? '0' + n : n;
      }
      return '0x' + hex.padEnd(num, '0');
  }
  /**
   * @public
   * Should be used to create full function/event name from json abi
   */
  function transformToFullName(json) {
      if (json.name && json.name.indexOf('(') !== -1) {
          return json.name;
      }
      let typeName = '';
      if (json.inputs) {
          typeName = json.inputs
              .map(function (i) {
              return i.type;
          })
              .join();
      }
      return json.name + '(' + typeName + ')';
  }
  /**
   * @public
   * Should be called to get display name of contract function
   */
  function extractDisplayName(name) {
      let stBracket = name.indexOf('(');
      let endBracket = name.indexOf(')');
      return stBracket !== -1 && endBracket !== -1 ? name.substr(0, stBracket) : name;
  }
  /**
   * @public
   * Should be called to get type name of contract function
   */
  function extractTypeName(name) {
      let stBracket = name.indexOf('(');
      let endBracket = name.indexOf(')');
      return stBracket !== -1 && endBracket !== -1
          ? name.substr(stBracket + 1, endBracket - stBracket - 1).replace(' ', '')
          : '';
  }
  /**
   * @public
   * Converts value to it's decimal representation in string
   */
  function isHex(value) {
      if (typeof value === 'string') {
          return /^0x[0-9a-fA-F]+$/.test(value);
      }
      else
          return false;
  }
  /**
   * @public
   * Converts value to it's decimal representation in string
   */
  function toNullDecimal(value) {
      if (value === undefined || value === null)
          return value;
      return toBigNumber(value).toNumber();
  }
  /**
   * @public
   * Converts value to it's decimal representation in string
   */
  function toDecimal(value) {
      return toBigNumber(value).toNumber();
  }
  /**
   * @public
   * Converts value to string
   */
  function toString(value) {
      if (isBigNumber(value))
          return value.toString(10);
      return '' + value;
  }
  /**
   * @public
   * Converts value to it's hex  representation in string
   */
  function toData(val) {
      if (typeof val === 'string') {
          if (!val.startsWith('0x') && /^[A-Za-z0-9]+$/.test(val)) {
              return '0x' + val;
          }
      }
      return toHex(val);
  }
  /**
   * @public
   * Converts value to it's boolean representation (x != 0)
   */
  function toBoolean(value) {
      if (typeof value === 'boolean')
          return value;
      return toBigNumber(value).toNumber() !== 0;
  }
  /**
   * @public
   * Converts value to it's hex representation
   */
  function fromDecimal(value) {
      let num = toBigNumber(value);
      let result = num.toString(16);
      return num.isLessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
  }
  /**
   * @public
   * Auto converts any given value into it's hex representation.
   *
   * And even stringifys objects before.
   */
  function toHex(val) {
      if (isBoolean(val))
          return fromDecimal(+val);
      if (isBigNumber(val))
          return fromDecimal(val);
      if (typeof val === 'object')
          return fromUtf8(JSON.stringify(val));
      // if its a negative number, pass it through fromDecimal
      if (isString(val)) {
          const valStr = val;
          if (valStr.indexOf('-0x') === 0)
              return fromDecimal(valStr);
          else if (valStr.indexOf('0x') === 0)
              return valStr;
          else if (!isFinite(valStr))
              return fromUtf8(valStr, true);
      }
      return fromDecimal(val);
  }
  /**
   * @public
   * Returns value of unit in Wei
   */
  function getValueOfUnit(_unit) {
      let unit = _unit ? _unit.toLowerCase() : 'ether';
      let unitValue = unitMap[unit];
      if (unitValue === undefined) {
          throw new Error("This unit doesn't exists, please use the one of the following units" + JSON.stringify(unitMap, null, 2));
      }
      return new bignumber_1(unitValue, 10);
  }
  function fromWei(num, unit) {
      let returnValue = toBigNumber(num).dividedBy(getValueOfUnit(unit));
      return isBigNumber(num) ? returnValue : returnValue.toString(10);
  }
  /**
   * @public
   * Takes a number of a unit and converts it to wei.
   *
   * Possible units are:
   *   SI Short   SI Full        Effigy       Other
   * - kwei       femtoether     babbage
   * - mwei       picoether      lovelace
   * - gwei       nanoether      shannon      nano
   * - --         microether     szabo        micro
   * - --         milliether     finney       milli
   * - ether      --             --
   * - kether                    --           grand
   * - mether
   * - gether
   * - tether
   */
  function toWei(num, unit) {
      let returnValue = toBigNumber(num).times(getValueOfUnit(unit));
      return isBigNumber(num) ? returnValue : returnValue.toString(10);
  }
  /**
   * @public
   * Takes an input and transforms it into an bignumber
   */
  function toBigNumber(_num) {
      let num = _num || 0;
      if (isBigNumber(num)) {
          return num;
      }
      if (typeof num === 'string') {
          num = num.trim();
      }
      if (typeof num === 'string' && (num.indexOf('0x') === 0 || num.indexOf('-0x') === 0)) {
          return new bignumber_1(num.replace('0x', '').toLowerCase(), 16);
      }
      return new bignumber_1(num, 10);
  }
  /**
   * @public
   * Takes and input transforms it into bignumber and if it is negative value, into two's complement
   */
  function toTwosComplement(num) {
      let bigNumber = toBigNumber(num).integerValue();
      if (bigNumber.isLessThan(0)) {
          return new bignumber_1('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).plus(bigNumber).plus(1);
      }
      return bigNumber;
  }
  /**
   * @public
   * Checks if the given string is strictly an address
   */
  function isStrictAddress(address) {
      return /^0x[0-9a-f]{40}$/i.test(address);
  }
  /**
   * @public
   * Checks if the given string is an address
   */
  function isAddress(address) {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
          // check if it has the basic requirements of an address
          return false;
      }
      else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
          // If it's all small caps or all all caps, return true
          return true;
      }
      else {
          // Otherwise check each case
          return isChecksumAddress(address);
      }
  }
  /**
   * @public
   * Checks if the given string is a checksummed address
   */
  function isChecksumAddress(_address) {
      // Check each case
      const address = _address.replace('0x', '');
      let addressHash = sha3(address.toLowerCase());
      for (let i = 0; i < 40; i++) {
          // the nth letter should be uppercase if the nth digit of casemap is 1
          if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
              (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
              return false;
          }
      }
      return true;
  }
  /**
   * @public
   * Makes a checksum address
   */
  function toChecksumAddress(_address) {
      if (typeof _address === 'undefined')
          return '';
      const address = _address.toLowerCase().replace('0x', '');
      const addressHash = sha3(address);
      let checksumAddress = '0x';
      for (let i = 0; i < address.length; i++) {
          // If ith character is 9 to f then make it uppercase
          if (parseInt(addressHash[i], 16) > 7) {
              checksumAddress += address[i].toUpperCase();
          }
          else {
              checksumAddress += address[i];
          }
      }
      return checksumAddress;
  }
  /**
   * @public
   * Ensures the result will be an array
   */
  function toArray(value) {
      if (!Array.isArray(value)) {
          throw new Error(`Value was not an array: ${JSON.stringify(value)}`);
      }
      return value;
  }
  /**
   * @public
   * Transforms given string to valid 20 bytes-length addres with 0x prefix
   */
  function toAddress(address) {
      if (isStrictAddress(address)) {
          return address;
      }
      if (/^[0-9a-f]{40}$/.test(address)) {
          return '0x' + address;
      }
      return '0x' + padLeft(toHex(address).substr(2), 40);
  }
  /**
   * @public
   * Returns true if object is BigNumber, otherwise false
   */
  function isBigNumber(object) {
      return object instanceof bignumber_1;
  }
  /**
   * @public
   * Returns true if object is string, otherwise false
   */
  function isString(value) {
      return typeof value === 'string' || (value && value.constructor && value.constructor.name === 'String');
  }
  /**
   * @public
   * Returns true if object is function, otherwise false
   */
  function isFunction(object) {
      return typeof object === 'function';
  }
  /**
   * @public
   * Returns true if object is Objet, otherwise false
   */
  function isObject(object) {
      return object !== null && !Array.isArray(object) && typeof object === 'object';
  }
  /**
   * @public
   * Returns true if object is boolean, otherwise false
   */
  function isBoolean(object) {
      return typeof object === 'boolean';
  }
  /**
   * @public
   * Returns true if object is array, otherwise false
   */
  function isArray(object) {
      return Array.isArray(object);
  }
  /**
   * @public
   * Returns true if given string is valid json object
   */
  function isJson(str) {
      try {
          return !!JSON.parse(str);
      }
      catch (e) {
          return false;
      }
  }
  /**
   * @public
   * Returns true if given string is a valid Ethereum block header bloom.
   */
  function isBloom(bloom) {
      if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
          return false;
      }
      else if (/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
          return true;
      }
      return false;
  }
  /**
   * @public
   * Returns true if given string is a valid log topic.
   */
  function isTopic(topic) {
      if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
          return false;
      }
      else if (/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
          return true;
      }
      return false;
  }

  /**
   * @public
   */
  exports.TransactionStatus = void 0;
  (function (TransactionStatus) {
      TransactionStatus["pending"] = "pending";
      TransactionStatus["confirmed"] = "confirmed";
      TransactionStatus["failed"] = "failed";
  })(exports.TransactionStatus || (exports.TransactionStatus = {}));
  /**
   * @public
   */
  exports.TransactionType = void 0;
  (function (TransactionType) {
      TransactionType["queued"] = "queued";
      TransactionType["dropped"] = "dropped";
      TransactionType["replaced"] = "replaced";
      TransactionType["pending"] = "pending";
      TransactionType["reverted"] = "reverted";
      TransactionType["confirmed"] = "confirmed";
  })(exports.TransactionType || (exports.TransactionType = {}));

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  exports.messageId = 0;
  /**
   * Should be called to valid json create payload object
   */
  function toJsonRpcRequest(method, params) {
      if (!method) {
          throw new Error('jsonrpc method should be specified!');
      }
      if (typeof method !== 'string') {
          throw new Error(`jsonrpc must be a string, got ${typeof method}!`);
      }
      // advance message ID
      exports.messageId++;
      return {
          jsonrpc: '2.0',
          id: exports.messageId,
          method: method,
          params: params || []
      };
  }
  /**
   * Should be called to check if jsonrpc response is valid
   */
  function isValidResponse(response) {
      return Array.isArray(response) ? response.every(validateSingleMessage) : validateSingleMessage(response);
      function validateSingleMessage(message) {
          return (!!message &&
              !('error' in message) &&
              message.jsonrpc === '2.0' &&
              typeof message.id === 'number' &&
              (message.result != null || message.result !== undefined)); // only undefined is not valid json object
          // the null is not a valid response for rpc nodes
      }
  }
  /**
   * Should be called to create batch payload object
   *
   * @param messages - An array of objects with method (required) and params (optional) fields
   */
  function toBatchPayload(messages) {
      return messages.map(function (message) {
          return toJsonRpcRequest(message.method, message.params);
      });
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  function InvalidNumberOfSolidityArgs(given, expected) {
      return new Error(`Invalid number of arguments to Solidity function. given: ${given}, expected: ${expected}`);
  }
  function InvalidNumberOfRPCParams(methodName, given, expected) {
      return new Error(`Invalid number of input parameters to RPC method "${methodName}" given: ${given}, expected: ${expected}`);
  }
  function InvalidProvider() {
      return new Error('Provider not set or invalid');
  }
  function InvalidResponse(result) {
      let message = !!result && !!result.error && !!result.error.message
          ? result.error.message
          : 'Invalid JSON RPC response: ' + JSON.stringify(result);
      return new Error(message);
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  const ETH_BIGNUMBER_ROUNDING_MODE = {
      ROUNDING_MODE: bignumber_1.ROUND_DOWN
  };
  const ETH_POLLING_TIMEOUT = 1000 / 2;
  let defaultBlock = 'latest';

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * Should format the output to a big number
   *
   * @param output - The provided output
   */
  function outputBigNumberFormatter(output) {
      return toBigNumber(output);
  }
  /**
   * Returns true if the provided blockNumber is 'latest', 'pending' or 'earliest
   *
   * @param blockNumber - The given blocknumber
   */
  function isPredefinedBlockNumber(blockNumber) {
      return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
  }
  function inputDefaultBlockNumberFormatter(blockNumber) {
      if (blockNumber === undefined) {
          return defaultBlock;
      }
      return inputBlockNumberFormatter(blockNumber);
  }
  function inputBlockNumberFormatter(blockNumber) {
      if (blockNumber === undefined || blockNumber == null) {
          return null;
      }
      else if (isPredefinedBlockNumber(blockNumber)) {
          return blockNumber;
      }
      return toHex(blockNumber);
  }
  /**
   * Formats the input of a transaction and converts all values to HEX
   */
  function inputCallFormatter(options) {
      options.from = options.from;
      if (options.from) {
          options.from = inputAddressFormatter(options.from);
      }
      if (options.to) {
          // it might be contract creation
          options.to = inputAddressFormatter(options.to);
      }
      if (options.gasPrice !== undefined)
          options.gasPrice = fromDecimal(options.gasPrice);
      if (options.gas !== undefined)
          options.gas = fromDecimal(options.gas);
      if (options.value !== undefined)
          options.value = fromDecimal(options.value);
      if (options.nonce !== undefined)
          options.nonce = fromDecimal(options.nonce);
      if (options.data && !options.data.startsWith('0x') && /^[A-Za-z0-9]+$/.test(options.data)) {
          options.data = '0x' + options.data;
      }
      return options;
  }
  /**
   * Ensures a correct transactionId is provided
   */
  function inputTransactionId(txId) {
      if (typeof txId != 'string') {
          throw new Error('The provided input for transactionId is not a string, got: ' + JSON.stringify(txId));
      }
      if (txId.indexOf('0x') !== 0) {
          throw new Error('TransactionID must start with 0x, got: ' + JSON.stringify(txId));
      }
      if (txId.length !== 66) {
          throw new Error('TransactionID must be a 32 byte hex, got: ' + JSON.stringify(txId));
      }
      return txId;
  }
  /**
   * Formats the input of a transaction and converts all values to HEX
   *
   * @param transaction - options
   */
  function inputTransactionFormatter(options) {
      if (typeof options !== 'object') {
          throw new Error('Did not provide transaction options');
      }
      if (!options.from) {
          throw new Error('Missing "from" in transaction options');
      }
      options.from = inputAddressFormatter(options.from);
      if (options.to) {
          // it might be contract creation
          options.to = inputAddressFormatter(options.to);
      }
      if (options.gasPrice !== undefined)
          options.gasPrice = fromDecimal(options.gasPrice);
      if (options.gas !== undefined)
          options.gas = fromDecimal(options.gas);
      if (options.value !== undefined)
          options.value = fromDecimal(options.value);
      if (options.nonce !== undefined)
          options.nonce = fromDecimal(options.nonce);
      if (options.data && !options.data.startsWith('0x') && /^[A-Za-z0-9]+$/.test(options.data)) {
          options.data = '0x' + options.data;
      }
      return options;
  }
  /**
   * Formats the output of a transaction to its proper values
   *
   * @param tx - The transaction
   */
  function outputTransactionFormatter(tx) {
      if (!tx)
          return null;
      if (tx.blockNumber !== null) {
          tx.blockNumber = toDecimal(tx.blockNumber);
      }
      if (tx.transactionIndex !== null) {
          tx.transactionIndex = toDecimal(tx.transactionIndex);
      }
      tx.nonce = toDecimal(tx.nonce);
      tx.gas = toDecimal(tx.gas);
      tx.gasPrice = toBigNumber(tx.gasPrice);
      tx.value = toBigNumber(tx.value);
      return tx;
  }
  /**
   * Formats the output of a transaction receipt to its proper values
   *
   * @param receipt - The transaction receipt
   */
  function outputTransactionReceiptFormatter(receipt) {
      if (!receipt)
          return null;
      if (receipt.blockNumber !== null)
          receipt.blockNumber = toDecimal(receipt.blockNumber);
      if (receipt.transactionIndex !== null)
          receipt.transactionIndex = toDecimal(receipt.transactionIndex);
      receipt.cumulativeGasUsed = toDecimal(receipt.cumulativeGasUsed);
      receipt.gasUsed = toDecimal(receipt.gasUsed);
      if (receipt.logs && isArray(receipt.logs)) {
          receipt.logs = receipt.logs.map(function (log) {
              return outputLogFormatter(log);
          });
      }
      receipt.status = toDecimal(receipt.status || '');
      return receipt;
  }
  /**
   * Formats the output of a block to its proper value
   */
  function outputBlockFormatter(block) {
      if (!block)
          return null;
      // transform to number
      block.gasLimit = toDecimal(block.gasLimit);
      block.gasUsed = toDecimal(block.gasUsed);
      block.size = toDecimal(block.size);
      block.timestamp = toDecimal(block.timestamp);
      if (block.number !== null)
          block.number = toDecimal(block.number);
      block.difficulty = toBigNumber(block.difficulty);
      block.totalDifficulty = toBigNumber(block.totalDifficulty);
      if (isArray(block.transactions)) {
          block.transactions.forEach(function (item, ix) {
              if (!isString(item)) {
                  block.transactions[ix] = outputTransactionFormatter(item) || block.transactions[ix];
              }
          });
      }
      return block;
  }
  /**
   * Formats the output of a log
   */
  function outputLogFormatter(log) {
      if (!log)
          return log;
      if (log.blockNumber) {
          log.blockNumber = toDecimal(log.blockNumber);
      }
      if (log.transactionIndex) {
          log.transactionIndex = toDecimal(log.transactionIndex);
      }
      if (log.logIndex) {
          log.logIndex = toDecimal(log.logIndex);
      }
      return log;
  }
  function inputAddressFormatter(address) {
      if (isStrictAddress(address)) {
          return address;
      }
      else if (isAddress(address)) {
          return '0x' + address;
      }
      throw new Error(`Invalid address: ${JSON.stringify(address)}`);
  }
  function inputFilterOptions(options) {
      // TODO: validations
      return options;
  }
  function outputSyncingFormatter(result) {
      if (!result) {
          return result;
      }
      result.startingBlock = toDecimal(result.startingBlock);
      result.currentBlock = toDecimal(result.currentBlock);
      result.highestBlock = toDecimal(result.highestBlock);
      if (result.knownStates) {
          result.knownStates = toDecimal(result.knownStates);
          result.pulledStates = toDecimal(result.pulledStates);
      }
      return result;
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * @public
   */
  class Method {
      constructor(options) {
          this.callName = options.callName;
          this.params = options.params || 0;
          this.inputFormatter = options.inputFormatter || null;
          this.outputFormatter = options.outputFormatter;
      }
      /**
       * Should be called to check if the number of arguments is correct
       *
       * @param arguments - The list of arguments
       */
      validateArgs(args) {
          if (args.length !== this.params) {
              throw InvalidNumberOfRPCParams(this.callName, args.length, this.params);
          }
      }
      /**
       * Should be called to format input args of method
       *
       * @param args - The array of arguments
       */
      formatInput(args) {
          if (!this.inputFormatter) {
              return args;
          }
          return this.inputFormatter.map(function (formatter, index) {
              return formatter ? formatter(args[index]) : args[index];
          });
      }
      /**
       * Should be called to format output(result) of method
       *
       * @param result - The result to be formatted
       */
      formatOutput(result) {
          return result !== null ? this.outputFormatter(result) : null;
      }
      /**
       * Should create payload from given input args
       *
       * @param args - The given input arguments
       */
      toPayload(args) {
          let params = this.formatInput(args);
          this.validateArgs(params);
          return {
              method: this.callName,
              params: params
          };
      }
      async execute(requestManager, ...args) {
          let payload = this.toPayload(args);
          if (!requestManager)
              throw new Error('Missing RequestManager in method#exec');
          const result = await requestManager.sendAsync(payload);
          return this.formatOutput(result);
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * @public
   */
  class Property {
      constructor(options) {
          this.getter = options.getter;
          this.outputFormatter = options.outputFormatter;
      }
      /**
       * Should be called to format output(result) of method
       *
       * @param result - The result to be formatted
       */
      formatOutput(result) {
          return this.outputFormatter(result);
      }
      // _unusedArgs exist only to share the same interface with Method
      async execute(requestManager, ..._unusedArgs) {
          const result = await requestManager.sendAsync({
              method: this.getter,
              params: []
          });
          return this.formatOutput(result);
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * @public
   */
  exports.eth = void 0;
  (function (eth) {
      eth.eth_getBalance = new Method({
          callName: 'eth_getBalance',
          params: 2,
          inputFormatter: [inputAddressFormatter, inputDefaultBlockNumberFormatter],
          outputFormatter: outputBigNumberFormatter
      });
      eth.eth_getStorageAt = new Method({
          callName: 'eth_getStorageAt',
          params: 3,
          inputFormatter: [inputAddressFormatter, toHex, inputDefaultBlockNumberFormatter],
          outputFormatter: toData
      });
      eth.eth_getCode = new Method({
          callName: 'eth_getCode',
          params: 2,
          inputFormatter: [inputAddressFormatter, inputDefaultBlockNumberFormatter],
          outputFormatter: toData
      });
      eth.eth_getBlockByHash = new Method({
          callName: 'eth_getBlockByHash',
          params: 2,
          inputFormatter: [
              inputBlockNumberFormatter,
              function (val) {
                  return !!val;
              }
          ],
          outputFormatter: outputBlockFormatter
      });
      eth.eth_getBlockByNumber = new Method({
          callName: 'eth_getBlockByNumber',
          params: 2,
          inputFormatter: [
              inputBlockNumberFormatter,
              function (val) {
                  return !!val;
              }
          ],
          outputFormatter: outputBlockFormatter
      });
      eth.eth_getUncleByBlockHashAndIndex = new Method({
          callName: 'eth_getUncleByBlockHashAndIndex',
          params: 2,
          inputFormatter: [inputBlockNumberFormatter, toHex],
          outputFormatter: outputBlockFormatter
      });
      eth.eth_getUncleByBlockNumberAndIndex = new Method({
          callName: 'eth_getUncleByBlockNumberAndIndex',
          params: 2,
          inputFormatter: [inputBlockNumberFormatter, toHex],
          outputFormatter: outputBlockFormatter
      });
      eth.eth_getBlockTransactionCountByHash = new Method({
          callName: 'eth_getBlockTransactionCountByHash',
          params: 1,
          inputFormatter: [inputBlockNumberFormatter],
          outputFormatter: toDecimal
      });
      eth.eth_getBlockTransactionCountByNumber = new Method({
          callName: 'eth_getBlockTransactionCountByNumber',
          params: 1,
          inputFormatter: [inputBlockNumberFormatter],
          outputFormatter: toDecimal
      });
      eth.eth_getUncleCountByBlockHash = new Method({
          callName: 'eth_getUncleCountByBlockHash',
          params: 1,
          inputFormatter: [inputBlockNumberFormatter],
          outputFormatter: toDecimal
      });
      eth.eth_getUncleCountByBlockNumber = new Method({
          callName: 'eth_getUncleCountByBlockNumber',
          params: 1,
          inputFormatter: [inputBlockNumberFormatter],
          outputFormatter: toDecimal
      });
      eth.eth_getTransactionByHash = new Method({
          callName: 'eth_getTransactionByHash',
          params: 1,
          inputFormatter: [inputTransactionId],
          outputFormatter: outputTransactionFormatter
      });
      eth.eth_getTransactionByBlockHashAndIndex = new Method({
          callName: 'eth_getTransactionByBlockHashAndIndex',
          params: 2,
          inputFormatter: [inputBlockNumberFormatter, toHex],
          outputFormatter: outputTransactionFormatter
      });
      eth.eth_getTransactionByBlockNumberAndIndex = new Method({
          callName: 'eth_getTransactionByBlockNumberAndIndex',
          params: 2,
          inputFormatter: [inputBlockNumberFormatter, toHex],
          outputFormatter: outputTransactionFormatter
      });
      eth.eth_getTransactionReceipt = new Method({
          callName: 'eth_getTransactionReceipt',
          params: 1,
          inputFormatter: [inputTransactionId],
          outputFormatter: outputTransactionReceiptFormatter
      });
      eth.eth_getTransactionCount = new Method({
          callName: 'eth_getTransactionCount',
          params: 2,
          inputFormatter: [inputAddressFormatter, inputDefaultBlockNumberFormatter],
          outputFormatter: toDecimal
      });
      eth.eth_sendRawTransaction = new Method({
          callName: 'eth_sendRawTransaction',
          params: 1,
          inputFormatter: [null /* signed data transaction, hex string */],
          outputFormatter: toData
      });
      eth.web3_sha3 = new Method({
          callName: 'web3_sha3',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toData
      });
      eth.eth_sendTransaction = new Method({
          callName: 'eth_sendTransaction',
          params: 1,
          inputFormatter: [inputTransactionFormatter],
          outputFormatter: toData
      });
      eth.eth_sign = new Method({
          callName: 'eth_sign',
          params: 2,
          inputFormatter: [inputAddressFormatter, null],
          outputFormatter: toData
      });
      eth.eth_call = new Method({
          callName: 'eth_call',
          params: 2,
          inputFormatter: [inputCallFormatter, inputDefaultBlockNumberFormatter],
          outputFormatter: toData
      });
      eth.eth_estimateGas = new Method({
          callName: 'eth_estimateGas',
          params: 1,
          inputFormatter: [inputCallFormatter],
          outputFormatter: toDecimal
      });
      eth.eth_submitWork = new Method({
          callName: 'eth_submitWork',
          params: 3,
          inputFormatter: [
              null,
              null,
              null // DATA, 32 Bytes - The mix digest (256 bits)
          ],
          outputFormatter: toBoolean
      });
      eth.eth_getWork = new Method({
          callName: 'eth_getWork',
          params: 0,
          inputFormatter: [],
          outputFormatter: toArray
      });
      eth.eth_coinbase = new Property({
          getter: 'eth_coinbase',
          outputFormatter: toAddress
      });
      eth.eth_mining = new Property({
          getter: 'eth_mining',
          outputFormatter: toBoolean
      });
      eth.eth_hashrate = new Property({
          getter: 'eth_hashrate',
          outputFormatter: toDecimal
      });
      eth.eth_syncing = new Property({
          getter: 'eth_syncing',
          outputFormatter: outputSyncingFormatter
      });
      eth.eth_gasPrice = new Property({
          getter: 'eth_gasPrice',
          outputFormatter: outputBigNumberFormatter
      });
      eth.eth_accounts = new Property({
          getter: 'eth_accounts',
          outputFormatter: toArray
      });
      eth.eth_blockNumber = new Property({
          getter: 'eth_blockNumber',
          outputFormatter: toDecimal
      });
      eth.eth_protocolVersion = new Property({
          getter: 'eth_protocolVersion',
          outputFormatter: toDecimal
      });
      eth.web3_clientVersion = new Property({
          getter: 'web3_clientVersion',
          outputFormatter: toString
      });
      eth.net_version = new Property({
          getter: 'net_version',
          outputFormatter: toString
      });
      eth.shh_version = new Method({
          callName: 'shh_version',
          params: 0,
          inputFormatter: [],
          outputFormatter: toDecimal
      });
      // subscribe and unsubscribe missing
      eth.shh_post = new Method({
          callName: 'shh_post',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toBoolean
      });
      eth.personal_newAccount = new Method({
          callName: 'personal_newAccount',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toAddress
      });
      eth.personal_importRawKey = new Method({
          callName: 'personal_importRawKey',
          params: 2,
          inputFormatter: [null /* private key */, null /* passphrase */],
          outputFormatter: toAddress
      });
      eth.personal_sign = new Method({
          callName: 'personal_sign',
          params: 3,
          inputFormatter: [null, inputAddressFormatter, null],
          outputFormatter: toData
      });
      eth.personal_ecRecover = new Method({
          callName: 'personal_ecRecover',
          params: 2,
          inputFormatter: [null /* message */, null /* signature */],
          outputFormatter: toAddress
      });
      eth.personal_unlockAccount = new Method({
          callName: 'personal_unlockAccount',
          params: 3,
          inputFormatter: [inputAddressFormatter, null, toNullDecimal],
          outputFormatter: toBoolean
      });
      eth.personal_sendTransaction = new Method({
          callName: 'personal_sendTransaction',
          params: 2,
          inputFormatter: [inputTransactionFormatter, null],
          outputFormatter: toData
      });
      eth.personal_lockAccount = new Method({
          callName: 'personal_lockAccount',
          params: 1,
          inputFormatter: [inputAddressFormatter],
          outputFormatter: toBoolean
      });
      eth.personal_listAccounts = new Property({
          getter: 'personal_listAccounts',
          outputFormatter: toArray
      });
      eth.net_listening = new Property({
          getter: 'net_listening',
          outputFormatter: toBoolean
      });
      eth.net_peerCount = new Property({
          getter: 'net_peerCount',
          outputFormatter: toDecimal
      });
      eth.eth_newFilter = new Method({
          callName: 'eth_newFilter',
          params: 1,
          inputFormatter: [inputFilterOptions],
          outputFormatter: toHex
      });
      eth.eth_getLogs = new Method({
          callName: 'eth_getLogs',
          params: 1,
          inputFormatter: [toHex],
          outputFormatter: toArray
      });
      eth.eth_newBlockFilter = new Method({
          callName: 'eth_newBlockFilter',
          params: 0,
          inputFormatter: [],
          outputFormatter: toHex
      });
      eth.eth_newPendingTransactionFilter = new Method({
          callName: 'eth_newPendingTransactionFilter',
          params: 0,
          inputFormatter: [],
          outputFormatter: toHex
      });
      eth.eth_uninstallFilter = new Method({
          callName: 'eth_uninstallFilter',
          params: 1,
          inputFormatter: [toHex],
          outputFormatter: toBoolean
      });
      eth.eth_getFilterLogs = new Method({
          callName: 'eth_getFilterLogs',
          params: 1,
          inputFormatter: [toHex],
          outputFormatter: toArray
      });
      eth.eth_getFilterChanges = new Method({
          callName: 'eth_getFilterChanges',
          params: 1,
          inputFormatter: [toHex],
          outputFormatter: toArray
      });
      eth.eth_submitHashrate = new Method({
          callName: 'eth_submitHashrate',
          params: 2,
          inputFormatter: [null /* hashrate */, null /* id */],
          outputFormatter: toBoolean
      });
      eth.shh_newIdentity = new Method({
          callName: 'shh_newIdentity',
          params: 0,
          inputFormatter: [],
          outputFormatter: toData
      });
      eth.shh_hasIdentity = new Method({
          callName: 'shh_hasIdentity',
          params: 1,
          inputFormatter: [
              null // DATA, 60 Bytes - The identity address to check.
          ],
          outputFormatter: toBoolean
      });
      eth.shh_newGroup = new Method({
          callName: 'shh_newGroup',
          params: 0,
          inputFormatter: [],
          outputFormatter: toData
      });
      eth.shh_addToGroup = new Method({
          callName: 'shh_addToGroup',
          params: 1,
          inputFormatter: [
              null // DATA, 60 Bytes - The identity address to add to a group (?)
          ],
          outputFormatter: toBoolean
      });
      eth.shh_newFilter = new Method({
          callName: 'shh_newFilter',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toHex
      });
      eth.shh_uninstallFilter = new Method({
          callName: 'shh_uninstallFilter',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toBoolean
      });
      eth.shh_getLogs = new Method({
          callName: 'shh_getLogs',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toArray
      });
      eth.shh_getFilterMessages = new Method({
          callName: 'shh_getFilterMessages',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toArray
      });
      eth.shh_getFilterChanges = new Method({
          callName: 'shh_getFilterChanges',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toArray
      });
      eth.shh_getMessages = new Method({
          callName: 'shh_getMessages',
          params: 1,
          inputFormatter: [null],
          outputFormatter: toArray
      });
  })(exports.eth || (exports.eth = {}));

  /**
   * Sleep for a certain amount of milliseconds
   */
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  let TRANSACTION_FETCH_DELAY = 2 * 1000;
  function inject(target, propertyKey) {
      const method = exports.eth[propertyKey];
      /* istanbul ignore if */
      if (!method) {
          throw new Error(`Could not find the method/property named ${propertyKey.toString()}`);
      }
      Object.defineProperty(target, propertyKey, {
          value: function () {
              return method.execute(this, ...arguments);
          }
      });
  }
  /**
   * @public
   * It's responsible for passing messages to providers
   * It's also responsible for polling the ethereum node for incoming messages
   * Default poll timeout is 1 second
   */
  class RequestManager {
      constructor(provider) {
          this.provider = provider;
          // @internal
          this.requests = new Map();
          // stub
      }
      /**
       * Should be used to asynchronously send request
       *
       * @param data - The RPC message to be sent
       */
      async sendAsync(data) {
          const provider = await this.provider;
          /* istanbul ignore if */
          if (!provider) {
              throw InvalidProvider();
          }
          let payload = toJsonRpcRequest(data.method, data.params);
          const defer = fpFuture_1();
          this.requests.set(payload.id, defer);
          provider.sendAsync(payload, (err, result) => {
              this.requests.delete(payload.id);
              if (err) {
                  defer.reject(err);
                  return;
              }
              /* istanbul ignore if */
              if (!isValidResponse(result)) {
                  defer.reject(InvalidResponse(result));
                  return;
              }
              defer.resolve(result.result);
          });
          return defer;
      }
      /**
       * Should be used to set provider of request manager
       *
       * @param p - The provider
       */
      setProvider(p) {
          this.provider = p;
      }
      /**
       * Waits until the transaction finishes. Returns if it was successfull.
       * Throws if the transaction fails or if it lacks any of the supplied events
       * @param txId - Transaction id to watch
       */
      async getConfirmedTransaction(txId) {
          const tx = await this.waitForCompletion(txId);
          if (this.isFailure(tx)) {
              throw new Error(`Transaction "${txId}" failed`);
          }
          return tx;
      }
      /**
       * Wait until a transaction finishes by either being mined or failing
       * @param txId - Transaction id to watch
       * @param retriesOnEmpty - Number of retries when a transaction status returns empty
       */
      async waitForCompletion(txId, retriesOnEmpty) {
          const txIdString = inputTransactionId(txId);
          const isDropped = await this.isTxDropped(txIdString, retriesOnEmpty);
          if (isDropped) {
              const tx = await this.getTransactionAndReceipt(txIdString);
              return Object.assign(Object.assign({}, tx), { status: exports.TransactionStatus.failed });
          }
          while (true) {
              const tx = await this.getTransactionAndReceipt(txIdString);
              if (!this.isPending(tx) && tx.receipt) {
                  return Object.assign(Object.assign({}, tx), { status: this.isFailure(tx) ? exports.TransactionStatus.failed : exports.TransactionStatus.confirmed });
              }
              await sleep(TRANSACTION_FETCH_DELAY);
          }
      }
      /**
       * Returns a transaction in any of the possible states.
       * @param txId - The transaction ID
       */
      async getTransaction(txId) {
          let currentNonce = null;
          let status;
          const hash = inputTransactionId(txId);
          try {
              const accounts = await this.eth_accounts();
              const account = accounts[0];
              if (account) {
                  currentNonce = await this.eth_getTransactionCount(account, 'latest');
              }
          }
          catch (error) {
              currentNonce = null;
          }
          try {
              status = await this.eth_getTransactionByHash(hash);
              // not found
              if (status == null) {
                  return null;
              }
          }
          catch (e) {
              return null;
          }
          if (status.blockNumber == null) {
              if (currentNonce != null) {
                  // replaced
                  if (status.nonce < currentNonce) {
                      const tx = {
                          hash,
                          type: exports.TransactionType.replaced,
                          nonce: status.nonce
                      };
                      return tx;
                  }
                  // queued
                  if (status.nonce > currentNonce) {
                      const tx = {
                          hash,
                          type: exports.TransactionType.queued,
                          nonce: status.nonce
                      };
                      return tx;
                  }
              }
              // pending
              const tx = Object.assign({ type: exports.TransactionType.pending }, status);
              return tx;
          }
          let receipt;
          try {
              receipt = await this.eth_getTransactionReceipt(hash);
              // reverted
              if (receipt == null || receipt.status === 0x0) {
                  const tx = Object.assign({ type: exports.TransactionType.reverted }, status);
                  return tx;
              }
          }
          catch (e) {
              // TODO: should this be null or reverted?
              return null;
          }
          // confirmed
          const tx = Object.assign(Object.assign({ type: exports.TransactionType.confirmed }, status), { receipt });
          return tx;
      }
      /**
       * Wait retryAttemps * TRANSACTION_FETCH_DELAY for a transaction status to be in the mempool
       * @param txId - Transaction id to watch
       * @param retryAttemps - Number of retries when a transaction status returns empty
       */
      async isTxDropped(txId, _retryAttemps = 15) {
          let retryAttemps = _retryAttemps;
          while (retryAttemps > 0) {
              const tx = await this.getTransactionAndReceipt(txId);
              if (tx !== null) {
                  return false;
              }
              retryAttemps -= 1;
              await sleep(TRANSACTION_FETCH_DELAY);
          }
          return true;
      }
      /**
       * Get the transaction status and receipt
       * @param txId - Transaction id
       */
      // prettier-ignore
      async getTransactionAndReceipt(txId) {
          txId = inputTransactionId(txId);
          const [tx, receipt] = await Promise.all([
              this.eth_getTransactionByHash(txId),
              this.eth_getTransactionReceipt(txId)
          ]);
          return Object.assign(Object.assign({}, tx), { receipt });
      }
      /**
       * Expects the result of getTransaction's geth command and returns true if the transaction is still pending.
       * It'll also check for a pending status prop against TRANSACTION_STATUS
       * @param tx - The transaction object
       */
      // tslint:disable-next-line:prefer-function-over-method
      isPending(tx) {
          return tx && tx.blockNumber === null;
      }
      /**
       * Expects the result of getTransactionRecepeit's geth command and returns true if the transaction failed.
       * It'll also check for a failed status prop against TRANSACTION_STATUS
       * @param tx - The transaction object
       */
      // tslint:disable-next-line:prefer-function-over-method
      isFailure(tx) {
          return tx && (!tx.receipt || tx.receipt.status === 0);
      }
  }
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "web3_clientVersion", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "web3_sha3", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "net_version", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "net_peerCount", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "net_listening", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_protocolVersion", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_syncing", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_coinbase", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_mining", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_hashrate", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_gasPrice", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_accounts", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_blockNumber", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getBalance", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getStorageAt", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getTransactionCount", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getBlockTransactionCountByHash", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getBlockTransactionCountByNumber", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getUncleCountByBlockHash", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getUncleCountByBlockNumber", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getCode", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_sign", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_sendTransaction", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_sendRawTransaction", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_call", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_estimateGas", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getBlockByHash", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getBlockByNumber", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getTransactionByHash", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getTransactionByBlockHashAndIndex", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getTransactionByBlockNumberAndIndex", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getTransactionReceipt", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getUncleByBlockHashAndIndex", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getUncleByBlockNumberAndIndex", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_newFilter", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_newBlockFilter", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_newPendingTransactionFilter", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_uninstallFilter", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getFilterChanges", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getFilterLogs", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getLogs", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_getWork", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_submitWork", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "eth_submitHashrate", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_post", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_version", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_newIdentity", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_hasIdentity", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_newGroup", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_addToGroup", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_newFilter", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_uninstallFilter", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_getFilterChanges", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "shh_getMessages", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_unlockAccount", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_newAccount", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_listAccounts", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_lockAccount", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_importRawKey", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_sendTransaction", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_sign", void 0);
  __decorate([
      inject,
      __metadata("design:type", Function)
  ], RequestManager.prototype, "personal_ecRecover", void 0);

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * SolidityParam object prototype.
   * Should be used when encoding, decoding solidity bytes
   */
  class SolidityParam {
      constructor(value = '', offset) {
          this.value = value;
          this.offset = offset;
      }
      /**
       * This method should be called to check if param has dynamic size.
       * If it has, it returns true, otherwise false
       *
       * @method isDynamic
       * @returns {Boolean}
       */
      isDynamic() {
          return this.offset !== undefined;
      }
      /**
       * This method should be called to transform offset to bytes
       *
       * @method offsetAsBytes
       * @returns {string} bytes representation of offset
       */
      offsetAsBytes() {
          return !this.isDynamic() ? '' : padLeft(toTwosComplement(this.offset || '').toString(16), 64);
      }
      /**
       * This method should be called to get static part of param
       *
       * @method staticPart
       * @returns {string} offset if it is a dynamic param, otherwise value
       */
      staticPart() {
          if (!this.isDynamic()) {
              return this.value;
          }
          return this.offsetAsBytes();
      }
      /**
       * This method should be called to get dynamic part of param
       *
       * @method dynamicPart
       * @returns {string} returns a value if it is a dynamic param, otherwise empty string
       */
      dynamicPart() {
          return this.isDynamic() ? this.value : '';
      }
      /**
       * This method should be called to encode param
       *
       * @method encode
       * @returns {string}
       */
      encode() {
          return this.staticPart() + this.dynamicPart();
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * Formats input value to byte representation of int
   * If value is negative, return it's two's complement
   * If the value is floating point, round it down
   */
  function formatInputInt(value) {
      bignumber_1.config(ETH_BIGNUMBER_ROUNDING_MODE);
      let result = padLeft(toTwosComplement(value).toString(16), 64);
      const ret = new SolidityParam(result);
      if (ret.value.indexOf('NaN') != -1) {
          throw new Error(`The number ${JSON.stringify(value)} can't be parsed.`);
      }
      return ret;
  }
  function formatInputAddress(value) {
      if (typeof value != 'string')
          throw new Error('The input must be a valid address, got: ' + JSON.stringify(value));
      return formatInputInt(inputAddressFormatter(value.trim()));
  }
  /**
   * Formats input bytes
   */
  function formatInputBytes(value) {
      let result = toHex(value).substr(2);
      let l = Math.floor((result.length + 63) / 64);
      result = padRight(result, l * 64);
      return new SolidityParam(result);
  }
  /**
   * Formats input bytes
   */
  function formatInputDynamicBytes(value) {
      let result = toHex(value).substr(2);
      let length = result.length / 2;
      let l = Math.floor((result.length + 63) / 64);
      result = padRight(result, l * 64);
      return new SolidityParam(formatInputInt(length).value + result);
  }
  /**
   * Formats input value to byte representation of string
   */
  function formatInputString(value) {
      let result = fromUtf8(value).substr(2);
      let length = result.length / 2;
      let l = Math.floor((result.length + 63) / 64);
      result = padRight(result, l * 64);
      return new SolidityParam(formatInputInt(length).value + result);
  }
  /**
   * Formats input value to byte representation of bool
   */
  function formatInputBool(value) {
      let result = '000000000000000000000000000000000000000000000000000000000000000' + (value ? '1' : '0');
      return new SolidityParam(result);
  }
  /**
   * Formats input value to byte representation of real
   * Values are multiplied by 2^m and encoded as integers
   */
  function formatInputReal(value) {
      return formatInputInt(new bignumber_1(value).times(new bignumber_1(2).pow(128)));
  }
  /**
   * Check if input value is negative
   *
   * @param value - The value is hex format
   */
  function signedIsNegative(value) {
      return new bignumber_1(value.substr(0, 1), 16).toString(2).substr(0, 1) === '1';
  }
  /**
   * Formats right-aligned output bytes to int
   */
  function formatOutputInt(param) {
      let value = param.staticPart() || '0';
      // check if it's negative number
      // it it is, return two's complement
      if (signedIsNegative(value)) {
          return new bignumber_1(value, 16)
              .minus(new bignumber_1('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16))
              .minus(1);
      }
      return new bignumber_1(value, 16);
  }
  /**
   * Formats right-aligned output bytes to uint
   */
  function formatOutputUInt(param) {
      let value = param.staticPart();
      return new bignumber_1(value, 16);
  }
  /**
   * Formats right-aligned output bytes to real
   */
  function formatOutputReal(param) {
      return formatOutputInt(param).dividedBy(new bignumber_1(2).pow(128));
  }
  /**
   * Formats right-aligned output bytes to ureal
   */
  function formatOutputUReal(param) {
      return formatOutputUInt(param).dividedBy(new bignumber_1(2).pow(128));
  }
  /**
   * Should be used to format output bool
   */
  function formatOutputBool(param) {
      return param.staticPart() === '0000000000000000000000000000000000000000000000000000000000000001' ? true : false;
  }
  /**
   * Should be used to format output bytes
   *
   * @param param - The left-aligned hex representation of string
   * @param name - The type name
   */
  function formatOutputBytes(param, name) {
      let matches = name.match(/^bytes([0-9]*)/);
      if (!matches)
          throw new Error('Type is not bytes');
      let size = parseInt(matches[1], 10);
      return '0x' + param.staticPart().slice(0, 2 * size);
  }
  /**
   * Should be used to format output bytes
   *
   * @param param - The left-aligned hex representation of string
   */
  function formatOutputDynamicBytes(param) {
      let length = new bignumber_1(param.dynamicPart().slice(0, 64), 16).toNumber() * 2;
      return '0x' + param.dynamicPart().substr(64, length);
  }
  /**
   * Should be used to format output string
   *
   * @param param - The left-aligned hex representation of string
   */
  function formatOutputString(param) {
      let length = new bignumber_1(param.dynamicPart().slice(0, 64), 16).toNumber() * 2;
      return toUtf8(param.dynamicPart().substr(64, length));
  }
  /**
   * Should be used to format output address
   *
   * @param param - The right-aligned input bytes
   */
  function formatOutputAddress(param) {
      let value = param.staticPart();
      return '0x' + value.slice(value.length - 40, value.length);
  }

  /**
   * SolidityType prototype is used to encode/decode solidity params of certain type
   */
  class SolidityType {
      constructor(config) {
          this._inputFormatter = config.inputFormatter;
          this._outputFormatter = config.outputFormatter;
      }
      /**
       * Should be used to determine what is the length of static part in given type
       *
       * @method staticPartLength
       * @param {string} name
       * @return {number} length of static part in bytes
       */
      staticPartLength(name) {
          // If name isn't an array then treat it like a single element array.
          return (this.nestedTypes(name) || ['[1]'])
              .map(function (type) {
              // the length of the nested array
              return parseInt(type.slice(1, -1), 10) || 1;
          })
              .reduce(function (previous, current) {
              return previous * current;
              // all basic types are 32 bytes long
          }, 32);
      }
      /**
       * Should be used to determine if type is dynamic array
       * eg:
       * "type[]" => true
       * "type[4]" => false
       *
       * @method isDynamicArray
       * @param {string} name
       * @return {bool} true if the type is dynamic array
       */
      isDynamicArray(name) {
          let nestedTypes = this.nestedTypes(name);
          return !!nestedTypes && !nestedTypes[nestedTypes.length - 1].match(/[0-9]{1,}/g);
      }
      /**
       * Should be used to determine if type is static array
       * eg:
       * "type[]" => false
       * "type[4]" => true
       *
       * @method isStaticArray
       * @param {string} name
       * @return {Bool} true if the type is static array
       */
      isStaticArray(name) {
          let nestedTypes = this.nestedTypes(name);
          return !!nestedTypes && !!nestedTypes[nestedTypes.length - 1].match(/[0-9]{1,}/g);
      }
      /**
       * Should return length of static array
       * eg.
       * "int[32]" => 32
       * "int256[14]" => 14
       * "int[2][3]" => 3
       * "int" => 1
       * "int[1]" => 1
       * "int[]" => 1
       *
       * @method staticArrayLength
       * @param {string} name
       * @return {number} static array length
       */
      staticArrayLength(name) {
          let nestedTypes = this.nestedTypes(name);
          if (nestedTypes) {
              const match = nestedTypes[nestedTypes.length - 1].match(/[0-9]{1,}/g);
              if (!match)
                  throw new Error('untested path');
              return parseInt(match[match.length - 1] || '1', 10);
          }
          return 1;
      }
      /**
       * Should return nested type
       * eg.
       * "int[32]" => "int"
       * "int256[14]" => "int256"
       * "int[2][3]" => "int[2]"
       * "int" => "int"
       * "int[]" => "int"
       *
       * @method nestedName
       * @param {string} name
       * @return {string} nested name
       */
      nestedName(name) {
          // remove last [] in name
          let nestedTypes = this.nestedTypes(name);
          if (!nestedTypes) {
              return name;
          }
          return name.substr(0, name.length - nestedTypes[nestedTypes.length - 1].length);
      }
      /**
       * Should return true if type has dynamic size by default
       * such types are "string", "bytes"
       *
       * @method isDynamicType
       * @param {string} name
       * @return {Bool} true if is dynamic, otherwise false
       */
      // tslint:disable-next-line:prefer-function-over-method
      isDynamicType(_) {
          return false;
      }
      /**
       * Should return array of nested types
       * eg.
       * "int[2][3][]" => ["[2]", "[3]", "[]"]
       * "int[] => ["[]"]
       * "int" => null
       *
       * @method nestedTypes
       * @param {string} name
       * @return {Array} array of nested types
       */
      // tslint:disable-next-line:prefer-function-over-method
      nestedTypes(name) {
          // return list of strings eg. "[]", "[3]", "[]", "[2]"
          return name.match(/(\[[0-9]*\])/g);
      }
      /**
       * Should be used to encode the value
       *
       * @method encode
       * @param {object} value
       * @param {string} name
       * @return {string} encoded value
       */
      encode(value, name) {
          if (this.isDynamicArray(name)) {
              let length = value.length; // in int
              let nestedName = this.nestedName(name);
              let result = [];
              result.push(formatInputInt(length).encode());
              value.forEach((v) => {
                  result.push(this.encode(v, nestedName));
              });
              return result;
          }
          else if (this.isStaticArray(name)) {
              let length = this.staticArrayLength(name); // in int
              let nestedName = this.nestedName(name);
              let result = [];
              for (let i = 0; i < length; i++) {
                  result.push(this.encode(value[i], nestedName));
              }
              return result;
          }
          return this._inputFormatter(value, name).encode();
      }
      /**
       * Should be used to decode value from bytes
       *
       * @method decode
       * @param {string} bytes
       * @param {number} offset in bytes
       * @param {string} name type name
       * @returns {object} decoded value
       */
      decode(bytes, offset, name) {
          if (this.isDynamicArray(name)) {
              let arrayOffset = parseInt('0x' + bytes.substr(offset * 2, 64), 16); // in bytes
              let length = parseInt('0x' + bytes.substr(arrayOffset * 2, 64), 16); // in int
              let arrayStart = arrayOffset + 32; // array starts after length; // in bytes
              let nestedName = this.nestedName(name);
              let nestedStaticPartLength = this.staticPartLength(nestedName); // in bytes
              let roundedNestedStaticPartLength = Math.floor((nestedStaticPartLength + 31) / 32) * 32;
              let result = [];
              for (let i = 0; i < length * roundedNestedStaticPartLength; i += roundedNestedStaticPartLength) {
                  result.push(this.decode(bytes, arrayStart + i, nestedName));
              }
              return result;
          }
          else if (this.isStaticArray(name)) {
              let length = this.staticArrayLength(name); // in int
              let arrayStart = offset; // in bytes
              let nestedName = this.nestedName(name);
              let nestedStaticPartLength = this.staticPartLength(nestedName); // in bytes
              let roundedNestedStaticPartLength = Math.floor((nestedStaticPartLength + 31) / 32) * 32;
              let result = [];
              for (let i = 0; i < length * roundedNestedStaticPartLength; i += roundedNestedStaticPartLength) {
                  result.push(this.decode(bytes, arrayStart + i, nestedName));
              }
              return result;
          }
          else if (this.isDynamicType(name)) {
              let dynamicOffset = parseInt('0x' + bytes.substr(offset * 2, 64), 16); // in bytes
              let length = parseInt('0x' + bytes.substr(dynamicOffset * 2, 64), 16); // in bytes
              let roundedLength = Math.floor((length + 31) / 32); // in int
              let param = new SolidityParam(bytes.substr(dynamicOffset * 2, (1 + roundedLength) * 64), 0);
              return this._outputFormatter(param, name);
          }
          let length = this.staticPartLength(name);
          let param = new SolidityParam(bytes.substr(offset * 2, length * 2));
          return this._outputFormatter(param, name);
      }
  }

  class SolidityTypeAddress extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputAddress,
              outputFormatter: formatOutputAddress
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/address(\[([0-9]*)\])?/);
      }
  }

  /**
   * SolidityTypeBool is a prootype that represents bool type
   * It matches:
   * bool
   * bool[]
   * bool[4]
   * bool[][]
   * bool[3][]
   * bool[][6][], ...
   */
  class SolidityTypeBool extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputBool,
              outputFormatter: formatOutputBool
          });
      }
      isType(name) {
          return !!name.match(/^bool(\[([0-9]*)\])*$/);
      }
  }

  /**
   * SolidityTypeInt is a prootype that represents int type
   * It matches:
   * int
   * int[]
   * int[4]
   * int[][]
   * int[3][]
   * int[][6][], ...
   * int32
   * int64[]
   * int8[4]
   * int256[][]
   * int[3][]
   * int64[][6][], ...
   */
  class SolidityTypeInt extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputInt,
              outputFormatter: formatOutputInt
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/^int([0-9]*)?(\[([0-9]*)\])*$/);
      }
  }

  /**
   * SolidityTypeUInt is a prootype that represents uint type
   * It matches:
   * uint
   * uint[]
   * uint[4]
   * uint[][]
   * uint[3][]
   * uint[][6][], ...
   * uint32
   * uint64[]
   * uint8[4]
   * uint256[][]
   * uint[3][]
   * uint64[][6][], ...
   */
  class SolidityTypeUInt extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputInt,
              outputFormatter: formatOutputUInt
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/^uint([0-9]*)?(\[([0-9]*)\])*$/);
      }
  }

  class SolidityTypeDynamicBytes extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputDynamicBytes,
              outputFormatter: formatOutputDynamicBytes
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/^bytes(\[([0-9]*)\])*$/);
      }
      // tslint:disable-next-line:prefer-function-over-method
      isDynamicType() {
          return true;
      }
  }

  class SolidityTypeString extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputString,
              outputFormatter: formatOutputString
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/^string(\[([0-9]*)\])*$/);
      }
      // tslint:disable-next-line:prefer-function-over-method
      isDynamicType() {
          return true;
      }
  }

  /**
   * SolidityTypeReal is a prootype that represents real type
   * It matches:
   * real
   * real[]
   * real[4]
   * real[][]
   * real[3][]
   * real[][6][], ...
   * real32
   * real64[]
   * real8[4]
   * real256[][]
   * real[3][]
   * real64[][6][], ...
   */
  class SolidityTypeReal extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputReal,
              outputFormatter: formatOutputReal
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/real([0-9]*)?(\[([0-9]*)\])?/);
      }
  }

  /**
   * SolidityTypeUReal is a prootype that represents ureal type
   * It matches:
   * ureal
   * ureal[]
   * ureal[4]
   * ureal[][]
   * ureal[3][]
   * ureal[][6][], ...
   * ureal32
   * ureal64[]
   * ureal8[4]
   * ureal256[][]
   * ureal[3][]
   * ureal64[][6][], ...
   */
  class SolidityTypeUReal extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputReal,
              outputFormatter: formatOutputUReal
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/^ureal([0-9]*)?(\[([0-9]*)\])*$/);
      }
  }

  /**
   * SolidityTypeBytes is a prototype that represents the bytes type.
   * It matches:
   * bytes
   * bytes[]
   * bytes[4]
   * bytes[][]
   * bytes[3][]
   * bytes[][6][], ...
   * bytes32
   * bytes8[4]
   * bytes[3][]
   */
  class SolidityTypeBytes extends SolidityType {
      constructor() {
          super({
              inputFormatter: formatInputBytes,
              outputFormatter: formatOutputBytes
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      isType(name) {
          return !!name.match(/^bytes([0-9]{1,})(\[([0-9]*)\])*$/);
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  function isDynamic(solidityType, type) {
      return solidityType.isDynamicType(type) || solidityType.isDynamicArray(type);
  }
  /**
   * SolidityCoder prototype should be used to encode/decode solidity params of any type
   */
  class SolidityCoder {
      constructor(types) {
          this._types = types;
      }
      /**
       * This method should be used to transform type to SolidityType
       *
       * @param {string} type
       * @returns {SolidityType}
       * @throws {Error} throws if no matching type is found
       */
      _requireType(type) {
          let solidityType = this._types.filter(function (t) {
              return t.isType(type);
          })[0];
          if (!solidityType) {
              throw Error('invalid solidity type!: ' + type);
          }
          return solidityType;
      }
      /**
       * Should be used to encode plain param
       *
       * @method encodeParam
       * @param {string} type
       * @param {object} plain param
       * @return {string} encoded plain param
       */
      encodeParam(type, param) {
          return this.encodeParams([type], [param]);
      }
      /**
       * Should be used to encode list of params
       *
       * @method encodeParams
       * @param {Array} types
       * @param {Array} params
       * @return {string} encoded list of params
       */
      encodeParams(types, params) {
          let solidityTypes = this.getSolidityTypes(types);
          let encodeds = solidityTypes.map(function (solidityType, index) {
              return solidityType.encode(params[index], types[index]);
          });
          let dynamicOffset = solidityTypes.reduce(function (acc, solidityType, index) {
              let staticPartLength = solidityType.staticPartLength(types[index]);
              let roundedStaticPartLength = Math.floor((staticPartLength + 31) / 32) * 32;
              return acc + (isDynamic(solidityTypes[index], types[index]) ? 32 : roundedStaticPartLength);
          }, 0);
          let result = this.encodeMultiWithOffset(types, solidityTypes, encodeds, dynamicOffset);
          return result;
      }
      encodeMultiWithOffset(types, solidityTypes, encodeds, _dynamicOffset) {
          let dynamicOffset = _dynamicOffset;
          let results = [];
          types.forEach((_, i) => {
              if (isDynamic(solidityTypes[i], types[i])) {
                  results.push(formatInputInt(dynamicOffset).encode());
                  let e = this.encodeWithOffset(types[i], solidityTypes[i], encodeds[i], dynamicOffset);
                  dynamicOffset += e.length / 2;
              }
              else {
                  // don't add length to dynamicOffset. it's already counted
                  results.push(this.encodeWithOffset(types[i], solidityTypes[i], encodeds[i], dynamicOffset));
              }
              // TODO: figure out nested arrays
          });
          types.forEach((_, i) => {
              if (isDynamic(solidityTypes[i], types[i])) {
                  let e = this.encodeWithOffset(types[i], solidityTypes[i], encodeds[i], dynamicOffset);
                  dynamicOffset += e.length / 2;
                  results.push(e);
              }
          });
          return results.join('');
      }
      // tslint:disable-next-line:prefer-function-over-method
      encodeWithOffset(type, solidityType, encoded, offset) {
          /* jshint maxcomplexity: 17 */
          /* jshint maxdepth: 5 */
          let encodingMode = { dynamic: 1, static: 2, other: 3 };
          let mode = solidityType.isDynamicArray(type)
              ? encodingMode.dynamic
              : solidityType.isStaticArray(type)
                  ? encodingMode.static
                  : encodingMode.other;
          if (mode !== encodingMode.other) {
              let nestedName = solidityType.nestedName(type);
              let nestedStaticPartLength = solidityType.staticPartLength(nestedName);
              let results = [];
              if (mode === encodingMode.dynamic) {
                  results.push(encoded[0]);
              }
              if (solidityType.isDynamicArray(nestedName)) {
                  let previousLength = mode === encodingMode.dynamic ? 2 : 0;
                  for (let i = 0; i < encoded.length; i++) {
                      // calculate length of previous item
                      if (mode === encodingMode.dynamic) {
                          previousLength += +encoded[i - 1][0] || 0;
                      }
                      else if (mode === encodingMode.static) {
                          previousLength += +(encoded[i - 1] || [])[0] || 0;
                      }
                      results.push(formatInputInt(offset + i * nestedStaticPartLength + previousLength * 32).encode());
                  }
              }
              let len = mode === encodingMode.dynamic ? encoded.length - 1 : encoded.length;
              for (let c = 0; c < len; c++) {
                  let additionalOffset = results.join('').length / 2;
                  if (mode === encodingMode.dynamic) {
                      results.push(this.encodeWithOffset(nestedName, solidityType, encoded[c + 1], offset + additionalOffset));
                  }
                  else if (mode === encodingMode.static) {
                      results.push(this.encodeWithOffset(nestedName, solidityType, encoded[c], offset + additionalOffset));
                  }
              }
              return results.join('');
          }
          if (typeof encoded != 'string') {
              throw new Error('Encoded is not string');
          }
          return encoded;
      }
      /**
       * Should be used to decode bytes to plain param
       *
       * @method decodeParam
       * @param {string} type
       * @param {string} bytes
       * @return {object} plain param
       */
      decodeParam(type, bytes) {
          return this.decodeParams([type], bytes)[0];
      }
      /**
       * Should be used to decode list of params
       *
       * @method decodeParam
       * @param {Array} types
       * @param {string} bytes
       * @return {Array} array of plain params
       */
      decodeParams(types, bytes) {
          let solidityTypes = this.getSolidityTypes(types);
          let offsets = this.getOffsets(types, solidityTypes);
          return solidityTypes.map(function (solidityType, index) {
              return solidityType.decode(bytes, offsets[index], types[index]);
          });
      }
      // tslint:disable-next-line:prefer-function-over-method
      getOffsets(types, solidityTypes) {
          let lengths = solidityTypes.map(function (solidityType, index) {
              return solidityType.staticPartLength(types[index]);
          });
          for (let i = 1; i < lengths.length; i++) {
              // sum with length of previous element
              lengths[i] += lengths[i - 1];
          }
          return lengths.map(function (length, index) {
              // remove the current length, so the length is sum of previous elements
              let staticPartLength = solidityTypes[index].staticPartLength(types[index]);
              return length - staticPartLength;
          });
      }
      getSolidityTypes(types) {
          return types.map((type) => this._requireType(type));
      }
  }
  const coder = new SolidityCoder([
      new SolidityTypeAddress(),
      new SolidityTypeBool(),
      new SolidityTypeInt(),
      new SolidityTypeUInt(),
      new SolidityTypeDynamicBytes(),
      new SolidityTypeBytes(),
      new SolidityTypeString(),
      new SolidityTypeReal(),
      new SolidityTypeUReal()
  ]);

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * This prototype should be used to call/sendTransaction to solidity functions
   */
  class SolidityFunction {
      constructor(json) {
          this.json = json;
          this._inputTypes = (json.inputs || []).map(function (i) {
              return i.type;
          });
          this._outputTypes = (json.outputs || []).map(function (i) {
              return i.type;
          });
          this._constant = !!json.constant;
          this._payable = !!json.payable;
          this.needsToBeTransaction =
              json.payable || ('constant' in json && !json.constant) || json.stateMutability === 'nonpayable';
          this._name = transformToFullName(json);
      }
      extractDefaultBlock(args) {
          if (args.length > this._inputTypes.length && !isObject(args[args.length - 1])) {
              return inputDefaultBlockNumberFormatter(args.pop()) || 'latest'; // modify the args array!
          }
          return 'latest';
      }
      /**
       * Should be called to check if the number of arguments is correct
       *
       * @param arguments - An array of arguments
       */
      validateArgs(args) {
          if (args.some(($) => typeof $ === 'undefined')) {
              throw new Error('Invalid call, some arguments are undefined');
          }
          let inputArgs = args.filter(function (a) {
              // filter the options object but not arguments that are arrays
              return !(isObject(a) === true && isArray(a) === false && isBigNumber(a) === false);
          });
          if (inputArgs.length !== this._inputTypes.length) {
              throw InvalidNumberOfSolidityArgs(inputArgs.length, this._inputTypes.length);
          }
      }
      /**
       * Should be used to create payload from arguments
       *
       * @param solidity - function params
       * @param optional - payload options
       */
      toPayload(args) {
          let options = {
              to: undefined,
              data: undefined,
              value: undefined,
              from: undefined
          };
          if (args.length > this._inputTypes.length && isObject(args[args.length - 1])) {
              options = args[args.length - 1];
          }
          this.validateArgs(args);
          const signature = this.signature();
          let params = coder.encodeParams(this._inputTypes, args);
          if (params.indexOf('0x') == 0)
              params = params.substr(2);
          options.data = '0x' + signature + params;
          return options;
      }
      /**
       * Should be used to get function signature
       */
      signature() {
          return sha3(this._name).slice(0, 8);
      }
      unpackOutput(output) {
          if (!output) {
              return;
          }
          const encodedOutput = output.length >= 2 ? output.slice(2) : output;
          let result = coder.decodeParams(this._outputTypes, encodedOutput);
          return result.length === 1 ? result[0] : result;
      }
      /**
       * Calls a contract function or to sendTransaction to solidity function
       *
       * @param requestManager - The RequestManager instance
       */
      async execute(requestManager, address, ...args) {
          if (!requestManager) {
              throw new Error(`Cannot call function ${this.displayName()} because there is no requestManager`);
          }
          if (this.needsToBeTransaction) {
              const payload = this.toPayload(args);
              payload.to = address;
              if (payload.value > 0 && !this._payable) {
                  throw new Error('Cannot send value to non-payable function');
              }
              if (!payload.from) {
                  throw new Error('Missing "from" in transaction options');
              }
              const txHash = await requestManager.eth_sendTransaction(payload);
              return txHash;
          }
          else {
              const defaultBlock = this.extractDefaultBlock(args);
              const payload = this.toPayload(args);
              payload.to = address;
              const output = await requestManager.eth_call(payload, defaultBlock);
              return this.unpackOutput(output);
          }
      }
      /**
       * Should be used to estimateGas of solidity function
       */
      estimateGas(requestManager, address, ...args) {
          if (!(requestManager instanceof RequestManager))
              throw new Error('estimateGas needs to receive a RequestManager as first argument');
          let payload = this.toPayload(args);
          payload.to = address;
          return requestManager.eth_estimateGas(payload);
      }
      /**
       * Should be used to get function display name
       */
      displayName() {
          return extractDisplayName(this._name);
      }
      /**
       * Should be used to get function type name
       */
      typeName() {
          return extractTypeName(this._name) || 'void';
      }
      /**
       * Should be called to attach function to contract
       *
       * @param contract - The contract instance
       */
      attachToContract(contract) {
          let displayName = this.displayName();
          const execute = Object.assign((...args) => {
              return this.execute(contract.requestManager, contract.address, ...args);
          }, { estimateGas: this.estimateGas.bind(this, contract.requestManager, contract.address) });
          if (!contract[displayName]) {
              contract[displayName] = execute;
          }
          contract[displayName][this.typeName()] = execute;
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  function safeAsync(fn) {
      return function () {
          // tslint:disable-next-line:no-console
          fn().catch(($) => console.error($));
      };
  }
  /**
   * Converts a given topic to a hex string, but also allows null values.
   *
   * @param value - The given value
   */
  function toTopic(value) {
      if (value === null || typeof value === 'undefined')
          return null;
      const strValue = String(value).toString();
      if (strValue.indexOf('0x') === 0) {
          return strValue;
      }
      else {
          return fromUtf8(strValue);
      }
  }
  class AbstractFilter {
      constructor(requestManager) {
          this.requestManager = requestManager;
          this.isStarted = false;
          this.isDisposed = false;
          this.formatter = x => x;
          this.filterId = fpFuture_1();
          this.callbacks = [];
          this.stopSemaphore = fpFuture_1();
          // stub
      }
      async watch(callback) {
          if (this.isDisposed)
              throw new Error('The filter was disposed');
          if (callback) {
              this.callbacks.push(callback);
              if (!this.isStarted) {
                  await this.start();
              }
          }
      }
      async start() {
          if (this.isDisposed)
              throw new Error('The filter was disposed');
          if (this.isStarted)
              return;
          this.isStarted = true;
          try {
              const id = await this.getNewFilter();
              if (!id) {
                  throw new Error('Could not create a filter, response: ' + JSON.stringify(id));
              }
              this.filterId.resolve(id);
          }
          catch (e) {
              throw e;
          }
          this.stopSemaphore = fpFuture_1();
          await this.poll();
      }
      async stop() {
          if (!this.isStarted)
              return;
          if (this.isDisposed)
              return;
          this.isDisposed = true;
          const filterId = await this.filterId;
          this.isStarted = false;
          if (this.stopSemaphore)
              await this.stopSemaphore;
          const didStop = await this.uninstall();
          if (didStop !== true) {
              throw new Error(`Couldn't stop the eth filter: ${filterId}`);
          }
      }
      /**
       * Adds the callback and sets up the methods, to iterate over the results.
       */
      async poll() {
          if (this.isStarted) {
              if (this.callbacks.length) {
                  const result = await this.getChanges();
                  this.callbacks.forEach((cb) => {
                      if (this.formatter) {
                          result.forEach(($) => {
                              cb(this.formatter($));
                          });
                      }
                      else {
                          result.forEach(($) => cb($));
                      }
                  });
              }
              this.stopSemaphore.resolve(1);
              if (this.isStarted) {
                  this.stopSemaphore = fpFuture_1();
                  setTimeout(safeAsync(() => this.poll()), ETH_POLLING_TIMEOUT);
              }
          }
          else {
              this.stopSemaphore.resolve(1);
          }
      }
  }
  class SHHFilter extends AbstractFilter {
      constructor(requestManager, options) {
          super(requestManager);
          this.requestManager = requestManager;
          this.options = options;
          this.options = this.options || { topics: [] };
          this.options.topics = this.options.topics || [];
          this.options.topics = this.options.topics.map(function (topic) {
              return toTopic(topic);
          });
          this.options = {
              topics: this.options.topics,
              to: this.options.to
          };
      }
      async getMessages() {
          const filterId = await this.filterId;
          return this.requestManager.shh_getMessages(filterId);
      }
      async getNewFilter() {
          return this.requestManager.shh_newFilter(this.options);
      }
      async getChanges() {
          const filterId = await this.filterId;
          return this.requestManager.shh_getFilterChanges(filterId);
      }
      async uninstall() {
          const filterId = await this.filterId;
          return this.requestManager.shh_uninstallFilter(filterId);
      }
  }
  class EthFilter extends AbstractFilter {
      constructor(requestManager, options, formatter = (x) => x) {
          super(requestManager);
          this.requestManager = requestManager;
          this.options = options;
          this.formatter = formatter;
          this.options = this.options || {};
          this.options.topics = this.options.topics || [];
          this.options.topics = this.options.topics.map(function (topic) {
              return toTopic(topic);
          });
          this.options = {
              topics: this.options.topics,
              address: this.options.address ? this.options.address : undefined,
              fromBlock: typeof this.options.fromBlock === 'number' || typeof this.options.fromBlock === 'string'
                  ? inputBlockNumberFormatter(this.options.fromBlock) || undefined
                  : 'latest',
              toBlock: typeof this.options.toBlock === 'number' || typeof this.options.toBlock === 'string'
                  ? inputBlockNumberFormatter(this.options.toBlock) || undefined
                  : 'latest'
          };
      }
      async getLogs() {
          if (!this.isStarted) {
              await this.start();
          }
          const filterId = await this.filterId;
          return this.requestManager.eth_getFilterLogs(filterId);
      }
      async getNewFilter() {
          return this.requestManager.eth_newFilter(this.options);
      }
      async getChanges() {
          const filterId = await this.filterId;
          return this.requestManager.eth_getFilterChanges(filterId);
      }
      async uninstall() {
          const filterId = await this.filterId;
          return this.requestManager.eth_uninstallFilter(filterId);
      }
  }
  class EthPendingTransactionFilter extends EthFilter {
      constructor(requestManager) {
          super(requestManager, {});
      }
      async getNewFilter() {
          return this.requestManager.eth_newPendingTransactionFilter();
      }
  }
  class EthBlockFilter extends EthFilter {
      constructor(requestManager) {
          super(requestManager, {});
      }
      async getNewFilter() {
          return this.requestManager.eth_newBlockFilter();
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * This prototype should be used to create event filters
   */
  class SolidityEvent {
      constructor(requestManager, json, address) {
          this.requestManager = requestManager;
          this.address = address;
          this._anonymous = false;
          this._params = json.inputs || [];
          this._name = transformToFullName(json);
          this._anonymous = json.anonymous || false;
      }
      /**
       * Should be used to get filtered param types
       *
       * @param decide - True if returned typed should be indexed
       */
      types(indexed) {
          return this._params
              .filter(function (i) {
              return i.indexed === indexed;
          })
              .map(function (i) {
              return i.type;
          });
      }
      /**
       * Should be used to get event display name
       */
      displayName() {
          return extractDisplayName(this._name);
      }
      /**
       * Should be used to get event type name
       */
      typeName() {
          return extractTypeName(this._name) || 'void';
      }
      /**
       * Should be used to get event signature
       */
      signature() {
          return sha3(this._name);
      }
      /**
       * Should be used to encode indexed params and options to one final object
       *
       * @param {object} indexed
       * @param {object} options
       */
      encode(indexed = {}, options = {}) {
          let result = {
              topics: [],
              address: this.address
          };
          if (options.fromBlock !== undefined)
              result.fromBlock = inputBlockNumberFormatter(options.fromBlock) || undefined;
          if (options.toBlock !== undefined)
              result.toBlock = inputBlockNumberFormatter(options.toBlock) || undefined;
          result.topics = result.topics || [];
          if (!this._anonymous) {
              result.topics.push('0x' + this.signature());
          }
          let indexedTopics = this._params
              .filter(function (i) {
              return i.indexed === true;
          })
              .map(function (i) {
              let value = indexed[i.name];
              if (value === undefined || value === null) {
                  return null;
              }
              if (isArray(value)) {
                  return value.map(function (v) {
                      return '0x' + coder.encodeParam(i.type, v);
                  });
              }
              return '0x' + coder.encodeParam(i.type, value);
          });
          result.topics = result.topics.concat(indexedTopics);
          return result;
      }
      /**
       * Should be used to decode indexed params and options
       *
       * @param {object} data
       */
      decode(data) {
          data.data = data.data || '';
          data.topics = data.topics || [];
          let argTopics = this._anonymous ? data.topics : data.topics.slice(1);
          let indexedData = argTopics
              .map(function (topics) {
              return topics.slice(2);
          })
              .join('');
          let indexedParams = coder.decodeParams(this.types(true), indexedData);
          let notIndexedData = data.data.slice(2);
          let notIndexedParams = coder.decodeParams(this.types(false), notIndexedData);
          const args = this._params.reduce(function (acc, current) {
              acc[current.name] = current.indexed ? indexedParams.shift() : notIndexedParams.shift();
              return acc;
          }, {});
          return Object.assign(Object.assign({}, outputLogFormatter(data)), { event: this.displayName(), address: data.address, args });
      }
      /**
       * Should be used to create new filter object from event
       *
       * @param {object} indexed
       * @param {object} options
       */
      async execute(indexed, options) {
          let o = this.encode(indexed, options);
          let formatter = this.decode.bind(this);
          return new EthFilter(this.requestManager, o, formatter);
      }
      /**
       * Should be used to attach event to contract object
       *
       * @param {Contract}
       */
      attachToContract(contract) {
          let execute = this.execute.bind(this);
          let displayName = this.displayName();
          if (!contract.events[displayName]) {
              contract.events[displayName] = execute;
          }
          contract.events[displayName][this.typeName()] = this.execute.bind(this, contract);
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  class AllSolidityEvents {
      constructor(_requestManager, _json, _address) {
          this._requestManager = _requestManager;
          this._json = _json;
          this._address = _address;
      }
      encode(options = {}) {
          let result = {
              address: this._address
          };
          if (options.fromBlock !== undefined)
              result.fromBlock = inputBlockNumberFormatter(options.fromBlock) || undefined;
          if (options.toBlock !== undefined)
              result.toBlock = inputBlockNumberFormatter(options.toBlock) || undefined;
          return result;
      }
      decode(data) {
          data.data = data.data || '';
          let eventTopic = isArray(data.topics) && isString(data.topics[0]) ? data.topics[0].slice(2) : '';
          let match = this._json.filter(function (j) {
              return eventTopic === sha3(transformToFullName(j));
          })[0];
          if (!match) {
              // cannot find matching event?
              return outputLogFormatter(data);
          }
          let event = new SolidityEvent(this._requestManager, match, this._address);
          return event.decode(data);
      }
      async execute(options) {
          let filterOptions = this.encode(options);
          let formatter = this.decode.bind(this);
          return new EthFilter(this._requestManager, filterOptions, formatter);
      }
      getAllEventsFunction() {
          return this.execute.bind(this);
      }
  }

  /**
   * Should be called to add functions to contract object
   *
   * @param contract - The contract instance
   */
  function addFunctionsToContract(contract) {
      contract.abi
          .filter(function (json) {
          return json.type === 'function';
      })
          .map(function (json) {
          return new SolidityFunction(json);
      })
          .forEach(function (f) {
          f.attachToContract(contract);
      });
  }
  /**
   * Should be called to add events to contract object
   *
   * @param contract - The contract instance
   */
  function addEventsToContract(contract) {
      let events = contract.abi.filter(function (json) {
          return json.type === 'event';
      });
      let allEvents = new AllSolidityEvents(contract.requestManager, events, contract.address);
      events
          .map(function (json) {
          return new SolidityEvent(contract.requestManager, json, contract.address);
      })
          .forEach(function (e) {
          e.attachToContract(contract);
      });
      return allEvents.getAllEventsFunction();
  }
  /**
   * @public
   * Should be called to create new contract instance
   */
  class Contract {
      constructor(requestManager, abi, address) {
          this.requestManager = requestManager;
          this.abi = abi;
          this.address = address;
          this.events = {};
          this.transactionHash = null;
          this.address = address;
          this.abi = abi;
          // this functions are not part of prototype,
          // because we dont want to spoil the interface
          addFunctionsToContract(this);
          this.allEvents = addEventsToContract(this);
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */
  /**
   * Should be called to check if the contract gets properly deployed on the blockchain.
   * @param requestManager - The reference to a RequestManager instance
   */
  async function checkForContractAddress(requestManager, txId) {
      const receiptFuture = fpFuture_1();
      let count = 0;
      const fetcher = () => {
          count++;
          // stop watching after 50 blocks (timeout)
          if (count > 50) {
              receiptFuture.reject(new Error("Contract transaction couldn't be found after 50 blocks"));
          }
          else {
              requestManager.eth_getTransactionReceipt(txId).then((receipt) => {
                  if (receipt && receipt.blockHash) {
                      receiptFuture.resolve(receipt);
                  }
                  else {
                      setTimeout(fetcher, 1000);
                  }
              }, 
              /* istanbul ignore next */
              (error) => receiptFuture.reject(error));
          }
      };
      fetcher();
      const receipt = await receiptFuture;
      const code = await requestManager.eth_getCode(receipt.contractAddress, 'latest');
      // code can be null because of undefined behavior of eth nodes,
      // the strict types requires us to check that code is not null before
      // comparing it with a number `> 3` "0x0"
      if (code && code.length > 3) {
          return receipt.contractAddress;
      }
      /* istanbul ignore next */
      throw Object.assign(new Error("The contract code couldn't be stored, please check your gas amount."), {
          response: code,
          receipt
      });
  }
  /**
   * Should be called to encode constructor params
   * @param abi - The given contract ABI
   */
  function encodeConstructorParams(abi, params) {
      return (abi
          .filter(function (json) {
          return json.type === 'constructor' && json.inputs && json.inputs.length === params.length;
      })
          .map(function (json) {
          return json.inputs.map(function (input) {
              return input.type;
          });
      })
          .map(function (types) {
          return coder.encodeParams(types, params);
      })[0] || '');
  }
  /**
   * @public
   * Should be called to create new ContractFactory instance
   */
  class ContractFactory {
      constructor(requestManager, abi) {
          this.requestManager = requestManager;
          this.abi = abi;
      }
      async deploy(...args) {
          // parse arguments
          let options = undefined;
          let last = args[args.length - 1];
          if (isObject(last) && !isArray(last)) {
              options = args.pop();
          }
          /* istanbul ignore if */
          if (!options) {
              throw new Error('Missing options object');
          }
          /* istanbul ignore if */
          if (!options.data || typeof options.data !== 'string') {
              throw new Error('Invalid options.data');
          }
          if (toDecimal(options.value) > 0) {
              let constructorAbi = this.abi.filter(function (json) {
                  return json.type === 'constructor' && json.inputs.length === args.length;
              })[0] || {};
              /* istanbul ignore if */
              if (!constructorAbi.payable) {
                  throw new Error('Cannot send value to non-payable constructor');
              }
          }
          let bytes = encodeConstructorParams(this.abi, args);
          options.data += bytes;
          if (!options.gas) {
              options.gas = await this.requestManager.eth_estimateGas(options);
          }
          // wait for the contract address and check if the code was deployed
          const hash = await this.requestManager.eth_sendTransaction(options);
          if (!hash) {
              throw new Error('Error while sending contract creation transaction. A TxHash was not retrieved');
          }
          const address = await checkForContractAddress(this.requestManager, hash);
          const contract = await this.at(address);
          contract.transactionHash = hash;
          return contract;
      }
      /**
       * Should be called to get access to existing contract on a blockchain
       *
       * @param address - The contract address
       */
      async at(address) {
          if (!isAddress(address)) {
              throw new TypeError(`Invalid address ${JSON.stringify(address)}`);
          }
          return new Contract(this.requestManager, this.abi, address);
      }
  }

  /*
      This file is part of web3.js.

      web3.js is free software: you can redistribute it and/or modify
      it under the terms of the GNU Lesser General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      web3.js is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Lesser General Public License for more details.

      You should have received a copy of the GNU Lesser General Public License
      along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
  */

  exports.AbstractFilter = AbstractFilter;
  exports.BigNumber = bignumber_1;
  exports.Contract = Contract;
  exports.ContractFactory = ContractFactory;
  exports.EthBlockFilter = EthBlockFilter;
  exports.EthFilter = EthFilter;
  exports.EthPendingTransactionFilter = EthPendingTransactionFilter;
  exports.HTTPProvider = HTTPProvider;
  exports.Method = Method;
  exports.Property = Property;
  exports.RequestManager = RequestManager;
  exports.SHHFilter = SHHFilter;
  exports.SolidityEvent = SolidityEvent;
  exports.SolidityFunction = SolidityFunction;
  exports.WebSocketProvider = WebSocketProvider;
  exports.default = RequestManager;
  exports.extractDisplayName = extractDisplayName;
  exports.extractTypeName = extractTypeName;
  exports.fromAscii = fromAscii;
  exports.fromDecimal = fromDecimal;
  exports.fromUtf8 = fromUtf8;
  exports.fromWei = fromWei;
  exports.getValueOfUnit = getValueOfUnit;
  exports.hexToBytes = hexToBytes;
  exports.isAddress = isAddress;
  exports.isArray = isArray;
  exports.isBigNumber = isBigNumber;
  exports.isBloom = isBloom;
  exports.isBoolean = isBoolean;
  exports.isChecksumAddress = isChecksumAddress;
  exports.isFunction = isFunction;
  exports.isHex = isHex;
  exports.isJson = isJson;
  exports.isObject = isObject;
  exports.isStrictAddress = isStrictAddress;
  exports.isString = isString;
  exports.isTopic = isTopic;
  exports.isValidResponse = isValidResponse;
  exports.padLeft = padLeft;
  exports.padRight = padRight;
  exports.sha3 = sha3;
  exports.toAddress = toAddress;
  exports.toArray = toArray;
  exports.toAscii = toAscii;
  exports.toBatchPayload = toBatchPayload;
  exports.toBigNumber = toBigNumber;
  exports.toBoolean = toBoolean;
  exports.toChecksumAddress = toChecksumAddress;
  exports.toData = toData;
  exports.toDecimal = toDecimal;
  exports.toHex = toHex;
  exports.toJsonRpcRequest = toJsonRpcRequest;
  exports.toNullDecimal = toNullDecimal;
  exports.toString = toString;
  exports.toTwosComplement = toTwosComplement;
  exports.toUtf8 = toUtf8;
  exports.toWei = toWei;
  exports.transformToFullName = transformToFullName;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=eth-connect.js.map
