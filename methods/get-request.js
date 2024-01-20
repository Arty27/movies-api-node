module.exports = (req, res) => {
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/^[0-9A-F]{8}\b-[0-9A-F]{4}\b-[0-9A-F]{4}\b-[0-9A-F]{4}\b-[0-9A-F]{12}$/i);
  if (req.url === "/api/movies") {
    console.log("Request to get all movies");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is not valid" }));
  } else if (req.url.startsWith("/api/movies/") && regexV4.test(id)) {
    let filteredMovies = req.movies.filter((movie) => movie.id === id);
    if (filteredMovies.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovies));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ title: "Movie Not Found", message: "Movie not found" }));
      res.end();
    }
  } else {
    // console.log("Unknown route", req.url);
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
