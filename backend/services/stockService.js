const { fetchStockPrices } = require("../utils/stockFetcher");

async function computeAverageStockPrice(
  ticker,
  minutes,
  aggregation = "average"
) {
  const priceHistory = await fetchStockPrices(ticker, minutes);

  if (!priceHistory || priceHistory.length === 0) {
    throw new Error("No stock price data found for given parameters");
  }

  if (aggregation === "average") {
    let total = 0;
    let count = 0;

    for (let i = 0; i < priceHistory.length; i++) {
      total += priceHistory[i].price;
      count++;
    }

    const average = total / count;

    return {
      averagePrice: Number(average.toFixed(6)),
      priceHistory,
    };
  }

  throw new Error("Unsupported aggregation type");
}

module.exports = { computeAverageStockPrice };
