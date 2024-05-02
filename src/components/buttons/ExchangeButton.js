import React from "react";

export function ExchangeButton({
  mainCurrency, exchangedCurrency, handleCurrencyChange,
}) {
  const handleSwap = () => {
    handleCurrencyChange(exchangedCurrency, mainCurrency);
  };

  return (
    <button className="App-exchange-button" onClick={handleSwap}>
      💱
    </button>
  );
}
