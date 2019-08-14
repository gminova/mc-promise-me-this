const https = require("https");

const makePokeUrl = pokemon => `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
const pikaUrl = makePokeUrl("pikachu");

const myApiCall = (url, callback) => {
  https
    .get(url, resp => {
      let data = "";
      resp.on("data", chunk => {
        data += chunk;
      });
      resp.on("end", () => {
        try {
          callback(null, JSON.parse(data));
        } catch (e) {
          callback("Oops, this isn't JSON");
        }
      });
    })
    .on("error", err => {
      callback(err.message);
    });
};

//CHALLENGE 1

const myPromiseApi = pikaUrl => {
  return new Promise((resolve, reject) => {
    myApiCall(pikaUrl, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

//now lets call it
myPromiseApi(pikaUrl)
  .then(res => console.log("PROMISE res: ", res))
  .catch(err => console.log(err));
//CHALLENGE 2

//CHALLENGE 3
Promise.all([
  myPromiseApi(makePokeUrl("pikachu")),
  myPromiseApi(makePokeUrl("eevee")),
  myPromiseApi(makePokeUrl("charmander"))
])
.then(res => console.log(res.length))
.catch(err => console.log(err));

//And call it here...
