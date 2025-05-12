const express = require("express");
const router = express.Router();
const {
  getAverageStockPrice,
  getStockCorrelation,
} = require("../controllers/stockController");

router.get("/stocks/:ticker", getAverageStockPrice);

router.get("/stocks/correlation", getStockCorrelation);

module.exports = router;
