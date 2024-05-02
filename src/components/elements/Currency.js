import Select from "react-select";
import { Flags } from "../../domain/countries";
import React from "react";

export function Currency({ currency, handleCurrencyChange }) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const options = Object.entries(Flags).map(([currencyCode, currencyData]) => ({
    value: currencyCode,
    label: `${currencyData.flag} (${currencyCode}) ${truncateText(
      currencyData.country,
      15
    )}`,
  }));

  const mainCurrencyFlag = Flags[currency].flag;
  const mainCurrencyCountry = Flags[currency].country;

  return (
    <Select
      options={options}
      value={{
        value: currency,
        label: `${mainCurrencyFlag} (${currency}) ${mainCurrencyCountry}`,
      }}
      onChange={(selectedOption) => handleCurrencyChange(selectedOption.value)}
      styles={{
        control: (provided) => ({
          ...provided,
          width: "250px",
          height: "75px", 
          padding: "10px",
          borderRadius: "5px",
          margin: "10px",
          backgroundColor: "#fff",
          fontSize: "12px",
          fontFamily: "Bruno Ace, sans-serif",
          textAlign: "left",
        }),
        option: (provided, state) => ({
          ...provided,
          borderBottom: "1px solid #ccc",
          color: state.isSelected ? "#000000" : "#8c8c8c", 
          backgroundColor: state.isFocused ? "#ddd" : "white", 

          fontSize: "12px",
        }),
      }}
    />
  );
}
