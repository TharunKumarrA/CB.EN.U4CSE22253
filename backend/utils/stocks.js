import { TEST_SERVER_BASE_URL } from "./consts";

const axios = require("axios");
const { getAuthToken } = require("./auth");

const fetchStockPrices = async (ticker, minutes) => {
  const token = await getAuthToken();

  const response = await axios.get(`${TEST_SERVER_BASE_URL}/stocks/${ticker}`, {
    params: { minutes },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

module.exports = { fetchStockPrices };
