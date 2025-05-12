import {
  computeAverageStockPrice,
  computeStockCorrelation,
} from "../services/stockService.js";

const getAverageStockPrice = async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minutes = 50, aggregation = "average" } = req.query;

    if (!ticker) {
      return res.status(400).json({ message: "Ticker is required" });
    }

    const { averagePrice, priceHistory } = await computeAverageStockPrice(
      ticker,
      Number(minutes),
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

const getStockCorrelation = async (req, res) => {
  try {
    const { minutes = 50, ticker } = req.query;

    if (!ticker || !Array.isArray(ticker) || ticker.length !== 2) {
      return res
        .status(400)
        .json({ message: "Exactly two ticker symbols are required" });
    }

    const result = await computeStockCorrelation(
      ticker[0],
      ticker[1],
      Number(minutes)
    );

    const correlationResponse = {
      correlation: result.correlation.toFixed(4),
      stocks: {
        [ticker[0]]: {
          averagePrice: result.stocks[ticker[0]].averagePrice,
          priceHistory: result.stocks[ticker[0]].priceHistory,
        },
        [ticker[1]]: {
          averagePrice: result.stocks[ticker[1]].averagePrice,
          priceHistory: result.stocks[ticker[1]].priceHistory,
        },
      },
    };

    res.json(correlationResponse);
  } catch (error) {
    console.error("Correlation Error:", error.message);
    res.status(500).json({
      message: "Failed to compute correlation",
      error: error.message,
    });
  }
};

export { getAverageStockPrice, getStockCorrelation };
