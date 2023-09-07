const express = require("express");
const router = express.Router();
const getNews = require("../controller/news.controller");

//localhost:4000/news/
router.get("/", getNews);

module.exports = router;
