import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(join(__dirname, "public")));

// Setting up Handlebars as the view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views")); // Updated line

// Middleware to remove trailing slashes from URLs
app.use((req, res, next) => {
  if (req.path.substr(-1) === "/" && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

import indexRouter from "./routes/index.js";
app.use("/", indexRouter);

// app.use((req, res, next) => {
//   res.status(404).render("404", { title: "Mosssdark | Error 404", css: "/css/error/error.css", facicon: "/media/error/no-results.png", faciconFormat: "image/png" });
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});