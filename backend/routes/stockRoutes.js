const express = require("express");
const router = express.Router();
const { getAverageStockPrice } = require("../controllers/stockController");

router.get("/stocks/:ticker", getAverageStockPrice);

module.exports = router;
