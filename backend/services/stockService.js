const { fetchStockPrices } = require("../utils/stockFetcher");
const { calculateCorrelation } = require("../utils/statistics");

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

async function computeStockCorrelation(tickerA, tickerB, minutes) {
  const [dataA, dataB] = await Promise.all([
    fetchStockPrices(tickerA, minutes),
    fetchStockPrices(tickerB, minutes),
  ]);

  const pricesA = dataA.map((p) => p.price);
  const pricesB = dataB.map((p) => p.price);

  const correlation = calculateCorrelation(pricesA, pricesB);

  return {
    correlation,
    stocks: {
      [tickerA]: {
        averagePrice: Number(
          (
            pricesA.reduce((sum, price) => sum + price, 0) / pricesA.length
          ).toFixed(6)
        ),
        priceHistory: dataA,
      },
      [tickerB]: {
        averagePrice: Number(
          (
            pricesB.reduce((sum, price) => sum + price, 0) / pricesB.length
          ).toFixed(6)
        ),
        priceHistory: dataB,
      },
    },
  };
}

module.exports = { computeAverageStockPrice, computeStockCorrelation };
