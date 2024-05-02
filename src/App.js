import "./App.css";
import logo from "./Logo/png/logo-no-background.png";
import InfoIcon from "@mui/icons-material/Info";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import axios from "axios";
import { Flags } from "./Domain/countries";
import React, { useState, useEffect } from "react";

const apiUrl = " https://v6.exchangerate-api.com/v6/2861dbc1fb23d10b936d3685";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SubHeader />
      <Title>Currency Converter</Title>
      <AppCalculator />
      <Title>Rates</Title>
      <AppRates />
    </div>
  );
}

function Title(props) {
  return <h1 className="App-title">{props.children}</h1>;
}

function ExchangeButton() {
  return <button className="App-exchange-button">💱</button>;
}
function Info(props) {
  return (
    <div className="App-info">
      <InfoIcon style={{ padding: "5px" }} />
      <span className="App-info-span">{props.children}</span>
    </div>
  );
}

function ExchangeInfo(props) {
  return <h4 className="App-exchange-info">{props.children}</h4>;
}

function SubHeader() {
  return (
    <div className="App-subheader">
      <p className="App-subheader-info">
        Use our currency converter to check the exchange rate on over 150
        currencies
      </p>
    </div>
  );
}

const doFetchExchangeRateApi = async (mainCurrency, exchangedCurrency) => {
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

function Currency({ currency, handleCurrencyChange }) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <select
      className="App-currency"
      value={currency}
      onChange={handleCurrencyChange}
    >
      {Object.entries(Flags).map(([currencyCode, currencyData]) => (
        <option key={currencyCode} value={currencyCode}>
          {currencyData.flag} ({currencyCode}){" "}
          {truncateText(currencyData.currency, 15)}
        </option>
      ))}
    </select>
  );
}

function CurrencyInput({ input, handleChange }) {
  return (
    <input
      className="App-input"
      type="number"
      min="1"
      max="1000000"
      step="1"
      value={input}
      onChange={handleChange}
    />
  );
}

function CurrencyExchangedReadOnly({ input }) {
  return (
    <input
      className="App-input readonly"
      type="number"
      value={input.toFixed(4)}
      readOnly
    />
  );
}

function AppCalculator() {
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
      }
    };
    fetchExchangeRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCurrency, exchangedCurrency]);

  const handleMainCurrencyChange = (event) => {
    setMainCurrency(event.target.value);
  };

  const handleExchangedCurrencyChange = (event) => {
    setExchangedCurrency(event.target.value);
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
        <Currency
          currency={mainCurrency}
          handleCurrencyChange={handleMainCurrencyChange}
        />
        <CurrencyInput input={mainInput} handleChange={handleMainInput} />
        <ExchangeButton />
        <Currency
          currency={exchangedCurrency}
          handleCurrencyChange={handleExchangedCurrencyChange}
        />
        <CurrencyExchangedReadOnly
          input={exchangedInput}
          handleChange={handleExchangedInput}
        />
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

function AppRates() {
  return (
    <div className="App-rates">
      <Currency />
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Bid</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
          <tr>
            <td>🇪🇺 EUR / 🇺🇸 USD</td>
            <td>
              1.2001
              <TrendingDownOutlinedIcon
                style={{ color: "red", fontSize: "large" }}
              />
            </td>
            <td>
              1.2001
              <TrendingUpOutlinedIcon
                style={{ color: "green", fontSize: "large" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
