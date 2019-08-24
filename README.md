# In-memory Cache ![alt text](https://api.travis-ci.org/KTH/in-memory-cache.svg?branch=master)

This is how you use the in-memory cache. It is a very basic iplementation.

```javascript

const cache = require('kth-node-in-memory-cache');

const user = { firstName: "John", lastname: "Doe" }

cache.add('user-id', user);

if (cache.valid('user-id')) {
    console.log('Users lastname is ' + cache.get('user-id').lastname);
}

cache.remove('user-id');
```

## Time To Live

If a cache item should live for a long time you can set a time to live on it in milliseconds on the item.

```javascript
const cache = require('kth-node-in-memory-cache');
const aDay = 1000 * 60 * 60 * 24;
const user = { firstName: 'John', lastname: 'Doe' }
cache.add('long-caching-object', user, aDay);
```


## Run tests

To run the tests, do npm magic or run `./build.sh`. You can also view the tests at https://travis-ci.org/KTH/in-memory-cache

```bash
npm install
npm test
```

```text

  Cache - Add
    ✓ 'Null' is and acceptable cache item value.
    ✓ 'Undefined' is and acceptable cache item value.
    ✓ When no TTL is passed, the default 1000ms is used as the time for an item to live.
    ✓ Use a specific TTL for an item to live.

  Cache - Get
    ✓ It is possible to store and get a string.
    ✓ It is possible to store and get an object.
    ✓ If the TTL has expired, 'undefined' will be returend for the item key.

  Cache Remove
    ✓ It is possible to remove one specific item in the store.
    ✓ It is possible to remove all items in the store.

  Cache Length
    ✓ It is possible to get the numer of items in the store.

```
