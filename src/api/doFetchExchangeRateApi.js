import { apiUrl } from "../constants/constants";
import axios from "axios";

export const doFetchExchangeRateApi = async (
  mainCurrency,
  exchangedCurrency
) => {
  try {
    const response = await axios.get(
      `${apiUrl}/pair/${mainCurrency}/${exchangedCurrency}`
    );
    return response.data.conversion_rate;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
