**Author**: [@astroash](https://github.com/astroash) 

# Promise Me This

## Learning Objectives
To be able to:
- create a new Promise
- handle errors when creating a Promise
- refactor error first callbacks into promises

## Relevant Resources
- [MDN Docs - Promises]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Morning Challenge

Callbacks are awesome as they allow us to work with asynchronous code by waiting until a response comes back before we do something with it. However, this waiting can begin to make our code look messy when we need to link multiple async functions together. This is when **promises** can become super useful, they're a wrapper around callbacks . Below is an example of linking 5 async functions with error first callbacks compared to promises.

### Calling Error First Callbacks
```js
funcOne((err, resOne) => {
  if (err) recoverFromError(err)
  else funcTwo((err, resTwo) => {
    if (err) recoverFromError(err)
    else funcThree ((err, resThree) => {
      if (err) recoverFromError(err)
      else funcFour ((err, resFour) => {
        if (err) recoverFromError(err)
        else funcFive ((err, resFive) => {
          //do the thing
        })
      })
    })
  })
})
```
### Calling Promises
```js
funcOne
  .then(funcTwo)
  .then(funcThree)
  .then(funcFour)
  .then(funcFive)
  .catch((err)=> recoverFromError(err))
```

## Syntax
Let's have a look at the syntax of creating a promise compared to an error first callback:

### Error First Callbacks
```js
const readAFile = (callback) => {
  //here you do something async
  fs.readFile(`${__dirname}/public/index.html`, 'utf8', (err, data) => {
    //here you do something if it errors
    if (err) callback(err)
    //here you do something if it works
    else callback(null, data)
  }
}

//now lets call it
readAFile((err, res) => {
  if (err) console.log(err)
  else console.log(res)
})
```

### Promises
```js
const readAFile = (url) => {
  // here you create a new Promise
  return new Promise((resolve, reject) => {
    //here you do something async
    fs.readFile(`${__dirname}/public/index.html`, 'utf8', (err, data) => {
      //here you do something if it errors
      if (err) reject(err)
      //here you do something if it works
      else resolve(data)
    });
  });
}

//now lets call it
readAFile.then((res)=> console.log(res)).catch((err)=> console.log(err))
```

## Challenge One
In `challenge.js` you will find code to make an api call using the http module. Your challenge is to refactor this code into a new Promise.

_Remember to use the docs provided at the top_

## Challenge Two
Nice work on your Promise! Now let's have a go at linking Promises. Your challenge is to:
1. make an api call to the pokeApi to find out about pikachu
2. make a second Promise that grabs pikachu's first move and find out more information about it's first `held_item`
3. Link the two Promises together so that the second starts when the first is fulfilled.

## Challenge Three
Did you really finish that fast :dash: ? Okay, so now your challenge is to find out info on the 3 starter pokemon (Bulbasaur :leaves:, Charmander :fire: & Squirtle :sweat_drops: ) and print the return info. To do this you need to:
- Send off the 3 api calls one after the other
- Only print when all thee have fulfilled.

[These docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be your friend :heart:
