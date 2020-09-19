const path = require("path");
const express = require("express");
//process.env.PORT = 3000;

const app = express();

// Serving static content
app.use(express.static("public"));

// Testing middleware
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// 404 Not found page
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/404.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now listening to port ${port}`));