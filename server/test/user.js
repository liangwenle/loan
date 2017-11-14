const axios = require("axios");

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

instance
  .get("/")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
