import { TEST_SERVER_BASE_URL } from "./consts.js";
import axios from "axios";

let cachedToken = null;
let tokenFetchTime = null;

const tokenValidityDuration = 15 * 60 * 1000;

const getAuthToken = async () => {
  const isTokenValid =
    cachedToken && Date.now() - tokenFetchTime < tokenValidityDuration;

  if (isTokenValid) {
    return cachedToken;
  }

  const authPayload = {
    email: process.env.TEST_SERVER_EMAIL,
    name: process.env.TEST_SERVER_NAME,
    rollNo: process.env.TEST_SERVER_ROLLNO,
    accessCode: process.env.TEST_SERVER_ACCESS_CODE,
    clientID: process.env.TEST_SERVER_CLIENT_ID,
    clientSecret: process.env.TEST_SERVER_CLIENT_SECRET,
  };

  const response = await axios.post(
    `${TEST_SERVER_BASE_URL}/auth`,
    authPayload
  );

  cachedToken = response.data.access_token;
  tokenFetchTime = Date.now();

  return cachedToken;
};

export { getAuthToken };
