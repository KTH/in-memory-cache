# In Memory Cache

This is how you use the cache. It is a very basic in memory cache.

```javascript

const cache = require('in-memory-cache');

const user = { firstName: "Patric", lastname: "Jansson" }

cache.add('user-id', user);

if (cache.valid('user-id')) {
    console.log('Users lastname is ' + cache.get('user-id').lastname);
}

cache.remove('user-id');
```

## Time To Live

If a cache item should live for a long time you can set a time to live on it in milliseconds on the item.

```javascript
const cache = require('in-memory-cache');
const aDay = 1000 * 60 * 60 * 24;
const me = { firstName: 'Patric', lastname: 'Jansson' }
cache.add('long-caching-object', me, aDay);
```
