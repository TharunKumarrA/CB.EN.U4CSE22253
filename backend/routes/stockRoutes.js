import express from "express";
import {
  getAverageStockPrice,
  getStockCorrelation,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/stocks/:ticker", getAverageStockPrice);

router.get("/stockcorrelation", getStockCorrelation);

export default router;
