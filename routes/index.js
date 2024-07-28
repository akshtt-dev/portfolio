import express from "express";
import * as svg from "../controllers/svg.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index", {
    moonSvg: svg.moon,
    menuSvg: svg.settings,
    locationSvg: svg.pinPoint,
    githubSvg: svg.github,
    messageSvg: svg.message,
    xSvg: svg.x,
    youtubeSvg: svg.youtube,
    emailSvg: svg.email,
    arrowDownSvg: svg.arrowDown,
    discord2Svg: svg.discord2,
    youtube2Svg: svg.youtube2,
    twitter2Svg: svg.twitter2,
    github2Svg: svg.github2,

  });
});

export default router;
