import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const stockService = {
  async getStockPrice(ticker, minutes = 50) {
    try {
      const response = await axios.get(`${BASE_URL}/stocks/${ticker}`, {
        params: { minutes },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock price:", error);
      throw error;
    }
  },

  async getStockCorrelation(tickers, minutes = 50) {
    try {
      const response = await axios.get(`${BASE_URL}/stockcorrelation`, {
        params: {
          ticker: tickers,
          minutes,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock correlation:", error);
      throw error;
    }
  },
};
