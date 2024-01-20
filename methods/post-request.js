const bodyParser = require("../utils/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utils/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      const data = await bodyParser(req);
      data.id = crypto.randomUUID();
      req.movies.push(data);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-type": "application/json" });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Invalid Data",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
