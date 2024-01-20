const http = require("http");
require("dotenv").config();
const getRequest = require("./methods/get-request");
const postRequest = require("./methods/post-request");
const deleteRequest = require("./methods/delete-request");
const putRequest = require("./methods/put-request");
let movies = require("./data/movies.json");

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  req.movies = movies;
  const method = req.method;
  switch (method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ title: "Not Found", message: "Route not found" }));
      res.end();
  }
});

server.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});
