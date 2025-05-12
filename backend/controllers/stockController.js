const { computeAverageStockPrice } = require("../services/stockService");

const getAverageStockPrice = async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minutes = 50, aggregation = "average" } = req.query;

    if (!ticker) {
      return res.status(400).json({ message: "Ticker is required" });
    }

    const { averagePrice, priceHistory } = await computeAverageStockPrice(
      ticker,
      minutes,
      aggregation
    );

    res.json({
      averageStockPrice: averagePrice,
      priceHistory: priceHistory,
    });
  } catch (error) {
    console.error("Average Price Error:", error.message);
    res.status(500).json({
      message: "Failed to compute average price",
      error: error.message,
    });
  }
};

module.exports = { getAverageStockPrice };
