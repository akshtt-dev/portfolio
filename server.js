const express = require('express');
const app = express();
const { port, root, errorPage } = require('./config.json');
const fs = require("fs");
const path = require("path");

const staticDirectory = path.join(__dirname, 'public');

// Middleware to serve static files
app.use(express.static(staticDirectory));

app.get('/', (req, res) => {
  res.header("Content-Type", "text/html");
  res.send(fs.readFileSync(root, "utf8"));
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, errorPage));
});

app.listen(port, () => {
    console.log(`Server started listening on http://localhost:${port}`);
});