const https = require('https')

const pokemon = 'pikachu'
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`

const myApiCall = (url, callback) => {
  https
    .get(url, resp => {
      let data = ''
      resp.on('data', chunk => {
        data += chunk
      })
      resp.on('end', () => {
        try {
          callback(null, JSON.parse(data))
        }
        catch {
          callback("It dun broked")
        }
      })
    })
    .on('error', err => {
      callback(err.message)
    })
}

myApiCall((err, res) => {
  console.log(res)
})

//Now let's make it a Promise

const myPromiseApi =


//And call it here...
