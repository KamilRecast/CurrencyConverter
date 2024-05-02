import { apiUrl } from "../constants/constants";
import axios from "axios";

export const doFetchDefaultCurrenciesRates = async (mainCurrency) => {
  try {
    const response = await axios.get(`${apiUrl}/latest/${mainCurrency}`);
    return response.data.conversion_rates;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
