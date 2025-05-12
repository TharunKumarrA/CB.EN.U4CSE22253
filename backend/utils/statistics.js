function calculateMean(values) {
  const total = values.reduce((sum, v) => sum + v, 0);
  return total / values.length;
}

function calculateCorrelation(stockA, stockB) {
  if (stockA.length !== stockB.length) {
    throw new Error("Stocks must have equal number of price points");
  }

  const meanA = calculateMean(stockA);
  const meanB = calculateMean(stockB);

  const covariance = stockA.reduce((sum, val, idx) => sum + ((val - meanA) * (stockB[idx] - meanB)), 0) / (stockA.length - 1);
  const stdDevA = Math.sqrt(stockA.reduce((sum, val) => sum + Math.pow(val - meanA, 2), 0) / (stockA.length - 1));
  const stdDevB = Math.sqrt(stockB.reduce((sum, val) => sum + Math.pow(val - meanB, 2), 0) / (stockB.length - 1));

  return Number((covariance / (stdDevA * stdDevB)).toFixed(4));
}

module.exports = { calculateMean, calculateCorrelation };
