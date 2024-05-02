import { Flags } from "../domain/countries";
import React, { useState, useEffect } from "react";
import { ExchangeButton } from "../components/buttons/ExchangeButton";
import { Info } from "../components/texts/AppInfo";
import { ExchangeInfo } from "../components/texts/ExchangeInfo";
import { doFetchExchangeRateApi } from "../api/doFetchExchangeRateApi";
import { Currency } from "../components/elements/Currency";
import { CurrencyInput } from "../components/elements/CurrencyInput";
import { CurrencyExchangedReadOnly } from "../components/elements/CurrencyExchangedReadOnly";

export function AppCalculator() {
  const [mainCurrency, setMainCurrency] = useState("GBP");
  const [exchangedCurrency, setExchangedCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [mainInput, setMainInput] = useState(1);
  const [exchangedInput, setExchangedInput] = useState(
    mainInput * exchangeRate
  );

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await doFetchExchangeRateApi(
          mainCurrency,
          exchangedCurrency
        );

        setExchangeRate(response);
        setExchangedInput(mainInput * response);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(1);
        setExchangedInput(1 * 1);
        alert('Monthly API requests limit has been reached.');
      }
    };
    fetchExchangeRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCurrency, exchangedCurrency]);

  const handleMainCurrencyChange = (selectedOption) => {
    setMainCurrency(selectedOption);
  };

  const handleCurrencySwap = (newMainCurrency, newExchangedCurrency) => {
    setMainCurrency(newMainCurrency);
    setExchangedCurrency(newExchangedCurrency);
  };

  const handleExchangedCurrencyChange = (selectedOption) => {
    setExchangedCurrency(selectedOption);
    setExchangedInput(mainInput * exchangeRate);
  };

  const handleMainInput = (event) => {
    let inputValue = parseFloat(event.target.value);
    if (parseFloat(inputValue) > 1000000) {
      inputValue = String(1000000); // Przyciągnij wartość do maksymalnej wartości
    }
    setMainInput(inputValue);
    setExchangedInput(inputValue * exchangeRate);
  };

  const handleExchangedInput = (event) => {
    const inputValue = parseFloat(event.target.value);
    setExchangedInput(inputValue);
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits with leading zero
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits with leading zero
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="App-calculator">
      <ExchangeInfo>
        1 {Flags[mainCurrency].currency} to {Flags[exchangedCurrency].currency}
      </ExchangeInfo>

      <div className="App-exchange">
        <div className="column">
        <Currency
          currency={mainCurrency}
          handleCurrencyChange={handleMainCurrencyChange} />
        <CurrencyInput input={mainInput} handleChange={handleMainInput} />
        </div>
        <div className="column">

        <ExchangeButton
          mainCurrency={mainCurrency}
          exchangedCurrency={exchangedCurrency}
          handleCurrencyChange={handleCurrencySwap} />{" "}
          </div>
                  <div className="column">

        <Currency
          currency={exchangedCurrency}
          handleCurrencyChange={handleExchangedCurrencyChange} />
        <CurrencyExchangedReadOnly
          input={exchangedInput}
          handleChange={handleExchangedInput} />
          </div>
      </div>
      <ExchangeInfo>
        1 {mainCurrency} = {exchangeRate} {exchangedCurrency}, average rate from{" "}
        {formattedDate}.
      </ExchangeInfo>
      <div>
        <Info>
          We use the mid-market rate for our Converter. This is for
          informational purposes only.
        </Info>
      </div>
    </div>
  );
}
