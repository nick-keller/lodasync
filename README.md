# Lodasync
![npm](https://img.shields.io/npm/v/lodasync)
![Travis (.org)](https://img.shields.io/travis/nick-keller/lodasync)
![Coveralls github](https://img.shields.io/coveralls/github/nick-keller/lodasync)

Lodasync is an asynchronous functional programing utility library heavily 
inspired by [lodash/fp](https://lodash.com/). 
It has no dependencies, is lightweight, has a strong focus on performance, 
and is fully tested and documented.

## Getting Started
Install Lodasync using npm.
```
npm i lodasync
```

```js
import { mapAync } from 'lodasync'
 
const getUser = async(id) => { /*...*/ }

const users = await mapAync(getUser, [42, 68])
```

## Design principles
This library is developed with a few principles in mind.

### Curried parameters
All methods are curried so you can write:
```js
await reduceAsync(callback, initialValue, collection)
await reduceAsync(callback, initialValue)(collection)
await reduceAsync(callback)(initialValue, collection)
await reduceAsync(callback)(initialValue)(collection)
```

This allows you to create functions like so:
```js
const sumByPriceAsync = reduceAsync(async(sum, obj) => sum + await getPrice(obj), 0)
const sum = await sumByPriceAsync(collection)
```

### Promises as parameters
All parameters accept promises, you do not need to await them:
```js
// Don't
await filterAsync(isUserAuthorized, await users)

// Do
await filterAsync(isUserAuthorized, users)
```

### Async callbacks
All callbacks can be async:
```js
const isUserAuthorized = async(user) => { /*...*/ }

await filterAsync(isUserAuthorized, users)
```

### Resolved callbacks parameters
Received arguments are always resolved:
```js
const getUser = async(id) => { /*...*/ }

// Don't 
await mapAsync(async(user) => (await user).name, [getUser(1), getUser(2)])

// Do
await mapAsync((user) => user.name, [getUser(1), getUser(2)])
```

For arguments that are arrays, elements are not resolved:
```js
const getUser = async(id) => { /*...*/ }

// Don't 
await mapAsync((user, index, array) => array[0].name, [getUser(1), getUser(2)])

// Do
await mapAsync(async(user, index, array) => (await array[0]).name, [getUser(1), getUser(2)])
```

### Callbacks called in parallel
When possible, callbacks are always called in parallel, on all elements.

This is also true for methods like `find` that usually stop on the first match.
This is done to maximize parallelism.

### Promises as return values
The return value is always a promise.
```js
// Still need to await
const result = await mapAsync(x => x * 2, [3, 4])
```
If the return value resolves to an array, all values are also resolved.
```js
const users = await mapAsync(getUser, [65, 13])

// Don't
(await users[0]).name

// Do
users[0].name
```

# API

## everyAsync(callback, collection)
Implementation of native [Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).

## filterAsync(callback, collection)
Implementation of native [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

## findAsync(callback, collection)
Implementation of native [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

## findIndexAsync(callback, collection)
Implementation of native [Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).

## flatMapAsync(callback, collection)
Implementation of native [Array.prototype.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap).

## flowAsync(...callbacks)
Creates a function that return the result of invoking all callbacks in series, 
where each successive invocation is supplied the return value of the previous.

### Example
```js
const getUserIds = async() => { /*...*/ }
const getUser = async(id) => { /*...*/ }
const isAuthorized = async(user) => { /*...*/ }

const getAuthorizedUsers = flowAsync(
  mapAsync(getUser), 
  filterAsync(isAuthorized)
)

const authorizedUsers = await getAuthorizedUsers(getUserIds())
```

## getAsync(path, object)
Works like `getOrAsync` with `undefined` as its `defaultValue`.

## getOrAsync(defaultValue, path, object)
Gets the value at `path` of `object`. 
If the resolved value is undefined, the defaultValue is returned in its place.

### Arguments
- `defaultValue`\
  The value returned for `undefined` resolved values.
- `path`\
  An array of keys, or a string that should be split on dots.
- `object`\
  The object from which to get the property.

### Return value
The resolved value.

### Example
```js
const user = {
  name: Promise.resolve('John'),
}

const article = {
 author: Promise.resolve(user),
}

await getOrAsync(null, 'author.name', article) // => 'John'
// Or
await getOrAsync(null, ['author', 'name'], article) // => 'John'
```

## groupByAsync(callback, collection)
Creates an object composed of keys generated from the results of running each element of `collection` thru `callback`. 
The order of grouped values is determined by the order they occur in `collection`. 
The corresponding value of each key is an array of elements responsible for generating the key. 

### Arguments
- `callback`\
  A function that should return a key for each element.
  It takes the following arguments:
  - `element`\
    The current element in the collection.
  - `index`\
    The index of the current element in the collection.
  - `collection`\
    The collection that `groupByAsync` was called on.
- `collection`\
  The collection to iterate over.

### Return value
The composed aggregate object.

### Example
```js
const getUsers = async() => { /*...*/ }
const getFirstName = async(user) => { /*...*/ }

await groupByAsync(getFirstName, getUsers())
// => { John: [user1, user2, ...], Carol: [user3, ...] }
```

## mapAsync(callback, collection)
Implementation of native [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

## maxByAsync(callback, collection)
Computes the maximum value of `collection` by invoking `callback` for each element 
to generate the criterion by which the value is ranked.

### Arguments
- `callback`\
  A function that should return a criterion for each element.
  It takes the following arguments:
  - `element`\
    The current element in the collection.
  - `index`\
    The index of the current element in the collection.
  - `collection`\
    The collection that `maxByAsync` was called on.
- `collection`\
  The collection to iterate over.

### Return value
The maximum value of `collection`, `undefined` if the collection is empty.

### Example
```js
const getItemPrice = async(item) => { /*...*/ }

await maxByAsync(getItemPrice, [item1, item2, item3])
// => item3
```

## minByAsync(callback, collection)
Computes the minimum value of `collection` by invoking `callback` for each element 
to generate the criterion by which the value is ranked.

### Arguments
- `callback`\
  A function that should return a criterion for each element.
  It takes the following arguments:
  - `element`\
    The current element in the collection.
  - `index`\
    The index of the current element in the collection.
  - `collection`\
    The collection that `minByAsync` was called on.
- `collection`\
  The collection to iterate over.

### Return value
The minimum value of `collection`, `undefined` if the collection is empty.

### Example
```js
const getItemPrice = async(item) => { /*...*/ }

await minByAsync(getItemPrice, [item1, item2, item3])
// => item2
```

## reduceAsync(callback, initialValue, collection)
Implementation of native [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

## someAsync(callback, collection)
Implementation of native [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

## uniqByAsync(callback, collection)
Creates a duplicate-free version of `collection`.
`callback` is invoked for each element to generate the criterion by which uniqueness is computed.
Only the first occurrence of each element is kept. 
The order of result values is determined by the order they occur in the array.

### Arguments
- `callback`\
  A function that should return a criterion for each element.
  It takes the following arguments:
  - `element`\
    The current element in the collection.
  - `index`\
    The index of the current element in the collection.
  - `collection`\
    The collection that `uniqByAsync` was called on.
- `collection`\
  The collection to iterate over.

### Return value
The new duplicate free collection.

### Example
```js
const getUser = async(id) => { /*...*/ }
const getUserId = async(user) => { /*...*/ }

await uniqByAsync(getUserId, [getUser(1), getUser(3), getUser(1)])
// => [user1, user2]
```
