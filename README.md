# Lodasync
[![npm](https://img.shields.io/npm/v/lodasync)](https://www.npmjs.com/package/lodasync)
[![Travis (.org)](https://img.shields.io/travis/nick-keller/lodasync)](https://travis-ci.org/github/nick-keller/lodasync)
[![Coveralls github](https://img.shields.io/coveralls/github/nick-keller/lodasync)](https://coveralls.io/github/nick-keller/lodasync)

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

```js
import { filterAsync } from 'lodasync'
 
const users = await filterAsync(async(user) => {
  // => use async code! 🎉
}, getUsers())
```

## Table of contents
- [Getting started](#getting-started)
- [API](#api)
  - [everyAsync(callback, collection)](#everyasynccallback-collection)
  - [filterAsync(callback, collection)](#filterasynccallback-collection)
  - [findAsync(callback, collection)](#findasynccallback-collection)
  - [findIndexAsync(callback, collection)](#findindexasynccallback-collection)
  - [flatMapAsync(callback, collection)](#flatmapasynccallback-collection)
  - [flowAsync(...callbacks)](#flowasynccallbacks)
  - [forEachAsync(callback, collection)](#foreachasynccallback-collection)
  - [getAsync(path, object)](#getasyncpath-object)
  - [getOrAsync(defaultValue, path, object)](#getorasyncdefaultvalue-path-object)
  - [groupByAsync(callback, collection)](#groupbyasynccallback-collection)
  - [mapAsync(callback, collection)](#mapasynccallback-collection)
  - [maxByAsync(callback, collection)](#maxbyasynccallback-collection)
  - [minByAsync(callback, collection)](#minbyasynccallback-collection)
  - [propsAsync(object)](#propsasyncobject)
  - [reduceAsync(callback, initialValue, collection)](#reduceasynccallback-initialvalue-collection)
  - [someAsync(callback, collection)](#someasynccallback-collection)
  - [sortByAsync(callback, collection)](#sortbyasynccallback-collection)
  - [uniqByAsync(callback, collection)](#uniqbyasynccallback-collection)
## Getting started
Install Lodasync using npm.
```
npm i lodasync
```
In Node.js and in a browser:
```js
import { 
  mapAsync, 
  flowAsync, 
  filterAsync, 
  flatMapAsync, 
  uniqByAsync, 
  getAsync, 
} from 'lodasync'

// Some async function
const getUser = async(id) => db('users').where('id', id) 

// Write async code like you write synchronous code
const users = await mapAsync(getUser, ['user-1-id', 'user-2-id'])

// Pass promises as arguments to any method
const users = await mapAsync(getUser, await getUserIds()) // Don't ❌
const users = await mapAsync(getUser, getUserIds()) // Do ✅

// And even array of promises
const users = await mapAsync(getUser, [await promiseId1, await promiseId2]) // Don't ❌
const users = await mapAsync(getUser, [promiseId1, promiseId2]) // Do ✅

// Callback arguments are always resolved
const users = await filterAsync(async(userId) => isAdmin(await userId), [promiseId1, promiseId2]) // Don't ❌
const users = await filterAsync(isAdmin, [promiseId1, promiseId2]) // Do ✅

// Returned array elements are always resolved
const users = await mapAsync(getUser, ['user-1-id', 'user-2-id'])
const name = (await users[0]).name // Don't ❌
const name = users[0].name // Do ✅

// All methods are curried
const getUsers = mapAsync(getUser)
const users = await getUsers(['user-1-id', 'user-2-id'])

// Curry is useful for chaining
const authors = await flowAsync(
  mapAsync(getArticle),
  filterAsync(isPublished),
  flatMapAsync(getAuthors),
  uniqByAsync(getAsync('id')),
)(['article-1-id', 'article-2-id', /*...*/])

```

## Note on parallelism
Callbacks are always called in parallel on all elements to maximize speed.
This also includes methods like `findAsync` or `findIndexAsync`, even tho their 
synchronous counterpart stops on the first match.

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
  filterAsync(isAuthorized),
)

const authorizedUsers = await getAuthorizedUsers(getUserIds())
```

## forEachAsync(callback, collection)
Iterate over an array in parallel.

### Arguments
- `callback`\
  A function that is invoked for each element.
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
Always returns `undefined`.

### Example
```js
await forEachAsync(inviteUser, getUsers())
```

## getAsync(path, object)
Gets the value at `path` of `object`. 

### Arguments
- `path`\
  An array of keys, or a string that should be split on dots. 
  When its a string, `path` does not support the array notation `[index]`, 
  use the dot notation instead `.index`
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

await getAsync('authors.0.name', article) // => 'John'
await getAsync(['author', 0, 'name'], article) // => 'John'

// Often used to get an object key of a promise
const name = await getUser().then(user => user.name) // Don't ❌
const name = await getAsync('name', getUser()) // Do ✅

// Or as an iteratee
const names = await mapAsync(getAsync('name'), getUsers())
```

## getOrAsync(defaultValue, path, object)
Works like `getAsync` with a custom `defaultValue` when the resolved value is undefined.

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

## propsAsync(object)
Returns a promise that resolves when all values of `object` are resolved.
Mostly used for parallelism.

### Example
```js
// This is run sequentially
const user = await getUser(userId)
const article = await getArticle(articleId)
const comment = await getComment(commentId)

// This is run in parallel
const { user, article, comment } = await propsAsync({
  user: getUser(userId),
  article: getArticle(articleId),
  comment: getComment(commentId),
})
```

## reduceAsync(callback, initialValue, collection)
Implementation of native [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

## someAsync(callback, collection)
Implementation of native [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

## sortByAsync(callback, collection)
Sorts `collection` by invoking `callback` for each element to generate the 
criterion by which the value is ranked.
This method performs a stable sort, that is, it preserves the original sort order of equal elements.

The criterion can be 
- a number: using number comparison
- a string: using string comparison
- Infinity: always sorted at the end
- -Infinity: always sorted at the beginning

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
The sorted collection.

### Example
```js
const getItemPrice = async(item) => { /*...*/ }

await sortByAsync(getItemPrice, [item7, item2, item3])
// => [item2, item3, item7]
```

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
