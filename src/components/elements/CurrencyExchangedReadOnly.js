import React from "react";

export function CurrencyExchangedReadOnly({ input }) {
  return (
    <input
      className="App-input readonly"
      type="number"
      value={input.toFixed(3)}
      readOnly />
  );
}
