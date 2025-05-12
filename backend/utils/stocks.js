import axios from "axios";
import { TEST_SERVER_BASE_URL } from "./consts.js";
import { getAuthToken } from "./auth.js";

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

export { fetchStockPrices };
