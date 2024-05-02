import React from "react";

export function CurrencyInput({ input, handleChange }) {
  return (
    <input
      className="App-input"
      type="number"
      min="1"
      max="1000000"
      step="1"
      value={input}
      onChange={handleChange} />
  );
}
