import { apiUrl } from "../constants/constants";
import axios from "axios";

export const doFetchDefaultCurrenciesRates = async (mainCurrency) => {
  try {
    const response = await axios.get(`${apiUrl}/latest/${mainCurrency}`);
    console.log("Dane z API:", response.data);
    return response.data.conversion_rates;
    // Assuming this is the conversion rate
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error;
    // Rethrow the error to handle it in the calling function
  }
};
