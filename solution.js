const https = require('https')

const pokeUrl = pokemon => `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
const pikaUrl = pokeUrl('pikachu')
// challenge 1
const myPromiseApi = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = ''
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject('It dun broked')
          }
        })
      })
      .on('error', err => {
        reject(err.message)
      })
  })
}

myPromiseApi(pikaUrl)
  .then(console.log)
  .catch(console.log)

// challenge 2
const pikaPromise = myPromiseApi(pikaUrl)
const itemPromise = jsonData => {
  const itemUrl = jsonData.held_items[0].item.url
  return myPromiseApi(itemUrl)
}

pikaPromise
  .then(itemPromise)
  .then(console.log)
  .catch(console.log)

// challenge 3

const charUlr = pokeUrl('charmander')
const squirtUrl = pokeUrl('squirtle')
const bulbaUrl = pokeUrl('bulbasaur')

const charPromise = myPromiseApi(charUlr)
const squirtPromise = myPromiseApi(squirtUrl)
const bulbaPromise = myPromiseApi(bulbaUrl)

const promiseArray = [charPromise, squirtPromise, bulbaPromise]

Promise.all(promiseArray).then(console.log)
