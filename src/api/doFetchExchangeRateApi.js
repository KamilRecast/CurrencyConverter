import { apiUrl } from "../constants/constants";
import axios from "axios";

export const doFetchExchangeRateApi = async (mainCurrency, exchangedCurrency) => {
  try {
    const response = await axios.get(
      `${apiUrl}/pair/${mainCurrency}/${exchangedCurrency}`
    );
    console.log("Dane z API:", response.data);
    return response.data.conversion_rate; // Assuming this is the conversion rate
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
