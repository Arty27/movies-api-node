const writeToFile = require("../utils/write-to-file");
const bodyParser = require("../utils/body-parser");
module.exports = async (req, res) => {
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/^[0-9A-F]{8}\b-[0-9A-F]{4}\b-[0-9A-F]{4}\b-[0-9A-F]{4}\b-[0-9A-F]{12}$/i);
  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
  } else if (req.url.startsWith("/api/movies/") && regexV4.test(id)) {
    const index = req.movies.findIndex((movie) => movie.id === id);
    if (index === -1) {
      res.statusCode = 404;
      res.write(JSON.stringify({ title: "Movie Not Found", message: "Movie not found" }));
      res.end();
    } else {
      const data = await bodyParser(req);
      req.movies[index] = { id: id, ...data };
      writeToFile(req.movies);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  }
};
