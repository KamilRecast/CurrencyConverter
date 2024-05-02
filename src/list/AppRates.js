import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Flags } from "../domain/countries";
import React, { useState, useEffect } from "react";
import { doFetchDefaultCurrenciesRates } from "../api/doFetchDefaultCurrenciesRates";
import { Currency } from "../components/elements/Currency";

export function AppRates() {
  const [mainCurrency, setMainCurrency] = useState("GBP");
  const [currencyRate, setCurrencyRate] = useState(null);

  const handleMainCurrencyChange = (selectedOption) => {
    setMainCurrency(selectedOption);
  };
  const mainCurrencyFlag = Flags[mainCurrency] ? Flags[mainCurrency].flag : "";

  useEffect(() => {
    const fetchDefaultCurrencies = async () => {
      try {
        const response = await doFetchDefaultCurrenciesRates(mainCurrency);
        console.log(response);
        setCurrencyRate(response);
      } catch (error) {

        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchDefaultCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCurrency]);

  return (
    <div className="App-rates">
      <Currency
        currency={mainCurrency}
        handleCurrencyChange={handleMainCurrencyChange} />
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(Flags).map(([currencyCode, currencyData]) => currencyData.default === "Yes" ? (
            <tr key={currencyCode}>
              <td>
                {mainCurrencyFlag} {mainCurrency} / {currencyData.flag}{" "}
                {currencyCode}
              </td>
              <td>
                {currencyRate && currencyRate[currencyCode] && (
                  <>
                    {currencyRate[currencyCode].toFixed(4)}{" "}
                    {currencyRate[currencyCode] >= 1 ? (
                      <TrendingUpOutlinedIcon style={{ color: "green" }} />
                    ) : (
                      <TrendingDownOutlinedIcon style={{ color: "red" }} />
                    )}
                  </>
                )}
              </td>
              <td>
                {currencyRate && currencyRate[currencyCode] && (
                  <>
                    {(1 / currencyRate[currencyCode]).toFixed(4)}{" "}
                    {currencyRate[currencyCode] <= 1 ? (
                      <TrendingUpOutlinedIcon style={{ color: "green" }} />
                    ) : (
                      <TrendingDownOutlinedIcon style={{ color: "red" }} />
                    )}
                  </>
                )}
              </td>
            </tr>
          ) : null
          )}
        </tbody>
      </table>
    </div>
  );
}
