const axios = require("axios");

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

instance
  .post("/users", {name: '张三', phone: 13500000000, pdId: '123'})
  // .post("/users")
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
