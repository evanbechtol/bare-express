/* eslint-disable */
const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const ObjectService = require( "../../services/ObjectService" );
const CordsKeyWhitelist = require( "../../config/testWhitelists" );

mocha.describe( "Object Service", () => {
  const ObjectServiceInstance = new ObjectService();

  it( "Instance should be created", () => {
    assert.exists( ObjectServiceInstance );
  } );

  it( "Should have 'pick' method", () => {
    assert.isFunction( ObjectService.pick );
  } );

  it( "Should return only whitelisted keys", () => {
    const object = {
      status: "Open",
      description: "Here is a test description from the DB",
      openedOn: "2019-02-19T20:57:00.009Z",
      rescuers: [],
      likes: 0,
      tags: [],
      puller: { "_id": 1, "username": "eevabec" },
      _id: "5c6c7499fb6fc01c4ce7dfd2",
      title: "500 Status code on login",
      app: "Knowledge Catalog",
      category: "Authentication",
      someBadKey: "12345",
      AnotherBadKey: {
        nestedStuff: 123,
        nestedArray: [ 1, 2, 3, "a" ]
      }
    };

    const result = ObjectService.pick( object, CordsKeyWhitelist.post );

    assert.exists( result );
    assert.isObject( result );
    assert.hasAllKeys( result, CordsKeyWhitelist.post );
  } );
} );
