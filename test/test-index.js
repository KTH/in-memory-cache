/* eslint-env mocha */
"use strict";

// Testing libraries
const expect = require("chai").expect;
const cache = require("../index");

describe("Cache - Add", function() {
  it("'Null' is an acceptable cache item value.", function() {
    cache.removeAll();
    cache.add("item-key", null);
    expect(cache.get("item-key")).to.equal(null);
    expect(cache.length()).to.equal(1);
  });

  it("'Undefined' is an acceptable cache item value.", function() {
    cache.removeAll();
    cache.add("item-key", undefined);
    expect(cache.get("item-key")).to.equal(undefined);
    expect(cache.length()).to.equal(1);
  });

  it(`When no TTL is passed, the default ${cache.DEFAULT_TTL_MS}ms is used as the time for an item to live.`, function() {
    cache.removeAll();
    cache.add("item-key", {});
    const expires = cache.getFull("item-key").expires;
    const ttl = Date.now() - expires;
    expect(ttl).to.be.below(cache.DEFAULT_TTL_MS + 1); // The +1 is for when the CPU is fast and it s equal and not below.
  });

  it(`Use a specific TTL for an item to live.`, function() {
    cache.removeAll();
    cache.add("item-key", {}, 9999);
    const expires = cache.getFull("item-key").expires;
    const ttl = expires - Date.now();

    expect(ttl).to.be.above(cache.DEFAULT_TTL_MS);
  });
});

describe("Cache - Get", function() {
  it("It is possible to store and get a string.", function() {
    cache.removeAll();
    cache.add("token", "sEcret-value");
    expect(cache.get("token")).to.equal("sEcret-value");
  });

  it("It is possible to store and get a number.", function() {
    cache.removeAll();
    cache.add("id", 1337);
    expect(cache.get("id")).to.equal(1337);
  });

  it("It is possible to store and get an object.", function() {
    cache.removeAll();
    cache.add("user", { name: "Patric Jansson" });
    const user = cache.get("user");
    expect(user.name).to.equal("Patric Jansson");
  });

  it("If the TTL has expired, 'undefined' will be returend for the item key.", function() {
    cache.removeAll();
    cache.add("user", { name: "Patric Jansson" }, -1);
    const user = cache.get("user");
    expect(user).to.equal(undefined);
  });
  it("If there is no matching item in the store 'undefined' will be returned.", function() {
    cache.removeAll();
    expect(cache.get("key")).to.equal(undefined);
  });
});

describe("Cache - Remove", function() {
  it("It is possible to remove one specific item in the cache.", function() {
    cache.removeAll();
    cache.add("key-1", "value 1");
    cache.add("key-2", "value 2");
    cache.add("key-3", "value 3");
    expect(cache.length()).to.equal(3);
    expect(cache.get("key-2")).to.equal("value 2");
    cache.remove("key-2");
    expect(cache.length()).to.equal(2);
    expect(cache.get("key-2")).to.equal(undefined);
  });

  it("It is possible to remove all items in the cache.", function() {
    cache.removeAll();
    cache.add("key-1", "value 1");
    cache.add("key-2", "value 2");
    expect(cache.length()).to.equal(2);
    cache.removeAll();
    expect(cache.length()).to.equal(0);
  });

  it("Nothing happens if you remove an item that is not in the store.", function() {
    cache.add("key-1", "value 1");
    cache.remove("key-not-there");
    expect(cache.length()).to.equal(1);
  });
});

describe("Cache - Length", function() {
  it("It is possible to get the numer of items in the cache.", function() {
    cache.removeAll();
    cache.add("key-1", "value 1");
    cache.add("key-2", "value 2");
    expect(cache.length()).to.equal(2);
  });
});
