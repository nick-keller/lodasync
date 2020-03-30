# Lodasync
![npm](https://img.shields.io/npm/v/lodasync)
![Travis (.org)](https://img.shields.io/travis/nick-keller/lodasync)
![Coveralls github](https://img.shields.io/coveralls/github/nick-keller/lodasync)

Lodasync is an asynchronous functional programing utility library heavily 
inspired by [lodash/fp](https://lodash.com/). 
It has no dependencies, is lightweight, has a strong focus on performance, 
and is fully tested and documented.

## Why Lodasync?
Lodasync makes asynchronous JavaScript easier by taking the hassle out of 
working with promises, arrays, and asynchronous callbacks.
- Work with promises the way you work with synchronous code
- Do not re-invent the wheel and rely on fully tested and documented code
- Use functions that are performance oriented, don't waste time benchmarking yourself

## Table of contents
- [Getting started](#getting-started)
- [Design principles](#design-principles)
- [API](#api)
  - [everyAsync(callback, collection)](#everyasynccallback-collection)
  - [filterAsync(callback, collection)](#filterasynccallback-collection)
  - [findAsync(callback, collection)](#findasynccallback-collection)
  - [findIndexAsync(callback, collection)](#findindexasynccallback-collection)
  - [flatMapAsync(callback, collection)](#flatmapasynccallback-collection)
  - [flowAsync(...callbacks)](#flowasynccallbacks)
  - [getAsync(path, object)](#getasyncpath-object)
  - [getOrAsync(defaultValue, path, object)](#getorasyncdefaultvalue-path-object)
  - [groupByAsync(callback, collection)](#groupbyasynccallback-collection)
  - [mapAsync(callback, collection)](#mapasynccallback-collection)
  - [maxByAsync(callback, collection)](#maxbyasynccallback-collection)
  - [minByAsync(callback, collection)](#minbyasynccallback-collection)
  - [reduceAsync(callback, initialValue, collection)](#reduceasynccallback-initialvalue-collection)
  - [someAsync(callback, collection)](#someasynccallback-collection)
  - [uniqByAsync(callback, collection)](#uniqbyasynccallback-collection)
## Getting started
Install Lodasync using npm.
```
npm i lodasync
```
In Node.js and in a browser:
```js
import { mapAsync } from 'lodasync'
 
const getUser = async(id) => { /*...*/ }

const users = await mapAsync(getUser, [42, 68])
```

## Design principles
This library is developed with a few design principles in mind that should 
provide the best developer experience possible while keeping performance at a 
top priority. 

It is recommended that you go through this list to completely 
understand how Lodasync works and how to use it efficiently. 

### Curried parameters
Currying is a popular technique in functional programming, it let's you to 
interchangeably write:
```js
await reduceAsync(callback, initialValue, collection)
await reduceAsync(callback, initialValue)(collection)
await reduceAsync(callback)(initialValue, collection)
await reduceAsync(callback)(initialValue)(collection)
```

This allows you to create partially applied functions like so:
```js
const getUsers = mapAsync(async(id) => await getUser(id))

// Or even better
const getUsers = mapAsync(getUser)

// Which then can be called like so
const users = await getUsers([36, 28, 76])
```

Another common use-case for partially applied functions is chaining them with `flowAsync`:
```js
const getAuthorsFromPublishedArticles = flowAsync(
  mapAsync(getArticle),
  filterAsync(isArticlePublished),
  flatMapAsync(getArticleAuthors),
  uniqByAsync(getAuthorId),
)

const authors = await getAuthorsFromPublishedArticles([48, 96, 31])
```


### Promises as parameters
All parameters accept promises, you do not need to await them. 
This should let you to write cleaner code:
```js
// Don't
await filterAsync(isUserAuthorized, await users)

// Do
await filterAsync(isUserAuthorized, users)
```

### Async callbacks
All callbacks can be asynchronous, this is probably the most useful feature of 
this library:
```js
const isUserAuthorized = async(user) => { /*...*/ }

await filterAsync(isUserAuthorized, users)
```

### Resolved callbacks parameters
Received arguments are always resolved, you do not need to await them:
```js
// Don't 
await mapAsync(async(user) => (await user).name, users)

// Do
await mapAsync((user) => user.name, users)
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
Callbacks are always called in parallel, and on all elements to maximize parallelism.
This also includes methods like `findAsync` or `findIndexAsync`, even tho their 
synchronous counterpart stops on the first match.

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
Creates a function that returns the result of invoking all callbacks in series, 
where each successive invocation is supplied the return value of the previous.

Note that callbacks do not have to be asynchronous, you can mix synchronous 
and asynchronous code.

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
const article = {
 authors: Promise.resolve([
   {
     name: Promise.resolve('John'),
   },
   {
     name: Promise.resolve('Carol'),
   },
  ]),
}

await getOrAsync(null, 'authors.0.name', article) // => 'John'
// Or
await getOrAsync(null, ['author', 0, 'name'], article) // => 'John'

await getOrAsync('defaultName', 'authors.3.name', article) // => 'defaultName'
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
    The collection.
- `collection`\
  The collection to iterate over.

### Return value
The composed aggregate object.

### Example
```js
const getFirstName = async(user) => { /*...*/ }

await groupByAsync(getFirstName, [john1, carol1, john2])
// => { John: [john1, john2], Carol: [carol1] }
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
    The collection.
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
    The collection.
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
    The collection.
- `collection`\
  The collection to iterate over.

### Return value
The new duplicate free collection.

### Example
```js
const getUserId = async(user) => { /*...*/ }

await uniqByAsync(getUserId, [user10, user7, user10])
// => [user10, user7]
```
