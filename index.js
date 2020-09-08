"use strict";

/**
 * Default time in miliseconds that an item is stored before expiring.
 */
const DEFAULT_TTL_MS = 1000; // 1 second

/**
 * Used as a marker for infinite amount of items in the store.
 */
const INFINITE = undefined;

/**
 * A hashmap that is the storage of cache items.
 */
const STORE = new Map();

/**
 * The default number of maxSlots in a store. Can be overridden by setMaxSlots(int)
 */
let maxSlots = INFINITE;

/**
 * The default logger is the console, but any that implements info(str) will do.
 * Override by setLogger(log)
 */
let logger = console;

/**
 * Store an item in the cache
 *
 * @param {*} itemKey Unique key.
 * @param {*} value The value or object to store.
 * @param {*} ttl how many milliseconds should the cache item live? Defaults to DEFAULT_TTL_MS.
 */
const add = (itemKey, value, ttl = DEFAULT_TTL_MS) => {
  if (isCacheFull()) {
    logger.info(`All slots are full. Key '${itemKey}' is not added to cache.`);
    return;
  }

  STORE.set(itemKey, {
    value: value,
    expires: Date.now() + ttl,
  });
};

/**
 * Remove an item from the cache
 * @param {*} itemKey Unique key
 */
const remove = (itemKey) => {
  STORE.delete(itemKey);
};

/**
 * Gets the item value matching the itemKey in the store.
 * @param {*} itemKey Unique key
 */
const get = (itemKey) => {
  const item = getItemWithTtl(itemKey);
  if (item != undefined) {
    return item.value;
  }
  return undefined;
};

/**
 * Removes all items in the cache, an empty store is all that is left.
 */
const removeAll = () => {
  STORE.clear();
};

/**
 * Get the number of items in the cache.
 */
const length = () => {
  return STORE.size;
};

/**
 * Sets a maximum number of items that the store can have.
 * As default the store can hold a infinite number of items.
 * @param {*} limit
 */
const setMaxSlots = (limit) => {
  maxSlots = limit;
};

/**
 * Is the place for more items in the store?
 * If no setMaxSlots()  is set, the store never gets full.
 */
const isCacheFull = () => {
  if (maxSlots === INFINITE) {
    return false;
  }

  if (length() < maxSlots) {
    return false;
  }

  return true;
};

/**
 * Gets the full item matching the itemKey in the store. Includes the expires.
 * @param {*} itemKey Unique key
 */
const getItemWithTtl = (itemKey) => {
  const item = STORE.get(itemKey);
  if (isValidItem(item)) {
    return item;
  }
  return undefined;
};

/**
 * Is the item still valid for use?
 */
const isValid = (itemKey) => {
  return isValidItem(get(itemKey));
};

/**
 * Is the item still valid for use?
 */
const isValidItem = (item) => {
  if (item == null) {
    return false;
  }
  if (Date.now() > item.expires) {
    return false;
  }
  return true;
};

const setLogger = (log) => {
  logger = log;
};

/**
 * Public exports
 */
module.exports = {
  add: add,
  get: get,
  getItemWithTtl: getItemWithTtl,
  remove: remove,
  removeAll: removeAll,
  isValid: isValid,
  setMaxSlots: setMaxSlots,
  isCacheFull: isCacheFull,
  length: length,
  setLogger: setLogger,
  DEFAULT_TTL_MS: DEFAULT_TTL_MS,
  INFINITE: INFINITE,
};
