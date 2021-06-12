# In-memory Cache ![alt text](https://api.travis-ci.org/KTH/in-memory-cache.svg?branch=master) ![Continous Integration](https://github.com/KTH/in-memory-cache/actions/workflows/main.yml/badge.svg)


Npm: `@kth/in-memory-cache`

This is how you use the in-memory cache. It is a very basic iplementation.

```javascript

const cache = require("@kth/in-memory-cache");

const user = { firstName: "John", lastname: "Doe" }

cache.add('user-id', user);

if (cache.isValid('user-id')) {
    console.log('Users lastname is ' + cache.get('user-id').lastname);
}

cache.remove('user-id');
```

## TTL - Set the time an item is valid

If a cache item should live for a long time you can set a time to live (TTL) on it in milliseconds on the item.

```javascript
const cache = require('@kth/in-memory-cache');

const aDay = 1000 * 60 * 60 * 24;
const user = { firstName: 'John', lastname: 'Doe' }

cache.add('long-caching-object', user, aDay);
```

## Limit the number of items in the store

Sometimes you whould like to limit the number of items that are stored in the cache.
This is not a FIFO, if there is space, the item will be added. Otherwise silently ignored.

```javascript
const cache = require('@kth/in-memory-cache');

cache.setMaxSlots(2)

cache.add('key-1', 'value 1');
cache.add('key-2', 'value 2');
cache.add('key-3', 'value 3'); // not added, with logger.info(str) message

cache.length(); // 2
```

## Use your own logger

Your project probably already have a logging framework, you can pass it to the cache.
The default logger is console.

```javascript
const cache = require('@kth/in-memory-cache');
const log = require('someLogger')

// The logger needs to implement the function info(string)
cache.setLogger(log);

```


## Run tests

To run the tests, do npm magic or run `./build.sh`. You can also view the tests at https://travis-ci.org/KTH/in-memory-cache

```bash
npm install
npm test
```

```text
  Cache - Add
    ✓ 'Null' is an acceptable cache item value.
    ✓ 'Undefined' is an acceptable cache item value.
    ✓ When no TTL is passed, the default 1000ms is used as the time for an item to live.
    ✓ Use a specific TTL for an item to live.
    ✓ When a max slot is set no more items are added, until old ones are removed.

  Cache - Get
    ✓ It is possible to store and get a string.
    ✓ It is possible to store and get a number.
    ✓ It is possible to store and get an object.
    ✓ If the TTL has expired, 'undefined' will be returend for the item key.
    ✓ If there is no matching item in the store 'undefined' will be returned.

  Cache - Remove
    ✓ It is possible to remove one specific item in the cache.
    ✓ It is possible to remove all items in the cache.
    ✓ Nothing happens if you remove an item that is not in the store.

  Cache - Number of slots
    ✓ It is possible to get the numer of items in the cache.
    ✓ It is possible to set the maximum number of items in the cache.

  Cache - logger
    ✓ It is possible to set an external logger.

```
